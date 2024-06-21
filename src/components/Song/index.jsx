import { useEffect } from "react";
import { useState } from "react";
import SongList from "./SongList";

const Song = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("https://cms.samespace.com/items/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data.data));
  }, []);

  return (
    <div className="w-2/5 p-2">
      <SongList songs={songs} />
    </div>
  );
};

export default Song;
