import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export default function Navbar() {
  return (
    <header className="flex flex-wrap gap-4 w-full py-4 justify-between">
      <button className="flex order-2 md:order-1 w-35 h-11 justify-center items-center gap-2 text-[#EF6C00] border-2 border-[#EF6C00] rounded-lg font-roboto cursor-pointer">
        <span className="material-symbols-filled text-[1.5rem]">filter_alt</span>
        <span className="font-bold">Filters</span>
      </button>

      <InputGroup className="order-1 w-full md:order-2 md:w-[50%] h-11 text-[5rem]">
        <InputGroupInput className="placeholder:text-[#000000]/45 placeholder:text-[1rem]" placeholder="Search for a building..." />
        <InputGroupAddon className="pl-4">
          <button className="flex aspect-square w-auto h-full justify-center items-center">
            <span className="material-symbols-filled text-black/50 text-[1.5rem]">search</span>
          </button>
        </InputGroupAddon>
      </InputGroup>

      <button className="flex order-3 md:order-3 w-35 h-11 justify-center items-center gap-2 text-[#EF6C00] border-2 border-[#EF6C00] rounded-lg font-roboto cursor-pointer">
        <span className="material-symbols-filled text-[1.5rem]">filter_list</span>
        <span className="font-bold">Sort</span>
      </button>
    </header>
  );
}
