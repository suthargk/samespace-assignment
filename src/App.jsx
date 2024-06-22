import { createContext, useEffect, useMemo, useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Logo from "./assets/icons/Logo";

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("#331E00");
  const [currentSong, setCurrentSong] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [isPlayerMaximize, setIsPlayerMaximize] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchSongs = useMemo(() => {
    return songs.filter((song) =>
      song.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  useEffect(() => {
    if (songs.length) {
      setCurrentSong(songs[currentSongIndex]);
    }
  }, [currentSongIndex]);

  useEffect(() => {
    fetch("https://cms.samespace.com/items/songs")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data.data);
        setCurrentSong(data.data[currentSongIndex]);
        setLoading(false);
      });
  }, []);

  const handleSelectSong = ({ song, index }) => {
    setCurrentSong(song);
    setTheme(song.accent);
    setCurrentSongIndex(index);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <div
      style={{ backgroundImage: `linear-gradient(135deg, ${theme}, #000000)` }}
      className={`flex h-screen p-3 lg:p-10 justify-between relative overflow-hidden`}
    >
      <div className="lg:block lg:w-1/5 hidden">
        <Logo />
      </div>

      <ThemeContext.Provider
        value={{
          handleSearch,
          setSearch,
          search,
          theme,
          setTheme,
          currentSong,
          handleSelectSong,
          loading,
          searchSongsLength: searchSongs.length,
        }}
      >
        <Song songs={search ? searchSongs : songs} />
      </ThemeContext.Provider>

      <div
        style={{ background: theme }}
        onClick={() => {
          setIsPlayerMaximize(true);
        }}
        className="md:hidden fixed bottom-0 left-0 brightness-125 h-12 w-full text-white flex"
      >
        <div className="flex gap-3">
          <div className="w-12 h-full">
            <img
              className="w-full h-full"
              src={`https://cms.samespace.com/assets/${currentSong.cover}`}
            />
          </div>
          <div className="p-1">
            <h3 className="font-light text-sm">{currentSong.name}</h3>
            <h5 className="text-xs opacity-60">{currentSong.artist}</h5>
          </div>
        </div>
      </div>

      <Player
        key={currentSong.url}
        isPlayerMaximize={isPlayerMaximize}
        setIsPlayerMaximize={setIsPlayerMaximize}
        currentSong={currentSong}
        loading={loading}
        theme={theme}
        onNext={() => {
          const nextIndex =
            currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1;

          setTheme(songs[nextIndex].accent);
          setCurrentSongIndex(nextIndex);
        }}
        onPrev={() => {
          const prevIndex =
            currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
          setTheme(songs[prevIndex].accent);
          setCurrentSongIndex(prevIndex);
        }}
      />
    </div>
  );
}

export default App;
