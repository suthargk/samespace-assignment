import { useOutletContext } from "react-router-dom";
import SongItem from "./SongItem";

const TopTracks = () => {
  const { songs } = useOutletContext();

  return (
    <div className="space-y-2">
      {songs
        .filter((song) => song.top_track)
        .map((song, index) => {
          return <SongItem key={song.id} song={song} index={index} />;
        })}
    </div>
  );
};

export default TopTracks;
