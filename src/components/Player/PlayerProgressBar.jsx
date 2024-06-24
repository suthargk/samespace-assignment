const PlayerProgressBar = ({
  duration,
  currentProgress,
  buffered,
  ...rest
}) => {
  const progressBarWidth = isNaN(currentProgress / duration)
    ? 0
    : currentProgress / duration;
  const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;

  const progressStyles = {
    "--progress-width": progressBarWidth,
    "--buffered-width": bufferedWidth,
  };

  return (
    <div className="h-[4px] relative mt-5">
      <input
        type="range"
        name="progress"
        className={`progress-bar absolute inset-0 w-full m-0 h-full bg-gray-600 appearance-none cursor-pointer group-hover:h-2 transition-all accent-white  before:absolute before:inset-0 before:h-full before:w-full before:bg-white before:rounded-full rounded-full before:origin-left after:absolute after:h-full after:rounded-full after:w-full after:bg-zinc-300`}
        style={progressStyles}
        min={0}
        max={duration}
        value={currentProgress}
        {...rest}
      />
    </div>
  );
};

export default PlayerProgressBar;
