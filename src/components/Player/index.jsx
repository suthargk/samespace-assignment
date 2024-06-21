import { useEffect, useRef, useState } from "react";
import PlayerProgressBar from "./PlayerProgressBar";

function formatDurationDisplay(duration) {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration - min * 60);

  const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":");

  return formatted;
}

const Player = ({ currentSong }) => {
  const audioRef = useRef();
  const [isReady, setIsReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currrentProgress, setCurrrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(0.2);
  const [isPlaying, setIsPlaying] = useState(false);

  const durationDisplay = formatDurationDisplay(duration);
  const elapsedDisplay = formatDurationDisplay(currrentProgress);

  useEffect(() => {
    audioRef.current?.pause();

    const timeout = setTimeout(() => {
      audioRef.current?.play();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentSong]);

  const handleNext = () => {
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  const togglePlayPause = () => {
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

  const handleMuteUnmute = () => {
    if (!audioRef.current) return;

    if (audioRef.current.volume !== 0) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = 1;
    }
  };

  const handleVolumeChange = (volumeValue) => {
    if (!audioRef.current) return;
    audioRef.current.volume = volumeValue;
    setVolume(volumeValue);
  };

  return (
    <div className="w-2/5">
      {currentSong && (
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

      <div className="flex flex-col items-center justify-center">
        <div className="text-center mb-1">
          <p className="text-slate-300 font-bold">
            {currentSong?.name ?? "Select a song"}
          </p>
          <p className="text-xs">Singer Name</p>
        </div>
      </div>
      <div className=" mt-4">
        <span className="text-xs">
          {elapsedDisplay} / {durationDisplay}
        </span>
        <div className="flex items-center gap-4 justify-self-center">
          <div
            onClick={handlePrev}
            // disabled={songIndex === 0}
            aria-label="go to previous"
          >
            previous
          </div>
          <div
            disabled={!isReady}
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            size="lg"
          >
            {!isReady && currentSong ? "spinner" : isPlaying ? "Pause" : "Play"}
          </div>
          <div
            onClick={handleNext}
            // disabled={songIndex === songCount - 1}
            aria-label="go to next"
          >
            Next
          </div>
        </div>

        <div className="flex gap-3 items-center justify-self-end">
          <div
            size="sm"
            onClick={handleMuteUnmute}
            aria-label={volume === 0 ? "unmute" : "mute"}
          >
            {volume === 0 ? "Off" : "Up"}
          </div>
          {/* <VolumeInput volume={volume} onVolumeChange={handleVolumeChange} /> */}
        </div>
      </div>
    </div>
  );
};

export default Player;
