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

  console.log("displayedAirports", displayedAirports);


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
    <div className=''>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[50px] gap-y-[45px]">
        {displayedAirports.map((airport) => (
          <div
            key={airport.id}
            onClick={() => handleAirportClick(airport.id)}
            className="rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 px-[39px] py-[29px]"
          >
            <h3 className="text-[20.52px]/[38.31px] font-bold">{airport.name}</h3>
            <div className="mb-[35px]">
              <p className='text-white font-normal text-[20.52px]/[38.31px]'>{airport.city || "No disponible"}, {airport.country}</p>
            </div>
            <div className="flex gap-2">
              <span className="font-gotham bg-gradient-to-r from-[#006AFF] to-[#00F9FF] text-transparent bg-clip-text font-medium text-[42.64px]/[100%]">
                {airport.city.slice(0, 3).toUpperCase()}
              </span>
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
