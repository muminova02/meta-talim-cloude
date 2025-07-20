
import React from 'react';
import { motion } from 'framer-motion';

interface TabHeaderProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      {tabs.map((tab, index) => (
        <motion.button
          key={index}
          onClick={() => onTabChange(index)}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border-2 ${
            activeTab === index
              ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg'
              : 'bg-transparent text-emerald-600 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-400'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab}
        </motion.button>
      ))}
    </div>
  );
};

export default TabHeader;
