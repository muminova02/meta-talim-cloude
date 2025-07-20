
import React from 'react';
import { motion } from 'framer-motion';
import { Play, QrCode, Gamepad2, FlaskConical, Eye, Layers } from 'lucide-react';

interface MegaDropdownMahsulotlarProps {
  isOpen: boolean;
}

const MegaDropdownMahsulotlar: React.FC<MegaDropdownMahsulotlarProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-5xl bg-white shadow-lg border-t-4 border-emerald-500 z-50 rounded-lg"
    >
      <div className="flex">
        {/* Left Section - Green Background */}
        <div className="w-72 bg-gradient-to-br from-emerald-400 to-emerald-500 p-6 rounded-l-lg">
          <h3 className="text-white font-bold text-lg mb-4">Bizning ishlanmalarimiz fazil o'zingiz ko'ring</h3>
          
          <div className="space-y-4">
            {/* Media */}
            <div className="flex items-start space-x-3 text-white">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold">Media</h4>
                <p className="text-sm opacity-90">Siz "Qora Tuynuk" haqida bilasizmi</p>
              </div>
            </div>

            {/* 3D Animation */}
            <div className="flex items-start space-x-3 text-white">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold">3D Animation</h4>
                <p className="text-sm opacity-90">Olmazar/anti sarchalik yordamida ko'rgansiz</p>
              </div>
            </div>

            {/* QR code, Kitoblar, Maqolalar */}
            <div className="flex items-start space-x-3 text-white">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold">QR code, Kitoblar, Maqolalar</h4>
                <p className="text-sm opacity-90">Mahsulot yoki Kitobni ishlatg</p>
              </div>
            </div>

            {/* Interactive Mashg'ulotlar */}
            <div className="flex items-start space-x-3 text-white">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold">Interactive Mashg'ulotlar</h4>
                <p className="text-sm opacity-90">Test-mis", Amaliyot bilan o'rganing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - AMATHING */}
        <div className="flex-1 p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4 text-center">AMATHING</h3>
          
          <div className="space-y-4">
            {/* Meta Darslik */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-lg">📚</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Meta Darslik</h4>
                <p className="text-sm text-gray-600">Taqrizotlar, TechMeta Kitoblar</p>
              </div>
            </div>

            {/* Vr */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Vr</h4>
                <p className="text-sm text-gray-600">Hayotiy his eting</p>
              </div>
            </div>

            {/* Ar */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Ar</h4>
                <p className="text-sm text-gray-600">Voqealar yongirangizda</p>
              </div>
            </div>

            {/* Hologramma */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <FlaskConical className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Hologramma</h4>
                <p className="text-sm text-gray-600">Tez Kursta</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Tavorlar Etilganlar */}
        <div className="w-80 bg-gray-50 p-6 rounded-r-lg">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Tavorlar Etilganlar</h3>
          
          <div className="space-y-4">
            {/* VR Card */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">VR: Quyosh Sistemasini kashf etish</h4>
              <p className="text-sm text-gray-600 mb-2">Quyosh sistemasini VR orqali o'rganing</p>
              <p className="text-xs text-gray-500">Bonus sayyoralarga tegib ko'rish</p>
              <button className="text-emerald-600 text-sm font-medium mt-2">Read more</button>
            </div>

            {/* V-Laboratoriya Card */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">V-Laboratoriya: Atom bombasi</h4>
              <p className="text-sm text-gray-600 mb-2">Kimyoviy Molekular orqali Portlash jaroyonlarini nazariy qilish</p>
              <button className="text-emerald-600 text-sm font-medium mt-2">Read more</button>
            </div>

            <div className="flex items-center justify-between mt-6">
              <span className="text-gray-600">Ko'proq</span>
              <button className="text-emerald-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaDropdownMahsulotlar;
