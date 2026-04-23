import React from "react";
import { QrCode, Share2, File } from "lucide-react";

interface RightSidebarProps {
  onCCToggle: () => void;
  isCCActive: boolean;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  onCCToggle,
  isCCActive,
}) => {
  return (
    <div className="w-16 bg-white border-l border-gray-200 flex flex-col items-center justify-between py-4">
      <div className="space-y-2">
        <button
          className="p-2 text-orange-500 bg-orange-50 rounded border border-orange-200 font-bold text-md flex items-center justify-center"
          title="VR"
        >
          VR
        </button>
        <button
          className="p-2 text-orange-500 bg-orange-50 rounded border border-orange-200 font-bold text-md flex items-center justify-center"
          title="AR"
        >
          AR
        </button>
        <button
          className="p-2 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center"
          title="QR"
        >
          <QrCode size={20} />
        </button>
        <button
          className="p-2 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center"
          title="Share"
        >
          <Share2 size={20} />
        </button>
        <button
          className={`p-3 rounded border font-bold text-xs flex items-center justify-center ${
            isCCActive
              ? "bg-orange-500 text-white border-orange-500"
              : "text-orange-500 bg-orange-50 border-orange-200"
          }`}
          title="CC"
          onClick={onCCToggle}
        >
          CC
        </button>
        <button
          className="p-2 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center"
          title="Docs"
        >
          <File size={20} />
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
