"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useStore from "@/store/store";
import AirportMap from "@/components/AirportMap";
import { fetchAirports } from "@/services/aviationstack";
import Link from "next/link";

export default function AirportDetails() {
  const params = useParams();
  const router = useRouter();
  const { airports, isLoading, error, setSelectedAirport, selectedAirport } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;

    // Si no tenemos aeropuertos, los cargamos
    if (airports.length === 0) {
      fetchAirports().then(() => findAirport(id));
    } else {
      findAirport(id);
    }
  }, [params.id, airports]);

  const findAirport = (id: string) => {
    setLoading(true);
    
    const airport = airports.find(airport => airport.id === id);
    
    if (airport) {
      setSelectedAirport(airport);
    }
    
    setLoading(false);
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded mb-4 max-w-md">
          <p>{error}</p>
        </div>
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Volver a la lista de aeropuertos
        </Link>
      </div>
    );
  }

  if (!selectedAirport) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded mb-4 max-w-md">
          <p>No se encontró información para este aeropuerto.</p>
        </div>
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Volver a la lista de aeropuertos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-4xl">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Volver a la lista
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">{selectedAirport.name}</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            IATA: {selectedAirport.iata_code}
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            ICAO: {selectedAirport.icao_code}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Información General</h2>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-600">Ciudad:</span>
              <span className="ml-2">{selectedAirport.city}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">País:</span>
              <span className="ml-2">{selectedAirport.country}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Zona Horaria:</span>
              <span className="ml-2">{selectedAirport.timezone}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Coordenadas:</span>
              <span className="ml-2">
                {selectedAirport.latitude.toFixed(6)}, {selectedAirport.longitude.toFixed(6)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Información Adicional</h2>
          <p className="text-gray-600">
            Este aeropuerto se encuentra en la ciudad de {selectedAirport.city}, {selectedAirport.country}, y opera con 
            los códigos IATA {selectedAirport.iata_code} e ICAO {selectedAirport.icao_code}.
          </p>
          <p className="text-gray-600 mt-3">
            La zona horaria del aeropuerto es {selectedAirport.timezone}.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Ubicación en el Mapa</h2>
        <AirportMap 
          latitude={selectedAirport.latitude} 
          longitude={selectedAirport.longitude} 
          name={selectedAirport.name}
        />
      </div>
    </div>
  );
} 