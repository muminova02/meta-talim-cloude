
import React from 'react';
import { motion } from 'framer-motion';

const VRSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-100 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* VR Labs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-emerald-600 leading-tight">
              VR dars va Laboratoriya<br />
              amaliy mashg'ulotlar
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Real resurslar juda ham qimmat, biz<br />
              bunga virtual yechim berish orqali, turli<br />
              <span className="font-semibold text-emerald-600">VR darslar va Virtual Laboratoriyalar</span><br />
              taklif qilamiz
            </p>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* VR User Illustration */}
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full"></div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 left-8 w-16 h-12 bg-blue-200 rounded-lg transform rotate-12"></div>
              <div className="absolute top-8 right-4 w-12 h-8 bg-purple-200 rounded-lg transform -rotate-12"></div>
              <div className="absolute bottom-12 left-4 w-14 h-10 bg-emerald-200 rounded-lg transform rotate-6"></div>
            </div>
          </motion.div>
        </div>

        {/* VR Class Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
                </div>
              </div>
              
              {/* Floating UI Elements */}
              <div className="absolute top-6 right-8 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">❤️</span>
              </div>
              <div className="absolute bottom-8 right-12 w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">💬</span>
              </div>
              <div className="absolute top-12 left-12 w-12 h-8 bg-gray-200 rounded-lg"></div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 order-1 lg:order-2"
          >
            <h3 className="text-3xl font-bold text-orange-500">
              Tez kunda Vr sinf
            </h3>
            <p className="text-gray-700 text-lg">
              Maksus ishlab chiqiligan VR sinf ko'z<br />
              oynaklari, va VR muhit taklif
            </p>
          </motion.div>
        </div>

        {/* Universities Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-emerald-600">100 dan ortiq Tashkilotlar</span><br />
            <span className="text-blue-600">tomonidan ishoniladi</span>
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            jumladan, yuqori sifatli dasturiy ta'minotni yetkazib berish uchun Meta Ta'lim<br />
            90 dan ortiq top 100 talitka kiruvchi Universitetlar
          </p>

          {/* University Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="w-16 h-16 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">CAMBRIDGE</span>
            </div>
            <div className="w-16 h-16 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">MIT</span>
            </div>
            <div className="w-16 h-16 bg-red-800 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">HARVARD</span>
            </div>
            <div className="w-16 h-16 bg-yellow-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">UCL</span>
            </div>
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">GLOBAL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VRSection;
