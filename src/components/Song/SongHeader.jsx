import SearchIcon from "../../assets/icons/SearchIcon";
import SongNavigation from "./SongNavigation";
import { useContext } from "react";
import { ThemeContext } from "../../App";

const SongHeader = () => {
  const { theme, search, handleSearch } = useContext(ThemeContext);

  return (
    <div className="space-y-4">
      <SongNavigation />
      <label
        style={{ background: theme }}
        htmlFor="search"
        className="w-full flex relative rounded-md overflow-hidden brightness-150"
      >
        <input
          id="search"
          type="text"
          value={search}
          onChange={handleSearch}
          className="py-1.5 w-full text-white placeholder:opacity-70 bg-inherit px-4 focus:outline-none"
          placeholder="Search Song, Artist"
        />
        {/* <div className="absolute left-2 text-white z-10 text-sm font-light top-1/2 -translate-y-1/2">
          Search Song, Artist
        </div> */}
        <div className="absolute z-10 top-1/2 -translate-y-1/2 right-4 text-white opacity-60">
          <SearchIcon className="w-5 h-5" />
        </div>
      </label>
    </div>
  );
};

export default SongHeader;
