import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex w-full h-16.5 px-4 py-3 justify-center items-center border-b border-[#000000]/10">
      <div className="flex w-full h-full justify-between">
        <div className="flex items-center font-bold text-[2rem] text-[#EF6C00] cursor-pointer hover:opacity-50 transition-all duration-200 ease-in-out">
          <Image src="/assets/freeRoomsLogo.png" alt="Freerooms Logo" width={50} height={50} />
          <span className="font-logo font-semibold">Freerooms</span>
        </div>

        <div className="flex gap-2">
          <button className="flex aspect-square w-auto h-full justify-center items-center rounded-sm border border-[#EF6C00]/50 hover:bg-[#EF6C00]/5 hover:border-[#EF6C00] cursor-pointer transition-all duration-300 ease-in-out">
            <span className="material-symbols-filled text-[#EF6C00] text-[1.5rem]">search</span>
          </button>

          <button className="flex relative aspect-square w-auto h-full justify-center items-center rounded-sm bg-[#EF6C00] group cursor-pointer">
            <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 rounded-sm transition-opacity duration-300 ease-in-out"></span>
            <span className="material-symbols-filled text-[#FFFFFF] text-[1.5rem] z-20">grid_view</span>
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
