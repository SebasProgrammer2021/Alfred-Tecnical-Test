"use client"

import React from 'react';
import useStore from '@/store/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AirportsList = () => {
  const router = useRouter();
  const { filteredAirports, page, pageSize, totalPages, setPage } = useStore();

  // Calcular los aeropuertos a mostrar en la página actual
  const startIndex = (page - 1) * pageSize;
  const displayedAirports = filteredAirports.slice(startIndex, startIndex + pageSize);

  // Navegar a la página de detalles del aeropuerto
  const handleAirportClick = (airportId: string) => {
    router.push(`/airport/${airportId}`);
  };

  // Manejar cambio de página
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  // Renderizar botones de paginación
  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${page === i
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  if (displayedAirports.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">No se encontraron aeropuertos que coincidan con tu búsqueda.</p>
        <Link
          href="/"
          className="mt-4 inline-block text-blue-600 hover:text-blue-800 underline"
        >
          Volver a la búsqueda
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedAirports.map((airport) => (
          <div
            key={airport.id}
            onClick={() => handleAirportClick(airport.id)}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 p-4"
          >
            <div className="flex items-center mb-2">
              <div className="bg-blue-100 text-blue-800 font-bold rounded p-2 mr-3">
                {airport.iata_code || airport.icao_code || "N/A"}
              </div>
              <h3 className="text-lg font-semibold">{airport.name}</h3>
            </div>
            <div className="text-sm text-gray-600">
              <p><span className="font-medium">País:</span> {airport.country}</p>
              <p><span className="font-medium">Ciudad:</span> {airport.city || "No disponible"}</p>
              <p><span className="font-medium">Código IATA:</span> {airport.iata_code || "No disponible"}</p>
              <p><span className="font-medium">Código ICAO:</span> {airport.icao_code || "No disponible"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 mx-1 rounded ${page === 1 ? "bg-gray-100 text-gray-400" : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            &lt;
          </button>

          {renderPagination()}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-3 py-1 mx-1 rounded ${page === totalPages ? "bg-gray-100 text-gray-400" : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            &gt;
          </button>
        </div>
      )}

      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Volver a la búsqueda
        </Link>
      </div>
    </div>
  );
};

export default AirportsList;
