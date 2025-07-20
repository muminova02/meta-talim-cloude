
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface TabPanelProps {
  title: string;
  description: string;
  buttonText: string;
  subject: string;
  onButtonClick: () => void;
  children?: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  children,
  subject
}) => {
  return (
    <>
      <div className="text-start mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-start gap-2 mb-4 text-2xl"
        >
          <GraduationCap className="w-8 h-8 text-yellow-600" />
          <span className="text-yellow-600 font-semibold">{subject} uchun</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl lg:text-5xl font-bold text-emerald-600 mb-4"
        >
          Interaktiv Digital Ta'lim
        </motion.h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8"
      >

        <div className="max-w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4">
            {title}
          </h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            {description}
          </p>

          {children && (
            <div className="mb-6">
              {children}
            </div>
          )}

          <motion.button
            onClick={onButtonClick}
            className="bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default TabPanel;
