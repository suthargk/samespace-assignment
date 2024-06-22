import { createContext, useEffect, useMemo, useRef, useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Logo from "./assets/icons/Logo";
import MiniPlayer from "./components/Player/MiniPlayer";

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("#331E00");
  const [currentSong, setCurrentSong] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [isPlayerMaximize, setIsPlayerMaximize] = useState(false);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

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

  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
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

      <MiniPlayer
        setIsPlayerMaximize={setIsPlayerMaximize}
        theme={theme}
        currentSong={currentSong}
        togglePlayPause={togglePlayPause}
        isPlaying={isPlaying}
      />

      <Player
        key={currentSong.url}
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
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
