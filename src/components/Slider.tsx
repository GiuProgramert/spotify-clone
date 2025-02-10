import ReactSlider from "react-slider";
import type { ReactSliderProps } from "react-slider";

export function Slider(props: ReactSliderProps<number>) {
  return (
    <ReactSlider
      {...props}
      
      className={`w-52 h-5 flex items-center justify-center group cursor-pointer ${props.className ?? ""}`}
      thumbActiveClassName="outline-none"
      thumbClassName=""
      renderThumb={(props) => (
        <div {...props}>
          <div className="bg-white rounded-full w-[14px] h-[14px] transition-all duration-300 peer" />
        </div>
      )}
      renderTrack={(props, state) => (
        <div
          {...props}
          className={`h-[5px] rounded-full ${
            state.index == 0 ? "bg-zinc-300 group-hover:bg-green-500" : "bg-gray-600"
          }`}
        ></div>
      )}
      renderMark={(props) => <span className="bg-red-500 asdad" {...props} />}
    />
  );
}
