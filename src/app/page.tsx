"use client"

import { useEffect } from "react";
import { fetchAirports } from "@/services/aviationstack";
import useStore from "@/store/store";
import Image from 'next/image';

export default function Home() {
  useEffect(() => {
    // Cargar aeropuertos al montar el componente
    fetchAirports();
  }, []);

  const {
    filteredAirports,
    page,
    pageSize,
    totalPages,
    searchTerm,
    error,
    setPage,
    setSearchTerm
  } = useStore();

  const handleSearch = (e: any) => {
    e.preventDefault();

    console.log("buscando");
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen sm:p-6 md:p-8 bg-[url(/bg-home.svg)] bg-cover bg-opacity-50 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-40 before:z-0">
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <h1 className="text-[58.91px] lg:text-[88.91px] font-black text-center mb-[141px] bg-gradient-to-r from-[#006AFF] to-[#00F9FF] text-transparent bg-clip-text font-gotham">SkyConnect Explorer</h1>
        {/* <main className="flex-grow">
          <AirportTable />
        </main> */}
        <div className="relative w-full px-10">
          <form onSubmit={handleSearch} className="flex flex-col gap-[30.46px] items-center">
            <input
              type="text"
              placeholder="Buscar aeropuertos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-full bg-white
            text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-gradient-to-r from-[#0060FF] to-[#00FFE7] w-fit py-[7.8px] px-[31.2px] pr-22 border-white border-[1.3px] rounded-[10.4px] font-medium text-[19.5px]/[36.4px] line flex items-center gap-[15.6px]"
              type="submit"
            >
              <Image src={"/Minimalistic_Magnifer.svg"} alt="icono lupa" width={31.2} height={31.2} />
              Buscar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
