import MiniPlayerPlayIcon from "../../assets/icons/MiniPlayerPlayIcon";
import PauseIcon from "../../assets/icons/PauseIcon";
import PlayIcon from "../../assets/icons/PlayIcon";

const MiniPlayer = ({
  togglePlayPause,
  setIsPlayerMaximize,
  theme,
  isPlaying,
  currentSong,
}) => {
  return (
    <div
      style={{ background: theme }}
      onClick={() => {
        setIsPlayerMaximize(true);
      }}
      className="md:hidden fixed bottom-0 left-0 brightness-125 h-12 w-full text-white flex justify-between"
    >
      <div className="flex gap-3">
        <div className="w-12 h-full">
          <img
            className="w-full h-full"
            src={`https://cms.samespace.com/assets/${currentSong.cover}`}
          />
        </div>
        <div className="p-1">
          <h3 className="font-light text-sm">{currentSong.name}</h3>
          <h5 className="text-xs opacity-60">{currentSong.artist}</h5>
        </div>
      </div>

      <div onClick={togglePlayPause} className="flex justify-center items-center">
        {isPlaying ? (
          <PauseIcon className="text-white" theme={theme} isBackgroundHidden />
        ) : (
          <MiniPlayerPlayIcon className="w-5 h-5"/>
        )}
      </div>
    </div>
  );
};

export default MiniPlayer;
