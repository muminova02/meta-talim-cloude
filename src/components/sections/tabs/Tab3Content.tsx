
import React from 'react';
import { motion } from 'framer-motion';
import { CircleArrowRight, Building, BarChart } from 'lucide-react';

const Tab3Content: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 lg:p-12 relative overflow-hidden mx-auto" style={{ background: 'rgba(147, 51, 234, 0.15)' }}>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center">
        <span className="text-purple-600 font-bold text-lg tracking-wider">Boshqaruv</span>
      </div>

      <div className="ml-8 lg:ml-16">
        <h4 className="text-2xl font-bold text-gray-800 mb-8">
          Tashkilotlar uchun keng qamrovli boshqaruv tizimlari
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { color: 'from-purple-400 to-purple-600', text: 'Boshqaruv Paneli', icon: <BarChart className="w-5 h-5" /> },
            { color: 'from-indigo-400 to-indigo-600', text: 'Analitika', icon: <BarChart className="w-5 h-5" /> },
            { color: 'from-blue-400 to-blue-600', text: 'Integratsiya', icon: <Building className="w-5 h-5" /> },
            { color: 'from-green-400 to-green-600', text: 'Texnik Yordam', icon: <Building className="w-5 h-5" /> },
            { color: 'from-orange-400 to-orange-600', text: 'Hisobotlar', icon: <BarChart className="w-5 h-5" /> },
            { color: 'from-pink-400 to-pink-600', text: 'Monitoring', icon: <Building className="w-5 h-5" /> },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-r ${card.color} rounded-2xl p-6 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  {card.icon}
                </div>
                <span className="font-bold text-lg">{card.text}</span>
              </div>
              <p className="text-white/90 text-sm">
                Tashkilot boshqaruvi uchun vositalar
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
          <span className="font-medium">Tashkilot imkoniyatlari haqida ko'proq</span>
          <CircleArrowRight className="h-5 w-5" />
        </motion.div>
      </div>
    </div>
  );
};

export default Tab3Content;
