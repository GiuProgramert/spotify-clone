import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as createAstro, b as addAttribute, f as renderSlot, d as renderComponent, g as renderHead, e as renderTransition } from './astro/server_iRypMpif.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { p as playlists } from './data_CGaVNlqr.mjs';
/* empty css                         */
import { jsx, jsxs } from 'react/jsx-runtime';
import { create } from 'zustand';
import { useRef, useEffect, useState } from 'react';
import ReactSlider from 'react-slider';

const usePlayerStore = create((set) => ({
  isPlaying: false,
  currentMusic: { playlist: null, songs: [], song: null },
  volume: 1,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
  setVolume: (volume) => set({ volume })
}));

function Slider(props) {
  return /* @__PURE__ */ jsx(
    ReactSlider,
    {
      ...props,
      className: `w-52 h-5 flex items-center justify-center group cursor-pointer ${props.className ?? ""}`,
      thumbActiveClassName: "outline-none",
      thumbClassName: "",
      renderThumb: (props2) => /* @__PURE__ */ jsx("div", { ...props2, children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-full w-[14px] h-[14px] transition-all duration-300 peer" }) }),
      renderTrack: (props2, state) => /* @__PURE__ */ jsx(
        "div",
        {
          ...props2,
          className: `h-[5px] rounded-full ${state.index == 0 ? "bg-zinc-300 group-hover:bg-green-500" : "bg-gray-600"}`
        }
      ),
      renderMark: (props2) => /* @__PURE__ */ jsx("span", { className: "bg-red-500 asdad", ...props2 })
    }
  );
}

const formatTime = (time) => {
  if (!time) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const Pause = ({ className }) => /* @__PURE__ */ jsx(
  "svg",
  {
    className,
    role: "img",
    height: "16",
    width: "16",
    "aria-hidden": "true",
    viewBox: "0 0 16 16",
    children: /* @__PURE__ */ jsx("path", { d: "M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z" })
  }
);
const Play = ({ className }) => /* @__PURE__ */ jsx(
  "svg",
  {
    className,
    role: "img",
    height: "16",
    width: "16",
    "aria-hidden": "true",
    viewBox: "0 0 16 16",
    children: /* @__PURE__ */ jsx("path", { d: "M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" })
  }
);
const VolumeSilence = () => /* @__PURE__ */ jsxs(
  "svg",
  {
    fill: "currentColor",
    role: "presentation",
    height: "16",
    width: "16",
    "aria-hidden": "true",
    "aria-label": "Volumen apagado",
    viewBox: "0 0 16 16",
    children: [
      /* @__PURE__ */ jsx("path", { d: "M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z" }),
      /* @__PURE__ */ jsx("path", { d: "M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z" })
    ]
  }
);
const Volume = () => /* @__PURE__ */ jsxs(
  "svg",
  {
    fill: "currentColor",
    role: "presentation",
    height: "16",
    width: "16",
    "aria-hidden": "true",
    "aria-label": "Volumen alto",
    id: "volume-icon",
    viewBox: "0 0 16 16",
    children: [
      /* @__PURE__ */ jsx("path", { d: "M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z" }),
      /* @__PURE__ */ jsx("path", { d: "M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z" })
    ]
  }
);
const CurrentSong = ({
  title,
  image,
  artists
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5 relative overflow-hidden w-[250px]", children: [
    /* @__PURE__ */ jsx("picture", { className: "w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: image, alt: title }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm block", children: title }),
      /* @__PURE__ */ jsx("span", { className: "text-xs opacity-80", children: artists && artists.join(", ") })
    ] })
  ] });
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
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center gap-x-2", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "opacity-70 hover:opacity-100 transition-all duration-300",
        onClick: handleClickVolume,
        children: isVolumeSilence ? /* @__PURE__ */ jsx(VolumeSilence, {}) : /* @__PURE__ */ jsx(Volume, {})
      }
    ),
    /* @__PURE__ */ jsx(
      Slider,
      {
        value: volume * 100,
        max: 100,
        min: 0,
        onChange: (value) => setVolume(value / 100)
      }
    )
  ] });
};
const SongControl = ({
  audioRef
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
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-x-3 justify-center items-center text-xs", children: [
    /* @__PURE__ */ jsx("span", { className: "opacity-50 w-12 text-right", children: formatTime(currentTime) }),
    /* @__PURE__ */ jsx(
      Slider,
      {
        className: "w-[350px]",
        value: currentTime,
        max: duration,
        min: 0,
        onChange: (value) => {
          if (!audioRef.current) return;
          audioRef.current.currentTime = value;
        }
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "opacity-50 w-12", children: duration ? formatTime(duration) : null })
  ] });
};
function Player() {
  const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore(
    (state) => state
  );
  const audioRef = useRef(null);
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
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between w-full px-1 z-50", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      CurrentSong,
      {
        image: currentMusic.song?.image,
        title: currentMusic.song?.title,
        artists: currentMusic.song?.artists
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "grid place-content-center gap-4 flex-1", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center flex-col items-center gap-1", children: [
      /* @__PURE__ */ jsx("button", { className: "bg-white rounded-full p-2", onClick: handleClick, children: isPlaying ? /* @__PURE__ */ jsx(Pause, {}) : /* @__PURE__ */ jsx(Play, {}) }),
      /* @__PURE__ */ jsx(SongControl, { audioRef })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid place-content-center", children: /* @__PURE__ */ jsx(VolumenControl, {}) }),
    /* @__PURE__ */ jsx("audio", { ref: audioRef })
  ] });
}

