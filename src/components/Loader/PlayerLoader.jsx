const PlayerLoader = ({ theme }) => {
  return (
    <div className="flex flex-col gap-2 w-4/5 md:w-full">
      <div
        style={{ background: theme }}
        className="animate-pulse h-8 rounded-md opacity-20 w-72"
      ></div>
      <div
        style={{ background: theme }}
        className="animate-pulse h-4 rounded-md opacity-20 w-36"
      ></div>

      <div
        style={{ background: theme }}
        className="animate-pluse h-96 rounded-md opacity-20 w-full"
      ></div>

      <div
        style={{ background: theme }}
        className="animate-pluse h-20 rounded-md opacity-20 w-full"
      ></div>
    </div>
  );
};

export default PlayerLoader;
