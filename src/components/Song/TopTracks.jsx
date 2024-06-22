import { useOutletContext } from "react-router-dom";
import SongItem from "./SongItem";
import { useContext } from "react";
import { ThemeContext } from "../../App";

const TopTracks = () => {
  const { songs } = useOutletContext();
  const { search } = useContext(ThemeContext);
  const topTracks = songs.filter((song) => song.top_track);

  return (
    <div className="overflow-auto h-screen">
      {search && !topTracks.length ? (
        <div className="h-20 flex justify-center items-center text-white opacity-60"> No result found for {search}</div>
      ) : (
        <div className="space-y-2 ">
          {topTracks.map((song, index) => {
            return <SongItem key={song.id} song={song} index={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default TopTracks;
