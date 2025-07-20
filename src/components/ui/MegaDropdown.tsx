
import React from 'react';
import { motion } from 'framer-motion';
import { Box, Headphones } from 'lucide-react';

interface MegaDropdownProps {
  isOpen: boolean;
}

const MegaDropdown: React.FC<MegaDropdownProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  const subjects = [
    'Biyalogiya',
    'Kimyo',
    'Fizika',
    'Tarix',
    'Matematika',
    'Informatika',
    'Ona tili'
  ];

  const activities = [
    'AI mashg\'ulotlar',
    'Testlar',
    'Raqamli Lug\'at',
    'Darslik O\'yinlari',
    'Laboratoriyalar',
    'VR sarguzashtlar',
    'AR darslik'
  ];

  const grades = [
    '1-sinf',
    '2-sinf',
    '3-sinf',
    '4-sinf',
    '5-sinf',
    '6-sinf',
    '7-sinf',
    '8-sinf',
    '9-sinf',
    '10-sinf',
    '11-sinf',
    'Dars qo\'llanmalar'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full w-screen max-w-6xl bg-white shadow-lg border-t-4 border-emerald-500 z-50 left-1/2 -translate-x-1/2"
    >
      <div className="flex">
        {/* Left Sidebar with Feature Cards */}
        <div className="w-80 bg-gray-50 p-6 space-y-4">
          {/* Cube Card */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-4 text-white">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Box className="w-6 h-6 text-white/80" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Kub hajmi</h4>
                <p className="text-sm opacity-90">3d Animatsiya Orqali Kubning ko'rinishini o'rganing</p>
              </div>
            </div>
          </div>

          {/* VR Card */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Headphones className="w-6 h-6 text-white/80" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">VR Quyosh sistemi</h4>
                <p className="text-sm opacity-90">Sayoralarni o'z ko'zingiz bilan ko'ring</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Three Columns */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-3 gap-8">
            {/* Column 1: FANLAR */}
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-emerald-500">
                FANLAR
              </h3>
              <ul className="space-y-2">
                {subjects.map((subject, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="block py-2 px-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-md transition-colors duration-200"
                    >
                      {subject}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: MASHG'ULOT */}
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-emerald-500">
                MASHG'ULOT
              </h3>
              <ul className="space-y-2">
                {activities.map((activity, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="block py-2 px-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-md transition-colors duration-200"
                    >
                      {activity}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: SINFLAR */}
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-emerald-500">
                SINFLAR
              </h3>
              <ul className="space-y-2">
                {grades.map((grade, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="block py-2 px-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-md transition-colors duration-200"
                    >
                      {grade}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaDropdown;
