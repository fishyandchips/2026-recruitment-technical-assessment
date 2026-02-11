import Navbar from "@/components/Navbar";
import buildings from "../data.json";

export default function Home() {


  return (
    <>
      <Navbar />

      <main className="flex flex-col w-full px-6 pb-2">
        <header className="flex w-full py-4 justify-between">
          <button className="flex w-35 h-11 justify-center items-center gap-2 text-[#EF6C00] border-2 border-[#EF6C00] rounded-lg font-roboto cursor-pointer">
            <span className="material-symbols-filled text-[1.5rem]">filter_alt</span>
            <span className="font-bold">Filters</span>
          </button>

          

          <button className="flex w-35 h-11 justify-center items-center gap-2 text-[#EF6C00] border-2 border-[#EF6C00] rounded-lg font-roboto cursor-pointer">
            <span className="material-symbols-filled text-[1.5rem]">filter_list</span>
            <span className="font-bold">Sort</span>
          </button>
        </header>

        <div className="flex flex-wrap w-full gap-5">
          {buildings.map(({name, rooms_available, building_picture}, i) => {
            return (
              <div 
                key={i} 
                className="flex flex-col justify-end relative w-[calc((100%-5rem)/5)] h-96 bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `url(${`/assets/` + building_picture})`,
                }}
              >
                <div className="absolute w-full h-full rounded-lg bg-[#EF6C00] opacity-0 hover:opacity-25 transition-all duration-100 ease-in-out cursor-pointer" />
                
                <div className="absolute top-2.5 right-2.5 flex items-center bg-[#FFFFFF] rounded-2xl py-2.5 px-4 gap-2.5">
                  <div className="flex shrink-0 w-2.5 h-2.5 rounded-full bg-[#54A95E]" />
                  <span className="text-[0.75rem] font-semibold">{rooms_available} rooms available</span>
                </div>

                <div className="flex items-center w-[calc(100%-1.25rem)] rounded-xl bg-[#EF6C00] pl-5 py-3.5 mb-2.5 mx-2.5 z-20">
                  <span className="text-[#FFFFFF] font-roboto font-semibold">{name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
