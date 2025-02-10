import { usePlayerStore } from "@/store/playerStore";
import React, { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/Slider";
import { formatTime } from "@/lib/utils";

export const Pause = ({ className }: { className?: string }) => (
  <svg
    className={className}
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

export const Play = ({ className }: { className?: string }) => (
  <svg
    className={className}
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);

export const VolumeSilence = () => (
  <svg
    fill="currentColor"
    role="presentation"
    height="16"
    width="16"
    aria-hidden="true"
    aria-label="Volumen apagado"
    viewBox="0 0 16 16"
  >
    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
  </svg>
);

export const Volume = () => (
  <svg
    fill="currentColor"
    role="presentation"
    height="16"
    width="16"
    aria-hidden="true"
    aria-label="Volumen alto"
    id="volume-icon"
    viewBox="0 0 16 16"
  >
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
    <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
  </svg>
);

const CurrentSong = ({
  title,
  image,
  artists,
}: {
  title?: string;
  image?: string;
  artists?: string[];
}) => {
  return (
    <div className="flex items-center gap-5 relative overflow-hidden w-[250px]">
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={image} alt={title} />
      </picture>

      <div className="flex flex-col">
        <h3 className="font-semibold text-sm block">{title}</h3>
        <span className="text-xs opacity-80">
          {artists && artists.join(", ")}
        </span>
      </div>
    </div>
  );
};

const VolumenControl = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const previusVolume = useRef(volume);

  const isVolumeSilence = volume < 0.05;

  const handleClickVolume = () => {
    if (isVolumeSilence) {
      setVolume(previusVolume.current);
    } else {
      previusVolume.current = volume;
      setVolume(0);
    }
  };

  return (
    <div className="flex justify-center items-center gap-x-2">
      <button
        className="opacity-70 hover:opacity-100 transition-all duration-300"
        onClick={handleClickVolume}
      >
        {isVolumeSilence ? <VolumeSilence /> : <Volume />}
      </button>
      <Slider
        value={volume * 100}
        max={100}
        min={0}
        onChange={(value) => setVolume(value / 100)}
      />
    </div>
  );
};

const SongControl = ({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
}) => {
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const duration = audioRef.current?.duration ?? 0;

  return (
    <div className="flex gap-x-3 justify-center items-center text-xs">
      <span className="opacity-50 w-12 text-right">
        {formatTime(currentTime)}
      </span>
      <Slider
        className="w-[350px]"
        value={currentTime}
        max={duration}
        min={0}
        onChange={(value) => {
          if (!audioRef.current) return;
          audioRef.current.currentTime = value;
        }}
      />
      <span className="opacity-50 w-12">
        {duration ? formatTime(duration) : null}
      </span>
    </div>
  );
};

export default function Player() {
  const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore(
    (state) => state
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    const { song, playlist } = currentMusic;

    if (!audioRef.current) return;

    if (song) {
      audioRef.current.src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.volume = volume;

      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentMusic]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
  }, [volume]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-row justify-between w-full px-1 z-50">
      <div>
        <CurrentSong
          image={currentMusic.song?.image}
          title={currentMusic.song?.title}
          artists={currentMusic.song?.artists}
        />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center gap-1">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <SongControl audioRef={audioRef} />
        </div>
      </div>

      <div className="grid place-content-center">
        <VolumenControl />
      </div>

      <audio ref={audioRef}></audio>
    </div>
  );
}
