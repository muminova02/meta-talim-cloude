
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Building2 } from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';

const ForWhom = () => {
  const cards: {
    icon: React.ElementType;
    title: string;
    description: string;
    color: 'emerald' | 'blue' | 'orange' | 'green' | 'teal' | 'cyan' | 'purple' | 'indigo' | 'pink' | 'yellow' | 'red';
  }[] = [
    {
      icon: GraduationCap,
      title: "O'quvchilar",
      description: "Interaktiv 3D va AR tajribalar orqali chuqurroq o'rganing",
      color: "emerald"
    },
    {
      icon: Users,
      title: "O'qituvchilar", 
      description: "Zamonaviy texnologiyalar bilan darslaringizni boyiting",
      color: "blue"
    },
    {
      icon: Building2,
      title: "Tashkilotlar",
      description: "Ta'lim sifatini oshiring va innovatsion yondashuvlarni joriy etish",
      color: "orange"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
            Kim uchun mo'ljallangan?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            MetaTa'lim platformasi barcha ta'lim ishtirokchilari uchun yaratilgan
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => (
            <FeatureCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              color={card.color}
              delay={index * 0.2}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ForWhom;
