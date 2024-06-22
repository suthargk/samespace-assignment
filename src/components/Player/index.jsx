import { useEffect, useRef, useState } from "react";
import PlayerProgressBar from "./PlayerProgressBar";
import PreviousIcon from "../../assets/icons/PreviousIcon";
import NextIcon from "../../assets/icons/NextIcon";
import PlayIcon from "../../assets/icons/PlayIcon";
import PauseIcon from "../../assets/icons/PauseIcon";
import VolumeIcon from "../../assets/icons/VolumeIcon";
import OptionIcon from "../../assets/icons/OptionIcon";
import SpinnerIcon from "../../assets/icons/SpinnerIcon";
import PlayerLoader from "../Loader/PlayerLoader";

const Player = ({
  currentSong,
  onNext,
  onPrev,
  theme,
  isPlayerMaximize,
  setIsPlayerMaximize,
  loading,
}) => {
  const audioRef = useRef();
  const [isReady, setIsReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currrentProgress, setCurrrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerContainerRef = useRef(null);

  useEffect(() => {
    audioRef.current?.pause();
    const timeout = setTimeout(() => {
      audioRef.current?.play();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentSong]);

  const handleNext = (e) => {
    e.stopPropagation();
    onNext();
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    onPrev();
  };

  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleBufferProgress = (e) => {
    const audio = e.currentTarget;
    const dur = audio.duration;
    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (
          audio.buffered.start(audio.buffered.length - 1 - i) <
          audio.currentTime
        ) {
          const bufferedLength = audio.buffered.end(
            audio.buffered.length - 1 - i
          );
          setBuffered(bufferedLength);
          break;
        }
      }
    }
  };

  const handleMuteUnmute = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (audioRef.current.volume !== 0) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = 1;
    }
  };

  return (
    <div
      style={{ backgroundImage: `linear-gradient(135deg, ${theme}, #000000)` }}
      ref={playerContainerRef}
      onClick={() => setIsPlayerMaximize(false)}
      className={`player-container sm:p-20 md:p-0 ${
        loading ? "md:block md:top-[64px] lg:top-0" : ""
      } absolute bottom-0 left-0 right-0 h-full flex justify-center items-center duration-300 md:w-3/5 md:relative md:top-0 lg:p-16 ${
        isPlayerMaximize ? "top-0 " : " top-full"
      }`}
    >
      {loading ? (
        <PlayerLoader theme={theme} />
      ) : (
        <div className="w-3/4">
          <div className="">
            <div className="mb-6">
              <h2 className="text-2xl text-white font-semibold">
                {currentSong.name}
              </h2>
              <h5 className="opacity-50 text-sm font-light text-white">
                {currentSong.artist}
              </h5>
            </div>

            <div className="flex">
              <img
                className="lg:h-auto w-full aspect-square rounded-md"
                src={`https://cms.samespace.com/assets/${currentSong.cover}`}
              />
            </div>
          </div>

          {currentSong.url && (
            <audio
              ref={audioRef}
              preload="metadata"
              onDurationChange={(e) => setDuration(e.currentTarget.duration)}
              onPlaying={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleNext}
              onCanPlay={(e) => {
                e.currentTarget.volume = volume;
                setIsReady(true);
              }}
              onTimeUpdate={(e) => {
                setCurrrentProgress(e.currentTarget.currentTime);
                handleBufferProgress(e);
              }}
              onProgress={handleBufferProgress}
              onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
            >
              <source type="audio/mpeg" src={currentSong.url} />
            </audio>
          )}

          <PlayerProgressBar
            duration={duration}
            currentProgress={currrentProgress}
            buffered={buffered}
            onChange={(e) => {
              if (!audioRef.current) return;

              audioRef.current.currentTime = e.currentTarget.valueAsNumber;

              setCurrrentProgress(e.currentTarget.valueAsNumber);
            }}
          />

          <div className="mt-6 flex justify-between items-center">
            <div className="cursor-pointer">
              <OptionIcon />
            </div>

            <div className="flex items-center gap-4 justify-self-center">
              <div
                onClick={handlePrev}
                aria-label="go to previous"
                className="cursor-pointer"
              >
                <PreviousIcon />
              </div>
              <div
                disabled={!isReady}
                className="cursor-pointer"
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
                size="lg"
              >
                {!isReady && currentSong.url ? (
                  <SpinnerIcon />
                ) : isPlaying ? (
                  <PauseIcon />
                ) : (
                  <PlayIcon />
                )}
              </div>
              <div
                className="cursor-pointer"
                onClick={handleNext}
                aria-label="go to next"
              >
                <NextIcon />
              </div>
            </div>

            <div className="flex gap-3 items-center justify-self-end cursor-pointer">
              <div
                onClick={handleMuteUnmute}
                aria-label={volume === 0 ? "unmute" : "mute"}
              >
                {volume === 0 ? (
                  <div className="relative ">
                    <VolumeIcon />
                    <div className="rounded-full h-3/5 top-2.5 left-1/2 w-1 absolute bg-white -rotate-45"></div>
                  </div>
                ) : (
                  <VolumeIcon />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
