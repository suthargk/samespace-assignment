import { Outlet } from "react-router-dom";
import SongHeader from "./SongHeader";

const SongList = ({ songs }) => {
  return (
    <div className="w-full lg:w-[400px] space-y-4">
      <SongHeader />
      <Outlet context={{ songs }} />
    </div>
  );
};

export default SongList;
