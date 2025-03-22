"use client"

import { useEffect } from "react";
import { fetchAirports } from "@/services/aviationstack";
import useStore from "@/store/store";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    fetchAirports();

    setSearchTerm("");
  }, []);

  const {
    searchTerm,
    setSearchTerm
  } = useStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      router.push(`/airportsList?q=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push('/airportsList');
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen sm:p-6 md:p-8 bg-[url(/bg-home.svg)] bg-cover bg-opacity-50 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-20 before:z-0">
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <h1 className="text-[58.91px] lg:text-[88.91px] font-black text-center mb-[141px] bg-gradient-to-r from-[#006AFF] to-[#bfdddd] text-transparent bg-clip-text font-gotham">SkyConnect Explorer</h1>
        <div className="relative w-full px-10">
          <form onSubmit={handleSearch} className="flex flex-col gap-[30.46px] items-center">
            <input
              type="text"
              placeholder="Buscar aeropuertos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full xl:w-[780px] px-4 py-4 rounded-full bg-white
            text-[#006FEE] placeholder:text-[#006FEE] placeholder:font-normal placeholder:text-xl/[36.59px] focus:outline-none"
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
