import Navbar from "@/components/Navbar";
import BrowseHeader from "@/components/BrowseHeader";
import buildings from "../data.json";

export default function Browse() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col w-full px-4 sm:px-6 pb-2">
        <BrowseHeader />

        <div className="grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-4 sm:gap-5">
          {buildings.map(({name, rooms_available, building_picture}, i) => {
            return (
              <div 
                key={i} 
                className="flex sm:flex-col justify-between items-center sm:justify-end relative h-25 sm:h-50 md:h-75 lg:h-96 bg-[#EF6C00] bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `url(${`/assets/` + building_picture})`,
                }}
              >
                <div className="absolute w-full h-full rounded-lg bg-[#000000] hover:bg-[#EF6C00] opacity-30 sm:opacity-0 hover:opacity-25 transition-all duration-100 ease-in-out cursor-pointer" />
                
                <div className="flex items-center sm:w-[calc(100%-1.25rem)] rounded-xl sm:bg-[#EF6C00] pl-4 sm:pl-5 py-3.5 sm:mb-2.5 sm:mx-2.5 z-20 pointer-events-none">
                  <span className="text-[#FFFFFF] font-roboto font-semibold">{name}</span>
                </div>

                <div className="relative sm:absolute sm:top-2.5 sm:right-2.5 flex items-center bg-[#FFFFFF] rounded-2xl mr-4 sm:mr-0 py-2.5 px-4 gap-2.5 pointer-events-none">
                  <div className="flex shrink-0 w-2.5 h-2.5 rounded-full bg-[#54A95E]" />
                  <span className="text-[0.75rem] font-semibold">
                    <span>{rooms_available}</span>
                    <span className="sm:hidden"> / {rooms_available}</span>
                    <span className="hidden sm:inline"> rooms available</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
