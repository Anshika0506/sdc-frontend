import React from "react";
import img from "../../../assets/logos/SDCframe.svg";
import { usePageContent } from "../../../context/PageContentContext";

const Content = () => {
  const { content } = usePageContent();
  const { whoWeAre } = content.home;

  return (
    <div className="w-full px-2 sm:px-4 md:px-10 py-12 flex justify-center items-center">
      <div className="w-full max-w-7xl flex flex-row justify-center items-center gap-2 sm:gap-6 overflow-x-auto">
        <div className="w-[52vw] sm:w-[45vw] md:w-[380px] md:h-[24vw] h-[68vw] aspect-square relative rounded-3xl bg-white/10 shadow-[inset_0_0_14px_rgba(255,255,255,0.3),inset_-1px_-3px_2px_rgba(255,255,255,0.1),inset_1px_3px_2px_rgba(255,255,255,0.3)] overflow-hidden flex flex-col justify-center items-center shrink-0">
          <div className="w-full h-full absolute left-full top-full bg-white/5 backdrop-blur-[3px] -z-10" />

          <div className="w-full px-2 md:px-4 sm:px-6 py-6 flex flex-col items-start gap-4">
            <div
              className="text-white/80 text-lg sm:text-2xl md:text-3xl font-semibold leading-tight"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {whoWeAre.heading}
            </div>

            <div
              className="text-white/80 text-xs sm:text-sm md:text-base font-normal leading-relaxed"
              style={{ fontFamily: "IBM Plex Mono, monospace" }}
            >
              {whoWeAre.description}
            </div>
          </div>
        </div>

        <div className="w-[42vw] sm:w-[45vw] md:w-[380px] md:h-[24vw] h-[52vw] aspect-square relative rounded-2xl overflow-hidden shrink-0">
          <img
            src={img}
            alt="SDC"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