const $$LibraryIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg role="img" aria-hidden="true" viewBox="0 0 24 24" fill="white"><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path></svg>`;
}, "/home/giu/dev/misc/spotify-clone/src/icons/LibraryIcon.astro", void 0);

const $$HomeIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg role="img" aria-hidden="true" viewBox="0 0 24 24" fill="white"><path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path></svg>`;
}, "/home/giu/dev/misc/spotify-clone/src/icons/HomeIcon.astro", void 0);

const $$SearchIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg role="img" aria-hidden="true" viewBox="0 0 24 24" fill="white"><path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"></path></svg>`;
}, "/home/giu/dev/misc/spotify-clone/src/icons/SearchIcon.astro", void 0);

const $$Astro$3 = createAstro();
const $$SideMenuItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$SideMenuItem;
  const { href } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li> <a class="flex gap-4 text-zinc-400 hover:text-zinc-100 items-center py-3 px-5 font-medium transition duration-200"${addAttribute(href, "href")}>${renderSlot($$result, $$slots["default"])}</a> </li>`;
}, "/home/giu/dev/misc/spotify-clone/src/components/SideMenuItem.astro", void 0);

const $$Astro$2 = createAstro();
const $$SideMenuCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SideMenuCard;
  const { playlist } = Astro2.props;
  const { id, cover, title, artists } = playlist;
  const artistsString = artists.join(", ");
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/playlist/${id}`, "href")} class="playlist-item flex relative p-2 overflow-hidden items-center gap-4 rounded-md hover:bg-zinc-800"> <picture class="h-12 w-12 flex-none"> <img${addAttribute(cover, "src")}${addAttribute(`Cover of ${title} by ${artistsString}`, "alt")} class="object-cover w-full h-full rounded-md"> </picture> <div class="flex flex-auto flex-col truncate"> <h4 class="text-white text-sm">${title}</h4> <span class="text-xs text-gray-400">${artistsString}</span> </div> </a>`;
}, "/home/giu/dev/misc/spotify-clone/src/components/SideMenuCard.astro", void 0);

const $$AsideMenu = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="flex flex-col flex-1 gap-2"> <div class="bg-zinc-900 rounded-lg p-2"> <ul> ${renderComponent($$result, "SideMenuItem", $$SideMenuItem, { "href": "/" }, { "default": ($$result2) => renderTemplate` <div class="w-5"> ${renderComponent($$result2, "HomeIcon", $$HomeIcon, {})} </div>
Inicio
` })} </ul> <ul> ${renderComponent($$result, "SideMenuItem", $$SideMenuItem, { "href": "/#" }, { "default": ($$result2) => renderTemplate` <div class="w-5"> ${renderComponent($$result2, "SearchIcon", $$SearchIcon, {})} </div>
Buscar
` })} </ul> </div> <div class="bg-zinc-900 rounded-lg p-2 flex-1"> <ul> ${renderComponent($$result, "SideMenuItem", $$SideMenuItem, { "href": "/#" }, { "default": ($$result2) => renderTemplate` <div class="w-5"> ${renderComponent($$result2, "LibraryIcon", $$LibraryIcon, {})} </div>
Tu biblioteca
` })} </ul> ${playlists.map((playlist) => renderTemplate`${renderComponent($$result, "SideMenuCard", $$SideMenuCard, { "playlist": playlist })}`)} </div> </nav>`;
}, "/home/giu/dev/misc/spotify-clone/src/components/AsideMenu.astro", void 0);

const $$Astro$1 = createAstro();
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/home/giu/dev/misc/spotify-clone/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, { "fallback": "none", "data-astro-cid-sckkx6r4": true })}${renderHead()}</head> <body data-astro-cid-sckkx6r4> <div id="app" class="relative h-screen p-2 gap-2" data-astro-cid-sckkx6r4> <aside class="[grid-area: aside] flex-col flex overflow-y-auto" data-astro-cid-sckkx6r4> ${renderComponent($$result, "AsideMenu", $$AsideMenu, { "data-astro-cid-sckkx6r4": true })} </aside> <main class="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto" data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </main> <footer class="[grid-area:player] min-h-[80px]" data-astro-cid-sckkx6r4> ${renderComponent($$result, "Player", Player, { "client:load": true, "data-astro-transition-persist": "media-player", "client:component-hydration": "load", "client:component-path": "@/components/Player", "client:component-export": "default", "data-astro-cid-sckkx6r4": true, "data-astro-transition-scope": renderTransition($$result, "p74ezckc", "", "media-player") })} </footer> </div>  </body></html>`;
}, "/home/giu/dev/misc/spotify-clone/src/layouts/Layout.astro", "self");

function CardPlayButton({ id, size = "small" }) {
  const { currentMusic, isPlaying, setCurrentMusic, setIsPlaying } = usePlayerStore((state) => state);
  const isPlayinPlaylist = isPlaying && currentMusic.playlist?.id === id;
  const handleClick = () => {
    if (isPlayinPlaylist) {
      setIsPlaying(false);
      return;
    }
    fetch(`/api/get-info-playlist.json?id=${id}`).then((res) => res.json()).then((data) => {
      const { songs, playlist } = data;
      setIsPlaying(true);
      setCurrentMusic({ playlist, songs, song: songs[0] });
    });
  };
  const iconClassName = size === "small" ? "w-4 h-4" : "w-6 h-6";
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: "card-play-button bg-green-500 rounded-full p-4 hover:scale-105 transition duration-200 hover:bg-green-400",
      onClick: handleClick,
      children: isPlayinPlaylist ? /* @__PURE__ */ jsx(Pause, { className: iconClassName }) : /* @__PURE__ */ jsx(Play, { className: iconClassName })
    }
  );
}

export { $$Layout as $, CardPlayButton as C };
