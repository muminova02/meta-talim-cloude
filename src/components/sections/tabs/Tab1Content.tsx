
import React from 'react';
import { motion } from 'framer-motion';
import { CircleArrowRight, GraduationCap } from 'lucide-react';

const Tab1Content: React.FC = () => {
  return (<>
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 lg:p-12 relative overflow-hidden w-full" style={{ background: 'rgba(32,208,163,0.3)' }}>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center">
        <span className="text-emerald-600 font-bold text-lg tracking-wider">Tadbirlar</span>
      </div>


      <div className="ml-8 lg:ml-16">
        <h4 className="text-2xl font-bold text-gray-800 mb-8">
          Ko'p o'quvchilar Ilim olish uchun Bizning Sinalgan Resurslardan foydalanishadi
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { color: 'green-400 to-green-600', text: 'VR thinking' },
            { color: 'green-400 to-green-600', text: 'VR thinking' },
            { color: 'green-400 to-green-600', text: 'VR thinking' },
            { color: 'green-400 to-green-600', text: 'VR thinking' },
            { color: 'green-400 to-green-600', text: 'VR thinking' },
            { color: 'green-400 to-green-600', text: 'VR thinking' },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className={`bg-${card.color} rounded-2xl p-6 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-100`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <span className="font-bold text-lg">{card.text}</span>
              </div>
              <p className="text-white/90 text-sm">
                Ta'lim darsliklari uchun VR kontentlar
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 cursor-pointer transition-colors duration-300"
        >
          <span className="font-medium">O'quvchi asosblari haqida ko'proq billing</span>
          <CircleArrowRight className="h-5 w-5" />
        </motion.div>
      </div>
    </div>
  </>
  );
};

export default Tab1Content;
