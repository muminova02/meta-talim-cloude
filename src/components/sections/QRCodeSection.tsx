import React from "react";
import { motion, rgba } from "framer-motion";
import {
  QrCode,
  Circle,
  CircleArrowRight,
  ScanQrCode,
  Gift,
} from "lucide-react";
import { Button } from "../ui/button";

const QRCodeSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Main QR&Code Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-16 border-2 border-emerald-200"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-4xl lg:text-5xl font-bold text-emerald-600 mb-6">
                Musavvir Edu QR&Code
              </h2>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-emerald-600">
                  <QrCode className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Skanerlash yoki code generatsiya
                  </span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <ScanQrCode className="h-5 w-5" />
                  <span className="text-sm font-medium">QR code skaneri</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <Gift className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Begini sinab ko'rish
                  </span>
                </div>
              </div>

              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105">
                Boshlash
              </Button>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* 3D Device Mockup */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl p-4 shadow-xl transform rotate-12">
                    <div className="bg-white rounded-lg p-6 shadow-inner">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <QrCode className="h-8 w-8 text-white" />
                      </div>
                      <div className="h-2 bg-gray-200 rounded mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>

                  {/* Book Illustration */}
                  <div className="absolute -right-8 -bottom-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-4 shadow-xl transform -rotate-6">
                    <div className="bg-white rounded p-3">
                      <div className="flex gap-1 mb-2">
                        <div className="w-8 h-1 bg-red-400 rounded"></div>
                        <div className="w-8 h-1 bg-yellow-400 rounded"></div>
                        <div className="w-8 h-1 bg-green-400 rounded"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-1 bg-gray-300 rounded"></div>
                        <div className="h-1 bg-gray-300 rounded w-4/5"></div>
                        <div className="h-1 bg-gray-300 rounded w-3/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Category Pills */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="bg-emerald-100 text-emerald-700 px-6 py-3 rounded-full font-medium border border-emerald-300">
            O'quvchilarga
          </div>
          <div className="bg-emerald-100 text-emerald-700 px-6 py-3 rounded-full font-medium border border-emerald-300">
            O'qituvchilarga
          </div>
          <div className="bg-emerald-100 text-emerald-700 px-6 py-3 rounded-full font-medium border border-emerald-300">
            Tashkilotlarga
          </div>
        </motion.div> */}

        {/* Interactive Digital Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* <div className="flex items-center justify-center gap-3 mb-6">
            <div className="text-orange-500 text-lg">👨‍🎓</div>
            <span className="text-orange-500 font-medium">O'quvchilar uchun</span>
          </div> */}

          {/* <h3 className="text-4xl lg:text-5xl font-bold text-emerald-600 mb-8">
            Interaktiv Digital Ta'lim
          </h3> */}
        </motion.div>

        {/* VR Learning Cards Grid */}
      </div>
    </section>
  );
};

export default QRCodeSection;
