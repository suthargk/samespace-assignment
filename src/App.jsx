import { createContext, useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState(
    `linear-gradient(135deg, #331E00, #000000)`
  );
  const [currentSong, setCurrentSong] = useState("");

  const handleSelectSong = (song) => {
    setCurrentSong(song);
    
    setTheme(`linear-gradient(135deg, ${song.accent}, #000000)`);
  };

  // https://cms.samespace.com/items/songs

  return (
    <div style={{ backgroundImage: theme }} className={`flex h-screen p-10 justify-between`}>
      <div className="w-1/5"></div>
      <ThemeContext.Provider value={{ setTheme, handleSelectSong }}>
        <Song />
      </ThemeContext.Provider>
      <Player currentSong={currentSong} />
    </div>
  );
}

export default App;
