import SearchIcon from "../../assets/icons/SearchIcon";
import SongNavigation from "./SongNavigation";

const SongHeader = () => {
  return (
    <div className="space-y-4">
      <SongNavigation />
      <label htmlFor="search" className="w-full flex relative">
        <input
          id="search"
          type="text"
          className="py-1.5 w-full rounded-md px-3 placeholder:font-light placeholder:text-sm placeholder:opacity-1 bg-white opacity-10"
          placeholder="Search Song, Artist"
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-400">
          <SearchIcon className="w-5 h-5" />
        </div>
      </label>
    </div>
  );
};

export default SongHeader;
