import { useOutletContext } from "react-router-dom";
import SongItem from "./SongItem";

const SuggestedSongs = () => {
  const { songs } = useOutletContext();
  return (
    <div className="space-y-2">
      {songs.map((song, index) => {
        return <SongItem key={song.id} song={song} index={index} />;
      })}
    </div>
  );
};

export default SuggestedSongs;
