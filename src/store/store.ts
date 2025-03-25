import { create } from "zustand"

type Airport = {
  id: string;
  name: string;
  iata_code: string;
  icao_code: string;
  city: string;
  city_name: string;
  country: string;
  timezone: string;
  latitude: number;
  longitude: number;
}

type AirportsState = {
  airports: Airport[];
  filteredAirports: Airport[];
  selectedAirport: Airport | null;
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  pageSize: number;
  
  // Acciones
  setAirports: (airports: Airport[]) => void;
  setSelectedAirport: (airport: Airport | null) => void;
  setSearchTerm: (term: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setPage: (page: number) => void;
  filterAirports: () => void;
}

const useStore = create<AirportsState>()((set, get) => ({
  airports: [],
  filteredAirports: [],
  selectedAirport: null,
  searchTerm: "",
  isLoading: false,
  error: null,
  page: 1,
  totalPages: 1,
  pageSize: 10,
  
  setAirports: (airports) => {
    set({ 
      airports,
      filteredAirports: airports,
      totalPages: Math.ceil(airports.length / get().pageSize)
    });
    get().filterAirports();
  },
  
  setSelectedAirport: (airport) => set({ selectedAirport: airport }),
  
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterAirports();
  },
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  setPage: (page) => set({ page }),
  
  filterAirports: () => {
    const { airports, searchTerm, pageSize, page } = get();
    
    const filtered = searchTerm 
      ? airports.filter(airport => 
          airport.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          airport.iata_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          airport.icao_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (airport.city_name && airport.city_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          airport.city.toLowerCase().includes(searchTerm.toLowerCase()))
      : [...airports];
    
    set({ 
      filteredAirports: filtered,
      totalPages: Math.ceil(filtered.length / pageSize)
    });
  }
}));

export default useStore;