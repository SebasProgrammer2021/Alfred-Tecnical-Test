import { City } from "@/services/aviationstack";

export const generateMockCities = (): City[] => {
  return [
    { id: "1", iata_code: "MAD", name: "Madrid", country: "España" },
    { id: "2", iata_code: "BCN", name: "Barcelona", country: "España" },
    { id: "3", iata_code: "JFK", name: "Nueva York", country: "Estados Unidos" },
    { id: "4", iata_code: "LON", name: "Londres", country: "Reino Unido" },
    { id: "5", iata_code: "TYO", name: "Tokio", country: "Japón" },
    { id: "6", iata_code: "PAR", name: "París", country: "Francia" },
    { id: "7", iata_code: "LAX", name: "Los Ángeles", country: "Estados Unidos" },
    { id: "8", iata_code: "DXB", name: "Dubái", country: "Emiratos Árabes Unidos" },
    { id: "9", iata_code: "FRA", name: "Frankfurt", country: "Alemania" },
    { id: "10", iata_code: "HKG", name: "Hong Kong", country: "China" },
    { id: "11", iata_code: "SIN", name: "Singapur", country: "Singapur" },
    { id: "12", iata_code: "AMS", name: "Ámsterdam", country: "Países Bajos" },
    { id: "13", iata_code: "SYD", name: "Sídney", country: "Australia" },
    { id: "14", iata_code: "YYZ", name: "Toronto", country: "Canadá" },
    { id: "15", iata_code: "LIS", name: "Lisboa", country: "Portugal" }
  ];
};

export const generateMockAirports = () => {
  return [
    {
      id: "1",
      name: "Aeropuerto Internacional Adolfo Suárez Madrid-Barajas",
      iata_code: "MAD",
      icao_code: "LEMD",
      city: "Madrid",
      city_name: "Madrid",
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
      city_name: "Barcelona",
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
      city_name: "Nueva York",
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
      city_name: "Londres",
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
      city_name: "Tokio",
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
      city_name: "París",
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
      city_name: "Los Ángeles",
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
      city_name: "Dubái",
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
      city_name: "Frankfurt",
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
      city_name: "Hong Kong",
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
      city_name: "Singapur",
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
      city_name: "Ámsterdam",
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
      city_name: "Sídney",
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
      city_name: "Toronto",
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
      city_name: "Lisboa",
      country: "Portugal",
      timezone: "Europe/Lisbon",
      latitude: 38.774167,
      longitude: -9.134167
    }
  ];
};
