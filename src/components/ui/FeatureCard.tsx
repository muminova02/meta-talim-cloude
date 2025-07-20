
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: 'emerald' | 'blue' | 'orange' | 'green' | 'teal' | 'cyan' | 'purple' | 'indigo' | 'pink' | 'yellow' | 'red';
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  color,
  delay = 0 
}) => {
  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-500',
      hover: 'group-hover:bg-emerald-600',
      border: 'border-emerald-200',
      text: 'text-emerald-600'
    },
    blue: {
      bg: 'bg-blue-500',
      hover: 'group-hover:bg-blue-600',
      border: 'border-blue-200',
      text: 'text-blue-600'
    },
    orange: {
      bg: 'bg-orange-500',
      hover: 'group-hover:bg-orange-600',
      border: 'border-orange-200',
      text: 'text-orange-600'
    },
    green: {
      bg: 'bg-green-500',
      hover: 'group-hover:bg-green-600',
      border: 'border-green-200',
      text: 'text-green-600'
    },
    teal: {
      bg: 'bg-teal-500',
      hover: 'group-hover:bg-teal-600',
      border: 'border-teal-200',
      text: 'text-teal-600'
    },
    cyan: {
      bg: 'bg-cyan-500',
      hover: 'group-hover:bg-cyan-600',
      border: 'border-cyan-200',
      text: 'text-cyan-600'
    },
    purple: {
      bg: 'bg-purple-500',
      hover: 'group-hover:bg-purple-600',
      border: 'border-purple-200',
      text: 'text-purple-600'
    },
    indigo: {
      bg: 'bg-indigo-500',
      hover: 'group-hover:bg-indigo-600',
      border: 'border-indigo-200',
      text: 'text-indigo-600'
    },
    pink: {
      bg: 'bg-pink-500',
      hover: 'group-hover:bg-pink-600',
      border: 'border-pink-200',
      text: 'text-pink-600'
    },
    yellow: {
      bg: 'bg-yellow-500',
      hover: 'group-hover:bg-yellow-600',
      border: 'border-yellow-200',
      text: 'text-yellow-600'
    },
    red: {
      bg: 'bg-red-500',
      hover: 'group-hover:bg-red-600',
      border: 'border-red-200',
      text: 'text-red-600'
    }
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="group"
    >
      <div className={`bg-white rounded-2xl p-8 shadow-lg border-2 ${colors.border} transition-all duration-300 hover:shadow-2xl h-full`}>
        <div className="flex flex-col items-center text-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
            className={`${colors.bg} ${colors.hover} w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300`}
          >
            <Icon className="h-8 w-8 text-white" />
          </motion.div>
          
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            {title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
