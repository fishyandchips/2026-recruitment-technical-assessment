import FreeroomsLogo from "../assets/freeRoomsLogo.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex w-full h-16.5 px-4 py-3 justify-center items-center border-b border-[#000000]/10">
      <div className="flex w-full h-full justify-between">
        <div className="flex items-center font-bold text-[2rem] text-[#EF6C00]">
          <Image src={FreeroomsLogo} alt="Freerooms Logo" width={50} height={50} />
          <span className="font-logo font-semibold">Freerooms</span>
        </div>

        <div className="flex gap-2">
          <button className="flex aspect-square w-auto h-full justify-center items-center rounded-sm border border-[#EF6C00]/50 hover:bg-[#EF6C00]/5 hover:border-[#EF6C00] cursor-pointer transition-all duration-300 ease-in-out">
            <span className="material-symbols-filled text-[#EF6C00] text-[1.5rem]">search</span>
          </button>

          <button className="flex aspect-square w-auto h-full justify-center items-center rounded-sm border border-[#EF6C00]/50 hover:bg-[#EF6C00]/5 hover:border-[#EF6C00] cursor-pointer transition-all duration-300 ease-in-out">
            <span className="material-symbols-filled text-[#EF6C00] text-[1.5rem]">grid_view</span>
          </button>

          <button className="flex aspect-square w-auto h-full justify-center items-center rounded-sm border border-[#EF6C00]/50 hover:bg-[#EF6C00]/5 hover:border-[#EF6C00] cursor-pointer transition-all duration-300 ease-in-out">
            <span className="material-symbols-filled text-[#EF6C00] text-[1.5rem]">door_open</span>
          </button>

          <button className="flex aspect-square w-auto h-full justify-center items-center rounded-sm border border-[#EF6C00]/50 hover:bg-[#EF6C00]/5 hover:border-[#EF6C00] cursor-pointer transition-all duration-300 ease-in-out">
            <span className="material-symbols-filled text-[#EF6C00] text-[1.5rem]">map</span>
          </button>

          <button className="flex aspect-square w-auto h-full justify-center items-center rounded-sm border border-[#EF6C00]/50 hover:bg-[#EF6C00]/5 hover:border-[#EF6C00] cursor-pointer transition-all duration-300 ease-in-out">
            <span className="material-symbols-filled text-[#EF6C00] text-[1.5rem]">dark_mode</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
