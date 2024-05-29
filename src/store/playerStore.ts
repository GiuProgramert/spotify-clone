import { create } from "zustand";
import type { Playlist, Song } from "@/lib/data";

interface CurrentSong {
  playlist: Playlist | null;
  song: Song | null;
  songs: Song[];
}

interface State {
  isPlaying: boolean;
  currentMusic: CurrentSong;
  volume: number;
}

interface Actions {
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentMusic: (currentSong: CurrentSong) => void;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<State & Actions>((set) => ({
  isPlaying: false,
  currentMusic: { playlist: null, songs: [], song: null },
  volume: 1,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setCurrentMusic: (currentMusic: CurrentSong) => set({ currentMusic: currentMusic }),
  setVolume: (volume: number) => set({ volume }),
}));
