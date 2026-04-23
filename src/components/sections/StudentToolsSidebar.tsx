import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Square,
  Pencil,
  MessageCircle,
  Bookmark,
  Presentation,
  Circle,
  Triangle,
  Star,
  Heart,
  ArrowRight,
  Eraser,
  Type,
  MousePointer,
  Palette,
  Layers,
} from "lucide-react";

interface StudentToolsSidebarProps {
  onElementAdd: (elementType: string) => void;
  onDrawToggle: () => void;
  isDrawing: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onExerciseClick: () => void;
  currentPosition: string;
  onPositionChange: (position: string) => void;
}

const StudentToolsSidebar: React.FC<StudentToolsSidebarProps> = ({
  onElementAdd,
  onDrawToggle,
  isDrawing,
  isOpen,
  onToggle,
  onExerciseClick,
  currentPosition,
  onPositionChange,
}) => {
  const [elementsOpen, setElementsOpen] = useState(false);
  const [drawNoteOpen, setDrawNoteOpen] = useState(false);

  const shapes = [
    { icon: Circle, label: "Circle", color: "bg-blue-100 text-blue-600" },
    { icon: Square, label: "Square", color: "bg-red-100 text-red-600" },
    { icon: Triangle, label: "Triangle", color: "bg-green-100 text-green-600" },
    { icon: Star, label: "Star", color: "bg-yellow-100 text-yellow-600" },
    { icon: Heart, label: "Heart", color: "bg-pink-100 text-pink-600" },
    {
      icon: ArrowRight,
      label: "Arrow",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const drawTools = [
    { icon: Pencil, label: "Pencil", color: "bg-red-100 text-red-600" },
    { icon: Eraser, label: "Eraser", color: "bg-gray-100 text-gray-600" },
    { icon: Type, label: "Text", color: "bg-blue-100 text-blue-600" },
    {
      icon: MousePointer,
      label: "Select",
      color: "bg-green-100 text-green-600",
    },
    { icon: Palette, label: "Color", color: "bg-purple-100 text-purple-600" },
    { icon: Layers, label: "Layers", color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } overflow-hidden relative z-40`}
    >
      {/* Toggle Button */}
      {isOpen ? (
        <button
          onClick={onToggle}
          className="absolute top-4 right-0 z-20 p-2 bg-white border border-gray-200 rounded-l-lg shadow-sm hover:bg-gray-50"
        >
          <ChevronLeft size={16} />
        </button>
      ) : (
        <div className="fixed top-20 left-16 z-[100]">
          <button
            onClick={onToggle}
            className="p-2 bg-white border border-gray-200 rounded-r-lg shadow-sm hover:bg-gray-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Icons - Har doim ko'rinadi */}
      <div
        className={`flex flex-col items-center py-4 ${
          isOpen ? "hidden" : "block"
        }`}
      >
        {/* Title */}
        <div className="mb-4 text-xs font-medium text-gray-600 text-center px-2">
          Student tools
        </div>
        <div className="space-y-3">
          {/* Elements - Yopiq bo'lganda o'ng tarafdan chiqadi */}
          <div className="relative">
            <button
              onClick={() => setElementsOpen(!elementsOpen)}
              className="p-3 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center"
              title="Elements"
            >
              <Square size={20} />
            </button>

            {/* Yopiq bo'lganda o'ng tarafdan chiqadigan shapes panel */}
            {!isOpen && elementsOpen && (
              <div className="fixed top-20 left-20 z-[100]">
                <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-lg w-48">
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Search shapes..."
                      className="w-full p-1 text-xs border border-gray-200 rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <h4 className="text-xs font-medium text-gray-700 mb-1">
                      Recents
                    </h4>
                    <div className="grid grid-cols-3 gap-1">
                      {shapes.slice(0, 3).map((shape, idx) => (
                        <button
                          key={idx}
                          onClick={() => onElementAdd(shape.label)}
                          className={`p-2 rounded ${shape.color}`}
                          title={shape.label}
                        >
                          <shape.icon size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-2">
                    <h4 className="text-xs font-medium text-gray-700 mb-1">
                      Connections
                    </h4>
                    <div className="grid grid-cols-3 gap-1">
                      {shapes.slice(3, 6).map((shape, idx) => (
                        <button
                          key={idx}
                          onClick={() => onElementAdd(shape.label)}
                          className={`p-2 rounded ${shape.color}`}
                          title={shape.label}
                        >
                          <shape.icon size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-1">
                      Basic
                    </h4>
                    <div className="grid grid-cols-3 gap-1">
                      {shapes.map((shape, idx) => (
                        <button
                          key={idx}
                          onClick={() => onElementAdd(shape.label)}
                          className={`p-2 rounded ${shape.color}`}
                          title={shape.label}
                        >
                          <shape.icon size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Draw Note - Yopiq bo'lganda o'ng tarafdan chiqadi */}
          <div className="relative">
            <button
              onClick={() => setDrawNoteOpen(!drawNoteOpen)}
              className="p-3 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center"
              title="Draw Note"
            >
              <Pencil size={20} />
            </button>

            {/* Yopiq bo'lganda o'ng tarafdan chiqadigan draw tools panel */}
            {!isOpen && drawNoteOpen && (
              <div className="fixed top-20 left-20 z-[100]">
                <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-lg w-48">
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Search tools..."
                      className="w-full p-1 text-xs border border-gray-200 rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <h4 className="text-xs font-medium text-gray-700 mb-1">
                      Drawing Tools
                    </h4>
                    <div className="grid grid-cols-3 gap-1">
                      {drawTools.slice(0, 3).map((tool, idx) => (
                        <button
                          key={idx}
                          onClick={() => onElementAdd(tool.label)}
                          className={`p-2 rounded ${tool.color}`}
                          title={tool.label}
                        >
                          <tool.icon size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-1">
                      Text Tools
                    </h4>
                    <div className="grid grid-cols-3 gap-1">
                      {drawTools.slice(3, 6).map((tool, idx) => (
                        <button
                          key={idx}
                          onClick={() => onElementAdd(tool.label)}
                          className={`p-2 rounded ${tool.color}`}
                          title={tool.label}
                        >
                          <tool.icon size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Assistant */}
          <button
            className="p-3 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center"
            title="AI Assistant"
          >
            <MessageCircle size={20} />
          </button>

          {/* First Position */}
          <button
            onClick={() => onPositionChange("first")}
            className={`p-2 rounded border flex items-center justify-center hover:bg-orange-100 transition-colors ${
              currentPosition === "first"
                ? "text-blue-600 bg-blue-50 border-blue-200"
                : "text-orange-500 bg-orange-50 border-orange-200"
            }`}
            title="First Position"
          >
            <Bookmark size={20} />
          </button>

          {/* Second Position */}
          <button
            onClick={() => onPositionChange("second")}
            className={`p-2 rounded border flex items-center justify-center hover:bg-orange-100 transition-colors ${
              currentPosition === "second"
                ? "text-blue-600 bg-blue-50 border-blue-200"
                : "text-orange-500 bg-orange-50 border-orange-200"
            }`}
            title="Second Position"
          >
            <Bookmark size={20} />
          </button>

          {/* Exercise */}
          <button
            onClick={onExerciseClick}
            className="p-3 text-orange-500 bg-orange-50 rounded border border-orange-200 flex items-center justify-center"
            title="Exercise"
          >
            <Presentation size={20} />
          </button>
        </div>
      </div>

      {/* Full Content - Faqat ochiq bo'lganda */}
      {isOpen && (
        <div className="py-4 min-w-64">
          {/* Title - Ochiq bo'lganda ham ko'rinadi */}
          <div className="mb-2 text-base font-semibold text-blue-600 text-start px-4 border-b border-gray-200 pb-4">
            Student tools
          </div>
          <div className="space-y-6">
            {/* Elements - Ochiq bo'lganda tagidan chiqadi */}
            <div className="relative">
              <button
                onClick={() => setElementsOpen(!elementsOpen)}
                className="w-full flex items-center gap-2 p-2 text-left rounded hover:bg-gray-50 px-4"
              >
                <Square size={16} />
                <span className="font-medium text-gray-700">Elements</span>
              </button>

              {/* Ochiq bo'lganda tagidan chiqadigan shapes panel */}
              {elementsOpen && (
                <div className="bg-white border border-gray-200 p-2 mt-2 px-2">
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Search shapes..."
                      className="w-full p-1 text-xs border border-gray-200 rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <h4 className="text-xs font-medium text-gray-700 mb-1">
                      Recents
                    </h4>
                    <div className="grid grid-cols-3 gap-1">
                      {shapes.slice(0, 3).map((shape, idx) => (
                        <button
                          key={idx}
                          onClick={() => onElementAdd(shape.label)}
                          className={`p-2 rounded ${shape.color}`}
                          title={shape.label}
                        >
                          <shape.icon size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-2">
                    <h4 className="text-xs font-medium text-gray-700 mb-1">
                      Connections
                    </h4>
                    <div className="grid grid-cols-3 gap-1">
                      {shapes.slice(3, 6).map((shape, idx) => (
                        <button
                          key={idx}
                          onClick={() => onElementAdd(shape.label)}
                          className={`p-2 rounded ${shape.color}`}
                          title={shape.label}
                        >
                          <shape.icon size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-1">
                      Basic
                    </h4>
                    <div className="grid grid-cols-3 gap-1">
                      {shapes.map((shape, idx) => (
                        <button
                          key={idx}
                          onClick={() => onElementAdd(shape.label)}
                          className={`p-2 rounded ${shape.color}`}
                          title={shape.label}
                        >
                          <shape.icon size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Draw Note - Ochiq bo'lganda tagidan chiqadi */}
            <div className="relative">
              <button
                onClick={() => setDrawNoteOpen(!drawNoteOpen)}
                className="w-full flex items-center gap-2 p-2 text-left rounded hover:bg-gray-50 px-4"
              >
                <Pencil size={16} />
                <span className="font-medium text-gray-700">Draw Note</span>
              </button>

              {/* Ochiq bo'lganda tagidan chiqadigan draw tools panel */}
              {drawNoteOpen && (
                <div className="bg-white border border-gray-200 p-2 mt-2 px-2">
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Search tools..."
                      className="w-full p-1 text-xs border border-gray-200 rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <h4 className="text-xs font-medium text-gray-700 mb-1">
                      Drawing Tools
                    </h4>
                    <div className="grid grid-cols-3 gap-1">
                      {drawTools.slice(0, 3).map((tool, idx) => (
                        <button
                          key={idx}
                          onClick={() => onElementAdd(tool.label)}
                          className={`p-2 rounded ${tool.color}`}
                          title={tool.label}
                        >
                          <tool.icon size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-1">
                      Text Tools
                    </h4>
                    <div className="grid grid-cols-3 gap-1">
                      {drawTools.slice(3, 6).map((tool, idx) => (
                        <button
                          key={idx}
                          onClick={() => onElementAdd(tool.label)}
                          className={`p-2 rounded ${tool.color}`}
                          title={tool.label}
                        >
                          <tool.icon size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Assistant */}
            <div className="px-4">
              <h3 className="font-medium mb-3 text-gray-700 flex items-center gap-2">
                <MessageCircle size={16} />
                AI assistent
              </h3>
            </div>

            {/* Position Buttons */}
            <div className="space-y-2 px-4">
              <button
                onClick={() => onPositionChange("first")}
                className={`w-full p-2 text-left rounded ${
                  currentPosition === "first"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                First Position
              </button>
              <button
                onClick={() => onPositionChange("second")}
                className={`w-full p-2 text-left rounded ${
                  currentPosition === "second"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Second Position
              </button>
              <button
                onClick={onExerciseClick}
                className={`w-full p-2 text-left rounded ${
                  currentPosition === "exercise"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                exercise
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentToolsSidebar;
