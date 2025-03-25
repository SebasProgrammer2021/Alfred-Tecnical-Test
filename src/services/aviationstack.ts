import useStore from "@/store/store";
import { fetchMockedData } from "@/__tests__/mockedData";

export interface APIResponse {
  pagination: Pagination;
  data: { [key: string]: null | string }[];
}

export interface Pagination {
  offset: number;
  limit: number;
  count: number;
  total: number;
}

export interface City {
  id: string;
  iata_code: string;
  name: string;
  country: string;
}

export interface Airport {
  id: string;
  name: string;
  iata_code: string;
  icao_code: string;
  city: string;
  city_name?: string;
  country: string;
  timezone: string;
  latitude: number;
  longitude: number;
}

const API_BASE_URL = "http://api.aviationstack.com/v1";
const API_ACCESS_KEY = process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY || "";

export const fetchAirports = async () => {
  const store = useStore.getState();
  store.setLoading(true);
  store.setError(null);

  try {
    const airports = API_ACCESS_KEY 
      ? await fetchRealData() 
      : await fetchMockedData();
    
    store.setAirports(airports);
    return airports;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    store.setError("Error al cargar los datos de aeropuertos y ciudades");
    return [];
  } finally {
    store.setLoading(false);
  }
};

const fetchRealData = async (): Promise<Airport[]> => {
  try {
    if (!API_ACCESS_KEY) {
      throw new Error("No se ha configurado la clave de API de Aviationstack");
    }

    const [airports, cities] = await Promise.all([
      fetchRealAirports(),
      fetchRealCities()
    ]);

    return combineAirportsWithCities(airports, cities);
  } catch (error) {
    throw error; 
  }
};

export const combineAirportsWithCities = (airports: Airport[], cities: City[]): Airport[] => {

  const cityMap = new Map<string, City>();
  cities.forEach(city => {
    if (city.iata_code) {
      cityMap.set(city.iata_code, city);
    }
  });

  return airports.map(airport => {
    const city = cityMap.get(airport.city) || null;
    return {
      ...airport,
      city_name: city?.name || airport.city
    };
  });
};

const fetchRealAirports = async (): Promise<Airport[]> => {
  try {
    const airportsResponse = await fetch(`${API_BASE_URL}/airports?access_key=${API_ACCESS_KEY}&limit=100`);

    if (!airportsResponse.ok) {
      throw new Error(`Error en la obtención de datos: ${airportsResponse.status}`);
    }

    const airportsData: APIResponse = await airportsResponse.json();

    if ('error' in airportsData) {
      throw new Error(`Error de API: ${JSON.stringify(airportsData.error)}`);
    }

    return airportsData.data.map(airport => ({
      id: airport.airport_id?.toString() || "",
      name: airport.airport_name || "",
      iata_code: airport.iata_code || "",
      icao_code: airport.icao_code || "",
      city: airport.city_iata_code || "",
      city_name: "",
      country: airport.country_name || "",
      timezone: airport.timezone || "",
      latitude: airport.latitude ? parseFloat(airport.latitude) : 0,
      longitude: airport.longitude ? parseFloat(airport.longitude) : 0
    }));
  } catch (error) {
    console.error("Error obteniendo aeropuertos:", error);
    throw error; 
  }
};

const fetchRealCities = async (): Promise<City[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cities?access_key=${API_ACCESS_KEY}&limit=100`);

    if (!response.ok) {
      throw new Error(`Error de API: ${response.status}`);
    }

    const data: APIResponse = await response.json();

    if ('error' in data) {
      throw new Error(`Error en la respuesta: ${JSON.stringify(data.error)}`);
    }

    return data.data.map(city => ({
      id: city.city_id?.toString() || "",
      iata_code: city.iata_code || "",
      name: city.city_name || "",
      country: city.country_name || ""
    }));
  } catch (error) {
    console.error("Error obteniendo ciudades:", error);
    return []; 
  }
};