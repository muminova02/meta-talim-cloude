import React, { useState } from "react";
import {
  ChevronLeft,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  X,
} from "lucide-react";
import { Exercise, Question } from "../../data/mockProductProcess";

interface ExercisePolygonProps {
  exercises: Exercise[];
  onClose: () => void;
}

const ExercisePolygon: React.FC<ExercisePolygonProps> = ({
  exercises,
  onClose,
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const currentExercise = exercises[currentExerciseIndex];
  const currentQuestion = currentExercise?.questions[currentQuestionIndex];

  // Timer effect
  React.useEffect(() => {
    if (currentExercise?.timeLimit && !showResults) {
      setTimeLeft(currentExercise.timeLimit);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer);
            handleSubmitExercise();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentExerciseIndex, showResults]);

  const handleAnswerSelect = (questionId: number, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentExercise.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmitExercise();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitExercise = () => {
    let correctAnswers = 0;
    currentExercise.questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const exerciseScore = Math.round(
      (correctAnswers / currentExercise.questions.length) *
        currentExercise.points
    );
    setScore(exerciseScore);
    setShowResults(true);
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setShowResults(false);
      setScore(0);
    } else {
      // All exercises completed
      onClose();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!currentExercise) {
    return (
      <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200 relative">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Mashqlar mavjud emas
          </h3>
          <p className="text-gray-600 mb-4">
            Bu kurs uchun hozircha mashqlar tayyorlanmagan
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Orqaga qaytish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200 relative max-h-[85vh] overflow-y-auto">
      {/* Close button - o'ng burchakda */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-10"
        title="Yopish"
      >
        <X size={20} />
      </button>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 pr-8">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              {currentExercise.title}
            </h3>
            <p className="text-sm text-gray-600">
              {currentExercise.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {timeLeft !== null && (
            <div className="flex items-center gap-2 text-orange-600">
              <Clock size={16} />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-blue-600">
            <Star size={16} />
            <span>{currentExercise.points} ball</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Savol {currentQuestionIndex + 1} /{" "}
            {currentExercise.questions.length}
          </span>
          <span>
            Mashq {currentExerciseIndex + 1} / {exercises.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((currentQuestionIndex + 1) /
                  currentExercise.questions.length) *
                100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {!showResults ? (
        /* Question Content */
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              {currentQuestion?.question}
            </h4>

            {currentQuestion?.type === "multiple-choice" && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                      answers[currentQuestion.id] === index
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={index}
                      checked={answers[currentQuestion.id] === index}
                      onChange={() =>
                        handleAnswerSelect(currentQuestion.id, index)
                      }
                      className="mr-3"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion?.type === "true-false" && (
              <div className="space-y-3">
                <label
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                    answers[currentQuestion.id] === 1
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={1}
                    checked={answers[currentQuestion.id] === 1}
                    onChange={() => handleAnswerSelect(currentQuestion.id, 1)}
                    className="mr-3"
                  />
                  <span className="text-gray-700">To'g'ri</span>
                </label>
                <label
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                    answers[currentQuestion.id] === 0
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={0}
                    checked={answers[currentQuestion.id] === 0}
                    onChange={() => handleAnswerSelect(currentQuestion.id, 0)}
                    className="mr-3"
                  />
                  <span className="text-gray-700">Noto'g'ri</span>
                </label>
              </div>
            )}

            {currentQuestion?.type === "fill-blank" && (
              <div>
                <input
                  type="text"
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    handleAnswerSelect(currentQuestion.id, e.target.value)
                  }
                  placeholder="Javobingizni kiriting..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Oldingi
            </button>

            <button
              onClick={handleNextQuestion}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {currentQuestionIndex === currentExercise.questions.length - 1
                ? "Yakunlash"
                : "Keyingi"}
            </button>
          </div>
        </div>
      ) : (
        /* Results */
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            {score >= currentExercise.points * 0.7 ? (
              <CheckCircle size={64} className="text-green-500" />
            ) : (
              <XCircle size={64} className="text-red-500" />
            )}
          </div>

          <div>
            <h4 className="text-2xl font-bold text-gray-800 mb-2">
              {score >= currentExercise.points * 0.7
                ? "Tabriklaymiz!"
                : "Yana urinib ko'ring"}
            </h4>
            <p className="text-lg text-gray-600 mb-4">
              Siz {score} / {currentExercise.points} ball to'pladingiz
            </p>
            <p className="text-sm text-gray-500">
              {score >= currentExercise.points * 0.7
                ? "Ajoyib natija! Siz bu mavzuni yaxshi o'zlashtirgansiz."
                : "Bu mavzuni qayta ko'rib chiqish tavsiya etiladi."}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleNextExercise}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {currentExerciseIndex < exercises.length - 1
                ? "Keyingi mashq"
                : "Yakunlash"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExercisePolygon;
