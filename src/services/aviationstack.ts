import { generateMockAirports, generateMockCities } from "@/__tests__/mockedData";
import useStore from "@/store/store";

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

const API_BASE_URL = "http://api.aviationstack.com/v1";
const API_ACCESS_KEY = process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY || "";

// Función principal para obtener datos de aeropuertos
export const fetchAirports = async () => {
  const store = useStore.getState();
  store.setLoading(true);
  store.setError(null);

  try {
    // Si hay una API key, usamos datos reales, de lo contrario usamos datos de prueba
    if (API_ACCESS_KEY) {
      return await fetchRealData();
    } else {
      return await fetchMockedData();
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
    store.setError("Error al cargar los datos de aeropuertos y ciudades");
    return [];
  } finally {
    store.setLoading(false);
  }
};

// Función para obtener datos reales de la API
const fetchRealData = async () => {
  const store = useStore.getState();

  try {
    if (!API_ACCESS_KEY) {
      throw new Error("No se ha configurado la clave de API de Aviationstack");
    }

    // Obtener datos de aeropuertos y ciudades en paralelo
    const [airports, cities] = await Promise.all([
      fetchRealAirports(),
      fetchRealCities()
    ]);

    // Combinar datos de aeropuertos con ciudades
    const airportsWithCities = combineAirportsWithCities(airports, cities);
    
    store.setAirports(airportsWithCities);
    return airportsWithCities;
  } catch (error) {
    throw error; // Propagar el error para que lo maneje fetchAirports
  }
};

// Función para obtener datos mockeados para desarrollo
const fetchMockedData = async () => {
  const store = useStore.getState();

  try {
    // Usar datos mockeados
    const mockAirports = generateMockAirports();
    const mockCities = generateMockCities();

    // Combinar datos
    const airportsWithCities = combineAirportsWithCities(mockAirports, mockCities);

    // Simular un pequeño retraso para la carga
    await new Promise(resolve => setTimeout(resolve, 800));

    store.setAirports(airportsWithCities);
    return airportsWithCities;
  } catch (error) {
    throw error; // Propagar el error para que lo maneje fetchAirports
  }
};

// Función para combinar aeropuertos con ciudades
const combineAirportsWithCities = (airports: any[], cities: City[]) => {
  // Crear mapa de ciudades para búsqueda rápida
  const cityMap = new Map<string, City>();
  cities.forEach(city => {
    if (city.iata_code) {
      cityMap.set(city.iata_code, city);
    }
  });

  // Combinar datos
  return airports.map(airport => {
    const city = cityMap.get(airport.city) || null;
    return {
      ...airport,
      city_name: city?.name || airport.city
    };
  });
};

// Función para obtener aeropuertos reales de la API
const fetchRealAirports = async () => {
  try {
    const airportsResponse = await fetch(`${API_BASE_URL}/airports?access_key=${API_ACCESS_KEY}&limit=100`);

    if (!airportsResponse.ok) {
      throw new Error(`Error en la obtención de datos: ${airportsResponse.status}`);
    }

    const airportsData: APIResponse = await airportsResponse.json();

    if ('error' in airportsData) {
      throw new Error(`Error de API: ${JSON.stringify(airportsData.error)}`);
    }

    // Mapear datos de la API al formato que necesitamos
    return airportsData.data.map(airport => ({
      id: airport.airport_id?.toString() || "",
      name: airport.airport_name || "",
      iata_code: airport.iata_code || "",
      icao_code: airport.icao_code || "",
      city: airport.city_iata_code || "",
      country: airport.country_name || "",
      timezone: airport.timezone || "",
      latitude: airport.latitude ? parseFloat(airport.latitude) : 0,
      longitude: airport.longitude ? parseFloat(airport.longitude) : 0
    }));
  } catch (error) {
    console.error("Error obteniendo aeropuertos:", error);
    throw error; // Propagar el error
  }
};

// Función para obtener ciudades reales de la API
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
    return []; // Devolver array vacío para permitir que la aplicación siga funcionando
  }
};