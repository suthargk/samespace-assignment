import { useOutletContext } from "react-router-dom";
import SongItem from "./SongItem";

const SuggestedSongs = () => {
  const { songs } = useOutletContext();
  return (
    <div className="space-y-8">
      {songs.map((song) => {
        return <SongItem key={song.id} song={song} />;
      })}
    </div>
  );
};

export default SuggestedSongs;
