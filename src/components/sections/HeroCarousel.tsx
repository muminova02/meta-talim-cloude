"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import dLearn from "../../../dist/images/ar learn.png";
import vr1 from "../../../dist/images/vr1.png";
import vr2 from "../../../dist/images/EFFORT (1).png";

interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  visual: "meta-talim" | "vr-elements" | "3d-animations" | "3d-elements";
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "Musavvir Edu - Zamonaviy Ta'lim Platformasi",
    description:
      "Musavvir Edu orqali 3D animatsiya va interaktiv media bilan fanlarni chuqurroq o'rganing. Laboratoriya mashg'ulotlari, VR va AR texnologiyalari yordamida bilimlaringizni kengaytiring",
    buttonText: "Ko'proq...",
    visual: "meta-talim",
  },
  {
    id: 2,
    title: "VR Elementlar Bilan Tassavvuringizni Kengaytiring",
    description:
      "Kengaytirilgan reallik (AR) yordamida dunyongizga turli elementlar, 3D masalalarni joylashtiring. Minglab resurslarni kashf eting, va hoziroq telefon qurilmangizda sinab ko'ring.",
    buttonText: "Boshlash",
    visual: "vr-elements",
  },
  {
    id: 3,
    title: "3D Elementlar Bilan Tassavvuringizni Kengaytiring",
    description:
      "Kengaytirilgan reallik (AR) yordamida dunyongizga turli elementlar, 3D masalalarni joylashtiring. Minglab resurslarni kashf eting, va hoziroq telefon qurilmangizda sinab ko'ring.",
    buttonText: "Boshlash",
    visual: "3d-animations",
  },
  {
    id: 4,
    title: "3D Animatsiyalar Bilan Chuqurroq O'rganing",
    description:
      "Kengaytirilgan reallik (AR) yordamida dunyongizga turli elementlar, 3D masalalarni joylashtiring. Minglab resurslarni kashf eting, va hoziroq telefon qurilmangizda sinab ko'ring.",
    buttonText: "Boshlash",
    visual: "3d-elements",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = () => {
      const imageUrls = [dLearn, vr1, vr2, "/images/hero_back.png"];

      const imagePromises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
        });
      });

      Promise.all(imagePromises)
        .then(() => {
          setImagesLoaded(true);
        })
        .catch((error) => {
          console.warn("Some images failed to load:", error);
          setImagesLoaded(true); // Continue even if some images fail
        });
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const renderVisual = (visual: string) => {
    switch (visual) {
      case "meta-talim":
        return (
          <div className="relative">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="w-64 h-64 lg:w-80 lg:h-80 border-4 border-orange-400 rounded-full flex items-center justify-center relative"
            >
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="text-6xl lg:text-8xl font-bold text-orange-400"
              >
                3D
              </motion.div>
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -right-8 w-16 h-16 bg-emerald-400 rounded-lg shadow-lg flex items-center justify-center text-white font-bold"
              >
                AR
              </motion.div>
              <motion.div
                animate={{
                  y: [10, -10, 10],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-400 rounded-lg shadow-lg flex items-center justify-center text-white font-bold"
              >
                VR
              </motion.div>
            </motion.div>
          </div>
        );
      case "vr-elements":
        return (
          <div className="relative w-full max-w-[300px] lg:max-w-[500px] h-[300px] lg:h-[500px]">
            <img
              src={vr1}
              alt="VR Elements"
              className="w-full h-full object-contain lg:object-cover rounded-lg"
              loading="eager"
              decoding="async"
            />
          </div>
        );
      case "3d-animations":
        return (
          <div className="relative w-full max-w-[300px] lg:max-w-[500px] h-[300px] lg:h-[500px]">
            <img
              src={dLearn}
              alt="3D Learning"
              className="w-full h-full object-contain lg:object-cover rounded-lg"
              loading="eager"
              decoding="async"
            />
          </div>
        );
      case "3d-elements":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-5 items-center gap-4 lg:gap-6 px-4 lg:px-6 py-6 lg:py-10 w-full h-full">
            {/* Chap qism - 3 ustun */}
            <div className="col-span-1 lg:col-span-3 flex flex-col items-center lg:items-start justify-center">
              {/* Rasm */}
              <div className="w-full h-64 lg:h-96 rounded-lg overflow-hidden mb-4 lg:mb-6">
                <img
                  src={vr2}
                  alt="3D Animatsiya"
                  className="w-full h-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Matnlar */}
              <h3 className="text-emerald-600 text-4xl font-bold leading-snug mb-4 text-center">
                3D Animatsiyalar Bilan Chuqurroq O’rganing
              </h3>
              <p className="text-gray-600 text-base leading-relaxed text-center">
                Kengaytirilgan reallik (AR) yordamida dunyoyngizga turli
                elementlar, 3D moslamalarni joylashtiring. Minglab resurslarni
                kashf eting, va hoziroq telefon qurilmangizda sinab ko’ring.
              </p>
            </div>

            {/* O'ng qism - 2 ustun */}
            <div className="col-span-1 lg:col-span-2 flex flex-col lg:flex-col items-center justify-center gap-4 lg:gap-6">
              {/* 3D Icon va Button yonma-yon */}
              <div className="flex flex-row lg:flex-col items-center gap-4 lg:gap-6">
                {/* 3D Icon */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl flex items-center justify-center">
                  <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M87.8584 36.6833V45.8916C87.8584 46.7204 87.5291 47.5153 86.9431 48.1013C86.357 48.6874 85.5622 49.0166 84.7334 49.0166C83.9046 49.0166 83.1097 48.6874 82.5237 48.1013C81.9376 47.5153 81.6084 46.7204 81.6084 45.8916V36.6833C81.6349 35.6026 81.4509 34.5271 81.0667 33.5166L50.65 51.7666V85.8916C51.1278 85.75 51.5861 85.5555 52.025 85.3083L62.5667 79.475C63.2825 79.0978 64.1168 79.0129 64.8939 79.2383C65.671 79.4637 66.3304 79.9817 66.7334 80.6833C67.1072 81.4041 67.1857 82.2421 66.9524 83.0198C66.7191 83.7976 66.1922 84.4539 65.4834 84.85L54.9834 90.6833C52.6772 91.9676 50.0813 92.6418 47.4417 92.6418C44.8021 92.6418 42.2061 91.9676 39.9 90.6833L14.9 76.9333C12.4875 75.5648 10.4779 73.5851 9.07351 71.1932C7.66913 68.8014 6.91949 66.0819 6.90002 63.3083V36.6833C6.90002 33.8958 7.65002 31.1625 9.06669 28.7666C9.30558 28.3361 9.58336 27.9333 9.90002 27.5583L10.4 26.9333C11.614 25.3425 13.1467 24.0227 14.9 23.0583L39.9 9.26663C42.217 8.01576 44.8087 7.36084 47.4417 7.36084C50.0747 7.36084 52.6664 8.01576 54.9834 9.26663L79.9834 23.0583C81.7334 24.0208 83.2667 25.3416 84.4834 26.9333C84.6697 27.1251 84.8371 27.3344 84.9834 27.5583C85.2972 27.9333 85.575 28.3361 85.8167 28.7666C87.2091 31.1689 87.9153 33.9073 87.8584 36.6833Z"
                      fill="#0D87FF"
                    />
                    <path
                      d="M92.4833 73.4333L84.15 81.7667C83.6848 82.2311 83.1326 82.5992 82.525 82.85C81.9237 83.1256 81.2698 83.2677 80.6083 83.2667C79.9445 83.2667 79.3056 83.1417 78.6917 82.8917C78.0708 82.624 77.5055 82.2424 77.025 81.7667L68.6917 73.4333C68.3969 73.1461 68.1625 72.8027 68.0025 72.4234C67.8426 72.0441 67.7601 71.6367 67.7601 71.225C67.7601 70.8134 67.8426 70.4059 68.0025 70.0266C68.1625 69.6474 68.3969 69.304 68.6917 69.0167C69.2776 68.4315 70.0719 68.1028 70.9 68.1028C71.7281 68.1028 72.5224 68.4315 73.1083 69.0167L77.275 73.1833V59.1833C77.275 58.3545 77.6043 57.5597 78.1903 56.9736C78.7764 56.3876 79.5712 56.0583 80.4 56.0583C81.2288 56.0583 82.0237 56.3876 82.6097 56.9736C83.1958 57.5597 83.525 58.3545 83.525 59.1833V73.2667L87.6917 69.1C87.9775 68.7927 88.3223 68.5462 88.7054 68.3751C89.0886 68.2039 89.5023 68.1117 89.9219 68.1039C90.3415 68.0962 90.7583 68.173 91.1476 68.3298C91.5368 68.4866 91.8905 68.7202 92.1875 69.0167C92.4846 69.3138 92.7188 69.6677 92.876 70.0573C93.0332 70.447 93.1102 70.8643 93.1024 71.2844C93.0946 71.7045 93.0022 72.1187 92.8307 72.5022C92.6592 72.8858 92.4121 73.2308 92.1042 73.5167L92.4833 73.4333Z"
                      fill="#0D87FF"
                    />
                  </svg>
                </div>

                {/* Ko'proq tugmasi */}
                <Link to="/products">
                  <Button
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-medium shadow-lg flex items-center gap-2"
                  >
                    Ko'proq...
                    <SearchIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="relative min-h-screen lg:min-h-[118vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white overflow-hidden mt-0 lg:mt-[-10vh] pb-16 lg:pb-28">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/hero_back.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
          opacity: 0.9,
        }}
      />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-20 right-20 w-64 h-64 bg-emerald-300 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-orange-300 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 z-10">
        {currentSlide === 3 ? (
          // Fourth slide - only visual content centered
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              key={`visual-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderVisual(slides[currentSlide].visual)}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        ) : (
          // First three slides - two column layout
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:ml-10">
            {/* Left Content */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <motion.h1 className="text-3xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent leading-tight pb-2">
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p className="text-base lg:text-lg text-gray-600 mb-8 leading-relaxed">
                {slides[currentSlide].description}
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/products">
                  <Button
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 lg:px-5 py-4 lg:py-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm lg:text-base"
                  >
                    {slides[currentSlide].buttonText}
                    {slides[currentSlide].buttonText === "Ko'proq..." ? (
                      <SearchIcon className="ml-2 h-5 w-5" />
                    ) : (
                      <svg
                        style={{
                          width: "30px",
                          height: "35px",
                          flexShrink: "0",
                          aspectRatio: "1/1",
                          marginLeft: "3px",
                          marginTop: "3px",
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        fill="none"
                      >
                        <path
                          d="M23.2375 3L39.475 12.375V28.7188C39.475 29.4501 39.2824 30.1686 38.9167 30.802C38.551 31.4354 38.0251 31.9614 37.3917 32.3271L25.3208 39.2979C24.6874 39.6636 23.9689 39.8561 23.2375 39.8561C22.5061 39.8561 21.7876 39.6636 21.1542 39.2979L9.08333 32.3271C8.44994 31.9614 7.92395 31.4354 7.55825 30.802C7.19255 30.1686 7.00002 29.4501 7 28.7188V12.375L23.2375 3Z"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M23.2376 11.3334V21.75M23.2376 21.75L14.2168 26.9584M23.2376 21.75L32.2585 26.9584"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              key={`visual-${currentSlide}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center justify-center order-1 lg:order-2"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderVisual(slides[currentSlide].visual)}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 lg:bottom-44 left-1/2 transform -translate-x-1/2 flex items-center gap-2 lg:gap-4 z-20">
        <button
          onClick={prevSlide}
          className="p-2 lg:p-2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300 touch-manipulation"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-600" />
        </button>
        <div className="flex gap-1.5 lg:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 touch-manipulation ${
                index === currentSlide
                  ? "bg-emerald-500 w-6 lg:w-8"
                  : "bg-emerald-200 hover:bg-emerald-300"
              }`}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="p-2 lg:p-2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300 touch-manipulation"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-600" />
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
