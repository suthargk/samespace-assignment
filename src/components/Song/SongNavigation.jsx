import { Link, useLocation } from "react-router-dom";

const SongNavigation = () => {
  const { pathname } = useLocation();

  return (
    <div className="space-x-8">
      <Link
        to=""
        className={`text-lg font-semibold text-white ${
          pathname === "/" ? "opacity-1" : "opacity-35"
        }`}
      >
        For You
      </Link>
      <Link
        to="top-tracks"
        className={`text-lg font-semibold text-white  ${
          pathname === "/top-tracks" ? "opacity-1" : "opacity-35"
        }`}
      >
        Top Tracks
      </Link>
    </div>
  );
};

export default SongNavigation;
