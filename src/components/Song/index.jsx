
import SongList from "./SongList";

const Song = ({songs}) => {
  

  return (
    <div className="w-full md:w-2/5 p-2">
      <SongList songs={songs} />
    </div>
  );
};

export default Song;
