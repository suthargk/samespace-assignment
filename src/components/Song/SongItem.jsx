import { useContext } from "react";
import { ThemeContext } from "../../App";

const SongItem = ({ song }) => {
  const { setTheme, handleSelectSong } = useContext(ThemeContext);

  return (
    <div
      className="flex gap-2 cursor-pointer"
      onClick={() => handleSelectSong(song)}
    >
      <div className="w-10 h-10">
        <img
          className="w-full h-full rounded-full"
          src={`https://cms.samespace.com/assets/${song.cover}`}
        />
      </div>

      <div>
        <h3 className="text-sm text-white">{song.name}</h3>
        <h4 className="text-xs text-gray-400 font-light opacity-70">{song.artist}</h4>
      </div>
    </div>
  );
};

export default SongItem;
