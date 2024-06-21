import { Outlet } from "react-router-dom";
import SongHeader from "./SongHeader";

const SongList = ({ songs }) => {
  return (
    <div className="w-[400px] space-y-4 border border-red-500">
      <SongHeader />
      <Outlet context={{ songs }} />
    </div>
  );
};

export default SongList;
