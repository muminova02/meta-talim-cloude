
import React from 'react';
import { motion } from 'framer-motion';
import { CircleArrowRight, BookOpen, Lightbulb } from 'lucide-react';

const Tab2Content: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12 relative overflow-hidden mx-auto" style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center">
        <span className="text-blue-600 font-bold text-lg tracking-wider">Uskunalar</span>
      </div>

      <div className="ml-8 lg:ml-16">
        <h4 className="text-2xl font-bold text-gray-800 mb-8">
          O'qituvchilar uchun zamonaviy ta'lim vositalari va metodlar
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { color: 'from-blue-400 to-blue-600', text: 'AI Dars Rejasi', icon: <Lightbulb className="w-5 h-5" /> },
            { color: 'from-purple-400 to-purple-600', text: 'Virtual Lab', icon: <BookOpen className="w-5 h-5" /> },
            { color: 'from-green-400 to-green-600', text: 'Test Tizimi', icon: <BookOpen className="w-5 h-5" /> },
            { color: 'from-orange-400 to-orange-600', text: 'Progress Tracker', icon: <Lightbulb className="w-5 h-5" /> },
            { color: 'from-teal-400 to-teal-600', text: 'Interaktiv Darslar', icon: <BookOpen className="w-5 h-5" /> },
            { color: 'from-pink-400 to-pink-600', text: 'Baholash Tizimi', icon: <Lightbulb className="w-5 h-5" /> },
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
                O'qituvchilar uchun maxsus vositalar
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
          <span className="font-medium">O'qituvchi vositalari haqida batafsil</span>
          <CircleArrowRight className="h-5 w-5" />
        </motion.div>
      </div>
    </div>
  );
};

export default Tab2Content;
