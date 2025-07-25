import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import SolarSystemModel from "../../../public/models/SolarSystemModel";
import { SearchIcon } from "lucide-react";

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
    title:
      "Meta Ta'lim Orqali 3D Animation, Interaktiv Media, Laboratoriya mashg'ulotlari, VR, AR lar bilan Fanlarni chuqurroq O'rganing",
    description:
      "Kengaytirilgan reallik (AR) yordamida dunyongizga turli elementlar, 3D masalalarni joylashtiring. Minglab resurslarni kashf eting, va hoziroq telefon qurilmangizda sinab ko'ring.",
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
    title: "3D Elementlar Bilan Chuqurroq O'rganing",
    description:
      "Kengaytirilgan reallik (AR) yordamida dunyongizga turli elementlar, 3D masalalarni joylashtiring. Minglab resurslarni kashf eting, va hoziroq telefon qurilmangizda sinab ko'ring.",
    buttonText: "Boshlash",
    visual: "3d-elements",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
                repeat: Infinity,
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
                  repeat: Infinity,
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
                  repeat: Infinity,
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
                  repeat: Infinity,
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
          <div className="relative" style={{ width: "500px", height: "500px" }}>
            {/* <motion.div
              animate={{
                y: [-5, 5, -5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-64 h-64 lg:w-80 lg:h-80 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl transform rotate-12 opacity-80"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center">
                <div className="text-4xl lg:text-6xl font-bold text-white">VR</div>
              </div>
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-400 rounded-full shadow-lg flex items-center justify-center text-white font-bold"
              >
                3D
              </motion.div>
            </motion.div> */}
            <img
              src="/images/vr1.png"
              alt=""
              srcSet=""
              className="w-full h-full"
            />
          </div>
        );
      case "3d-animations":
        return (
          <div
            className="sketchfab-embed-wrapper"
            style={{
              paddingLeft: "100px",
              width: "1000px",
              height: "700px",
              paddingTop: "50px",
            }}
          >
            <div className="relative">
              <SolarSystemModel />
            </div>

            {/* <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-200 to-blue-400 rounded-3xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-500 opacity-30"></div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-blue-600 rounded-full"></div>
              <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-blue-500 rounded-2xl transform rotate-45"></div>
              <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-emerald-400 rounded-xl"></div>
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute bottom-4 right-4 w-12 h-12 bg-orange-400 rounded-lg flex items-center justify-center text-white font-bold"
              >
                <Download className="w-6 h-6" />
              </motion.div>
            </motion.div> */}
          </div>
        );
      case "3d-elements":
        return (
          <div
            className="relative w-full h-full"
            style={{
              width: "600px",
              height: "700px",
              paddingTop: "50px",
              backgroundColor: "transparent",
            }}
          >
            {/* <motion.div
              animate={{
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-64 h-64 lg:w-80 lg:h-80 relative"
            >
              <div className="absolute inset-0 border-8 border-orange-400 rounded-full"></div>
              <div className="absolute inset-8 flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-6xl lg:text-8xl font-bold text-orange-400"
                >
                  3D
                </motion.div>
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-orange-400 rounded-full"
              ></motion.div>
            </motion.div> */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative min-h-screen lg:min-h-[118vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white overflow-hidden mt-[-10vh] pb-28 ">
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}

          {/* Right Visual */}
          <motion.div
            key={`visual-${currentSlide}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
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

          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1 className="text-3xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent leading-tight">
              {slides[currentSlide].title}
            </motion.h1>

            <motion.p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {slides[currentSlide].description}
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M23.2376 11.3334V21.75M23.2376 21.75L14.2168 26.9584M23.2376 21.75L32.2585 26.9584"
                      stroke="white"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-44 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <ChevronLeft className="w-5 h-5 text-emerald-600" />
          </button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-emerald-500 w-8"
                    : "bg-emerald-200 hover:bg-emerald-300"
                }`}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <ChevronRight className="w-5 h-5 text-emerald-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
