"use client"

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AirportsList from './airportsList/AirportsList';
import useStore from '@/store/store';
import { fetchAirports } from '@/services/aviationstack';
import Image from 'next/image';

export default function AirportsListPage() {
  const searchParams = useSearchParams();
  const { searchTerm, setSearchTerm, filteredAirports, isLoading, error } = useStore();

  useEffect(() => {
    fetchAirports();

    setSearchTerm("");
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(searchTerm);
  }

  return (
    <div className="container mx-auto py-10">
      <div className='flex w-full items-center gap-[128px] justify-center mb-[63.48px]'>
        <h1 className="text-[58.91px] lg:text-[50.46px] w-full font-black text-center bg-gradient-to-r from-[#006AFF] to-[#00F9FF] text-transparent bg-clip-text font-gotham text-nowrap">SkyConnect Explorer</h1>
        <form onSubmit={handleSearch} className="flex gap-[70px] items-center">
          <input
            type="text"
            placeholder="Buscar aeropuertos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full xl:w-[780px] px-4 py-4 rounded-full bg-white
            text-[#006FEE] placeholder:text-[#006FEE] placeholder:font-normal placeholder:text-xl/[36.59px] focus:outline-none"
          />
          <button
            className="bg-gradient-to-r from-[#0060FF] to-[#00FFE7] w-fit py-[7.8px] px-[31.2px] pr-22 border-white border-[1.3px] rounded-[10.4px] text-white font-medium text-[17.63px]/[32.9px] line flex items-center gap-[15.6px]"
            type="submit"
          >
            <Image src={"/Minimalistic_Magnifer.svg"} alt="icono lupa" width={31.2} height={31.2} />
            Buscar
          </button>
        </form>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <AirportsList />
        </div>
      )}
    </div>
  );
} 