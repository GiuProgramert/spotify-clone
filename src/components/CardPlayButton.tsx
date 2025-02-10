import { Pause, Play } from "./Player";
import { usePlayerStore } from "@/store/playerStore";

export function CardPlayButton({ id, size = "small" }: { id: string, size?: "small" | "large"}) {
  const { currentMusic, isPlaying, setCurrentMusic, setIsPlaying } =
    usePlayerStore((state) => state);

  const isPlayinPlaylist = isPlaying && currentMusic.playlist?.id === id;
  const handleClick = () => {
    if (isPlayinPlaylist) {
      setIsPlaying(false);
      return;
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentMusic({ playlist, songs, song: songs[0] });
      });
  };

  const iconClassName = size === "small" ? "w-4 h-4" : "w-6 h-6";

  return (
    <button
      className="card-play-button bg-green-500 rounded-full p-4 hover:scale-105 transition duration-200 hover:bg-green-400"
      onClick={handleClick}
    >
      {isPlayinPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
    </button>
  );
}
