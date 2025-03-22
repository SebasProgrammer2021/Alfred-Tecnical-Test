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


// La base URL y el token de acceso para la API de Aviationstack
const API_BASE_URL = "http://api.aviationstack.com/v1";
const API_ACCESS_KEY = process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY || "";

// Función para obtener datos de aeropuertos desde la API
export const fetchAirports = async () => {
  const store = useStore.getState();
  store.setLoading(true);
  store.setError(null);

  try {
    // En un entorno de producción, puedes descomentar esta parte para usar la API real
    // La clave API está configurada en el archivo .env
    return await fetchRealAirports();

    // Por ahora, usamos datos mockeados para desarrollo y pruebas
    const mockData = generateMockAirports();

    // Simular un pequeño retraso para la carga
    await new Promise(resolve => setTimeout(resolve, 800));

    store.setAirports(mockData);
    return mockData;
  } catch (error) {
    console.error("Error fetching airports:", error);
    store.setError("Error al cargar los datos de aeropuertos");
    return [];
  } finally {
    store.setLoading(false);
  }
};

// Función para generar datos de aeropuertos de prueba
const generateMockAirports = () => {
  return [
    {
      id: "1",
      name: "Aeropuerto Internacional Adolfo Suárez Madrid-Barajas",
      iata_code: "MAD",
      icao_code: "LEMD",
      city: "Madrid",
      country: "España",
      timezone: "Europe/Madrid",
      latitude: 40.472222,
      longitude: -3.560833
    },
    {
      id: "2",
      name: "Aeropuerto de Barcelona-El Prat",
      iata_code: "BCN",
      icao_code: "LEBL",
      city: "Barcelona",
      country: "España",
      timezone: "Europe/Madrid",
      latitude: 41.297222,
      longitude: 2.083333
    },
    {
      id: "3",
      name: "Aeropuerto Internacional John F. Kennedy",
      iata_code: "JFK",
      icao_code: "KJFK",
      city: "Nueva York",
      country: "Estados Unidos",
      timezone: "America/New_York",
      latitude: 40.639722,
      longitude: -73.778889
    },
    {
      id: "4",
      name: "Aeropuerto de London Heathrow",
      iata_code: "LHR",
      icao_code: "EGLL",
      city: "Londres",
      country: "Reino Unido",
      timezone: "Europe/London",
      latitude: 51.4775,
      longitude: -0.461389
    },
    {
      id: "5",
      name: "Aeropuerto Internacional de Tokio (Haneda)",
      iata_code: "HND",
      icao_code: "RJTT",
      city: "Tokio",
      country: "Japón",
      timezone: "Asia/Tokyo",
      latitude: 35.553333,
      longitude: 139.781111
    },
    {
      id: "6",
      name: "Aeropuerto de Charles de Gaulle",
      iata_code: "CDG",
      icao_code: "LFPG",
      city: "París",
      country: "Francia",
      timezone: "Europe/Paris",
      latitude: 49.009722,
      longitude: 2.547778
    },
    {
      id: "7",
      name: "Aeropuerto Internacional de Los Ángeles",
      iata_code: "LAX",
      icao_code: "KLAX",
      city: "Los Ángeles",
      country: "Estados Unidos",
      timezone: "America/Los_Angeles",
      latitude: 33.9425,
      longitude: -118.408056
    },
    {
      id: "8",
      name: "Aeropuerto Internacional de Dubái",
      iata_code: "DXB",
      icao_code: "OMDB",
      city: "Dubái",
      country: "Emiratos Árabes Unidos",
      timezone: "Asia/Dubai",
      latitude: 25.252778,
      longitude: 55.364444
    },
    {
      id: "9",
      name: "Aeropuerto de Frankfurt",
      iata_code: "FRA",
      icao_code: "EDDF",
      city: "Frankfurt",
      country: "Alemania",
      timezone: "Europe/Berlin",
      latitude: 50.033333,
      longitude: 8.570556
    },
    {
      id: "10",
      name: "Aeropuerto Internacional de Hong Kong",
      iata_code: "HKG",
      icao_code: "VHHH",
      city: "Hong Kong",
      country: "China",
      timezone: "Asia/Hong_Kong",
      latitude: 22.308889,
      longitude: 113.914444
    },
    {
      id: "11",
      name: "Aeropuerto Internacional de Singapur Changi",
      iata_code: "SIN",
      icao_code: "WSSS",
      city: "Singapur",
      country: "Singapur",
      timezone: "Asia/Singapore",
      latitude: 1.359167,
      longitude: 103.989444
    },
    {
      id: "12",
      name: "Aeropuerto Internacional de Ámsterdam Schiphol",
      iata_code: "AMS",
      icao_code: "EHAM",
      city: "Ámsterdam",
      country: "Países Bajos",
      timezone: "Europe/Amsterdam",
      latitude: 52.308056,
      longitude: 4.764167
    },
    {
      id: "13",
      name: "Aeropuerto Internacional de Sídney",
      iata_code: "SYD",
      icao_code: "YSSY",
      city: "Sídney",
      country: "Australia",
      timezone: "Australia/Sydney",
      latitude: -33.946111,
      longitude: 151.177222
    },
    {
      id: "14",
      name: "Aeropuerto Internacional de Toronto Pearson",
      iata_code: "YYZ",
      icao_code: "CYYZ",
      city: "Toronto",
      country: "Canadá",
      timezone: "America/Toronto",
      latitude: 43.677222,
      longitude: -79.630556
    },
    {
      id: "15",
      name: "Aeropuerto de Lisboa Portela",
      iata_code: "LIS",
      icao_code: "LPPT",
      city: "Lisboa",
      country: "Portugal",
      timezone: "Europe/Lisbon",
      latitude: 38.774167,
      longitude: -9.134167
    }
  ];
};

// Función para obtener datos reales de la API
export const fetchRealAirports = async () => {
  const store = useStore.getState();
  store.setLoading(true);
  store.setError(null);

  try {
    // Verificar si tenemos una API key
    if (!API_ACCESS_KEY) {
      throw new Error("No se ha configurado la clave de API de Aviationstack");
    }

    const response = await fetch(`${API_BASE_URL}/airports?access_key=${API_ACCESS_KEY}&limit=100`);

    if (!response.ok) {
      throw new Error(`Error de API: ${response.status}`);
    }

    const data: APIResponse = await response.json();

    // Verificar si la respuesta contiene un error
    if ('error' in data) {
      throw new Error(`Error de API: ${JSON.stringify(data.error)}`);
    }

    // Mapear datos de la API al formato que necesitamos
    const airports = data.data.map(airport => ({
      id: airport.airport_id?.toString() || "",
      name: airport.airport_name || "",
      iata_code: airport.iata_code || "",
      icao_code: airport.icao_code || "",
      city: airport.city || "",
      country: airport.country_name || "",
      timezone: airport.timezone || "",
      latitude: airport.latitude ? parseFloat(airport.latitude) : 0,
      longitude: airport.longitude ? parseFloat(airport.longitude) : 0
    }));

    store.setAirports(airports);
    return airports;
  } catch (error) {
    console.error("Error fetching airports:", error);
    store.setError(`Error al cargar los datos de aeropuertos: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    return [];
  } finally {
    store.setLoading(false);
  }
};