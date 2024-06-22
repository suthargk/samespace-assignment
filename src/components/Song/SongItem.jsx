import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../App";
import formatDurationDisplay from "../../utils";

const SongItem = ({ song, index }) => {
  const { theme, currentSong, handleSelectSong } = useContext(ThemeContext);
  const songItemRef = useRef(null);
  const audioRef = useRef(null);
  const [duration, setDuration] = useState("");
  const handleMouseEnter = () => {
    songItemRef.current.style.background = theme;
  };

  const handleMouseLeave = () => {
    if (currentSong.id === song.id) {
      return;
    }
    songItemRef.current.style.background = "";
  };

  useEffect(() => {
    if (currentSong.id === song.id) {
      songItemRef.current.style.background = theme;
      return;
    }
    songItemRef.current.style.background = "";
  }, [currentSong.id]);

  useEffect(() => {
    audioRef.current.onloadedmetadata = function () {
      const duration = audioRef.current.duration;
      setDuration(formatDurationDisplay(duration));
    };
  }, []);

  return (
    <div
      ref={songItemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex duration-300 justify-between items-center cursor-pointer ${
        song.id === currentSong.id ? "brightness-150" : ""
      } hover:brightness-150 p-2 rounded-md`}
      onClick={() => {
        songItemRef.current.style.background = theme;
        handleSelectSong({ song, index });
      }}
    >
      <audio ref={audioRef} className="hidden" src={song.url}></audio>
      <div className="flex gap-2">
        <div className="w-10 h-10">
          <img
            className="w-full h-full rounded-full"
            src={`https://cms.samespace.com/assets/${song.cover}`}
          />
        </div>

        <div>
          <h3 className="text-sm text-white">{song.name}</h3>
          <h4 className="text-xs text-gray-400 font-light opacity-70">
            {song.artist}
          </h4>
        </div>
      </div>

      <div className="text-sm text-white opacity-70">{duration}</div>
    </div>
  );
};

export default SongItem;
