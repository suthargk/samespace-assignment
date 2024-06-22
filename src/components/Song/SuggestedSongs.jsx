import { useOutletContext } from "react-router-dom";
import SongItem from "./SongItem";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import SongItemLoader from "../Loader/SongItemLoader";

const SuggestedSongs = () => {
  const { songs } = useOutletContext();
  const { searchSongsLength, search, loading, theme } =
    useContext(ThemeContext);

  if (loading)
    return (
      <div className="flex flex-col gap-2">
        <SongItemLoader theme={theme} />
        <SongItemLoader theme={theme} />
        <SongItemLoader theme={theme} />
        <SongItemLoader theme={theme} />
        <SongItemLoader theme={theme} />
        <SongItemLoader theme={theme} />
        <SongItemLoader theme={theme} />
        <SongItemLoader theme={theme} />
        <SongItemLoader theme={theme} />
      </div>
    );

  return (
    <div className="overflow-auto h-screen">
      {search && !searchSongsLength ? (
        <div className="h-20 flex justify-center items-center text-white opacity-60">
          No result found for {search}
        </div>
      ) : (
        <div className="space-y-2 ">
          {songs.map((song, index) => {
            return <SongItem key={song.id} song={song} index={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SuggestedSongs;
