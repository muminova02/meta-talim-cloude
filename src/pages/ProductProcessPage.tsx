import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import StudentToolsSidebar from "../components/sections/StudentToolsSidebar";
import ContentViewer from "../components/sections/ContentViewer";
import RightSidebar from "../components/sections/RightSidebar";
import SubtitlePanel from "../components/sections/SubtitlePanel";
import { ProductProcessContent } from "../data/mockProductProcess";
import { fetchProductProcess, ProductProcessDto } from "@/api/productApi";

const ProductProcessPage = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<ProductProcessContent | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isStudentToolsOpen, setIsStudentToolsOpen] = useState(true);
  const [isSubtitleOpen, setIsSubtitleOpen] = useState(true);
  const [showExercise, setShowExercise] = useState(false);
  const [subtitleMode, setSubtitleMode] = useState("both"); // 'both', 'center', 'right'
  const [isCCActive, setIsCCActive] = useState(false);
  const [currentPosition, setCurrentPosition] = useState("first"); // 'first' or 'second'
  const [currentChapter, setCurrentChapter] = useState(1);

  // Load content based on ID
  useEffect(() => {
    const load = async () => {
      const productId = id ? parseInt(id) : 1;
      try {
        const dto: ProductProcessDto = await fetchProductProcess(productId);
        const mapped: ProductProcessContent = {
          id: dto.id,
          title: dto.title,
          type: dto.video_url
            ? "video"
            : dto.model_3d_url || dto.embedded_3d
            ? "3d-animation"
            : "presentation",
          duration: dto.duration,
          category: dto.category,
          difficulty:
            dto.difficulty === "easy" ||
            dto.difficulty === "medium" ||
            dto.difficulty === "hard"
              ? dto.difficulty
              : "medium",
          description: dto.description,
          thumbnail:
            dto.thumbnail ??
            "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop",
          videoUrl: dto.video_url ?? undefined,
          model3dUrl: dto.model_3d_url ?? undefined,
          embedded3d: dto.embedded_3d ?? undefined,
          subtitles: dto.subtitles.map((s) => ({
            time: s.time,
            text: s.text,
          })),
          chapters: dto.chapters.map((c) => ({
            id: c.id,
            title: c.title,
            duration: 0,
            type:
              c.type === "video" ||
              c.type === "3d-animation" ||
              c.type === "presentation"
                ? c.type
                : "video",
            description: "",
            isCompleted: c.is_completed,
          })),
          exercises: dto.exercises.map((e) => ({
            id: e.id,
            title: e.title,
            type:
              e.type === "quiz" ||
              e.type === "interactive" ||
              e.type === "assignment"
                ? e.type
                : "quiz",
            difficulty: "medium",
            description: "",
            questions: e.questions.map((q) => ({
              id: q.id,
              question: q.question,
              type: "multiple-choice",
              options: q.options ? JSON.parse(q.options) : [],
              correctAnswer: q.correct_answer,
            })),
            timeLimit: undefined,
            points: 0,
          })),
          instructor: {
            name: "Instructor",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            title: "Teacher",
          },
          tags: [],
          createdAt: dto.created_at,
          updatedAt: dto.created_at,
        };
        setContent(mapped);
      } catch (e) {
        console.error("Failed to load product process", e);
        setContent(null);
      }
    };

    load();
  }, [id]);

  const handleElementAdd = (elementType: string) => {
    console.log("Element qo'shildi:", elementType);
  };

  const handleDrawToggle = () => {
    setIsDrawing(!isDrawing);
  };

  const handleStudentToolsToggle = () => {
    setIsStudentToolsOpen(!isStudentToolsOpen);
  };

  const handleSubtitleToggle = () => {
    setIsSubtitleOpen(!isSubtitleOpen);
  };

  const handleExerciseClick = () => {
    setShowExercise(true);
    // Exercise chiqqanda Student Tools va Subtitle yopiladi
    setIsStudentToolsOpen(false);
    setIsSubtitleOpen(false);
  };

  const handleExerciseClose = () => {
    setShowExercise(false);
    // Exercise yopilganda Student Tools va Subtitle qayta ochiladi
    setIsStudentToolsOpen(true);
    setIsSubtitleOpen(true);
  };

  const handleCCToggle = () => {
    setIsCCActive((prev) => !prev);
    setSubtitleMode("both");
    setIsSubtitleOpen(true);
  };

  const handlePositionChange = (newPosition: string) => {
    console.log("Position changed to:", newPosition);
    setCurrentPosition(newPosition);
  };

  const handleChapterSelect = (chapterId: number) => {
    setCurrentChapter(chapterId);
    // Here you could load different content based on chapter
    console.log("Chapter selected:", chapterId);
  };

  // Loading state
  if (!content) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Kontent yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden z-0">
      {/* App Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
              <ChevronLeft size={20} />
            </button>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-800 mb-1">
                {content.title}
              </span>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  {content.type.toUpperCase()}
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  {Math.floor(content.duration / 60)} min
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  {content.category}
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  {content.difficulty}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="text-sm text-gray-600 hover:bg-gray-100 px-2 py-1 rounded">
              A UZB
            </button>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Student Tools Sidebar */}
        <StudentToolsSidebar
          onElementAdd={handleElementAdd}
          onDrawToggle={handleDrawToggle}
          isDrawing={isDrawing}
          isOpen={isStudentToolsOpen}
          onToggle={handleStudentToolsToggle}
          onExerciseClick={handleExerciseClick}
          currentPosition={currentPosition}
          onPositionChange={handlePositionChange}
        />

        {/* Content Viewer */}
        <ContentViewer
          content={content}
          currentTime={currentTime}
          onTimeUpdate={setCurrentTime}
          showExercise={showExercise}
          onExerciseClose={handleExerciseClose}
          isCCActive={isCCActive}
          subtitleMode={subtitleMode}
          currentPosition={currentPosition}
          onPositionChange={handlePositionChange}
        />

        {/* Subtitle Toggle Button - O'ng tarafda */}
        <div className="relative">
          <button
            onClick={handleSubtitleToggle}
            className="absolute top-4 right-0 z-10 p-2 bg-white border border-gray-200 rounded-l-lg shadow-sm hover:bg-gray-50"
          >
            {isSubtitleOpen ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
        </div>

        {/* Subtitle Panel - O'ng tarafda, RightSidebar dan chapda */}
        {isCCActive &&
          (subtitleMode === "both" || subtitleMode === "right") && (
            <SubtitlePanel
              subtitles={content.subtitles}
              currentTime={currentTime}
              isOpen={isSubtitleOpen}
              subtitleMode={subtitleMode}
              setSubtitleMode={setSubtitleMode}
            />
          )}

        {/* Right Sidebar */}
        <RightSidebar onCCToggle={handleCCToggle} isCCActive={isCCActive} />
      </div>
    </div>
  );
};

export default ProductProcessPage;
