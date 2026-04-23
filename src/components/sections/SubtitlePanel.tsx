import React from "react";
import { Box, Maximize, AlignRight } from "lucide-react";

interface Subtitle {
  time: number;
  text: string;
}

interface SubtitlePanelProps {
  subtitles: Subtitle[];
  currentTime: number;
  isOpen: boolean;
  subtitleMode: string;
  setSubtitleMode: (mode: string) => void;
}

const SubtitlePanel: React.FC<SubtitlePanelProps> = ({
  subtitles,
  currentTime,
  isOpen,
  subtitleMode,
  setSubtitleMode,
}) => {
  const currentSubtitle = subtitles.find(
    (sub) =>
      currentTime >= sub.time &&
      currentTime < (subtitles[subtitles.indexOf(sub) + 1]?.time || Infinity)
  );

  return (
    <div
      className={`w-80 bg-white border-l border-gray-200 transition-all duration-300 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between gap-2 p-3 border-b border-gray-100">
        <div className="flex gap-1">
          <button
            onClick={() => setSubtitleMode("both")}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              subtitleMode === "both"
                ? "bg-orange-500 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Box size={16} />
          </button>
          <button
            onClick={() => setSubtitleMode("center")}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              subtitleMode === "center"
                ? "bg-orange-500 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Maximize size={16} />
          </button>
          <button
            onClick={() => setSubtitleMode("right")}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              subtitleMode === "right"
                ? "bg-orange-500 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <AlignRight size={16} />
          </button>
        </div>
        <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
          UZ 🇺🇿
        </button>
      </div>
      {/* Yirik active subtitle */}
      <div className="bg-gray-50 p-5 rounded-xl mb-5 shadow-sm mx-0">
        <div className="text-lg font-semibold text-gray-900 leading-snug">
          {currentSubtitle ? currentSubtitle.text : "Subtitle mavjud emas"}
        </div>
      </div>
      {/* Subtitle ro'yxati - Scroll qilish mumkin */}
      <div className="px-2 pb-2 h-[100%] overflow-y-auto">
        {subtitles.map((sub, idx) => (
          <div
            key={idx}
            className={`group px-3 py-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 shadow-sm mb-3 ${
              currentSubtitle === sub
                ? "bg-blue-50 border-blue-400 text-blue-900 ring-2 ring-blue-200"
                : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-blue-200"
            }`}
            style={{ minHeight: 72 }}
          >
            <span className="font-mono text-[12px] text-gray-500 group-hover:text-blue-700 select-none">
              {Math.floor(sub.time / 60)}:
              {(sub.time % 60).toString().padStart(2, "0")}
            </span>
            <div className="text-sm leading-snug font-normal break-words">
              {sub.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubtitlePanel;
