
import React from 'react';
import { motion } from 'framer-motion';
// 
import { Box, Eye, Smartphone, BookOpen, Brain, Users } from 'lucide-react';      

const Features = () => {
  const features = [
    {
      icon: Box,
      title: "3D Modellar",
      description: "Interaktiv 3D obyektlar bilan o'rganish jarayonini boyiting",
      color: "bg-gradient-to-br from-emerald-400 to-emerald-600"
    },
    {
      icon: Eye,
      title: "AR Tajriba",
      description: "Kengaytirilgan reallik orqali haqiqiy dunyo bilan ta'lim birlashtiring",
      color: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      icon: Smartphone,
      title: "VR Muhiti",
      description: "Virtual reallik orqali to'liq immersiv ta'lim tajribasi",
      color: "bg-gradient-to-br from-orange-400 to-orange-600"
    },
    {
      icon: BookOpen,
      title: "QR & Code",
      description: "QR kodlar va dasturlash orqali interaktiv kontentlar",
      color: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    {
      icon: Brain,
      title: "AI Dars Reja",
      description: "Sun'iy intellekt yordamida individual dars rejalari",
      color: "bg-gradient-to-br from-pink-400 to-pink-600"
    },
    {
      icon: Users,
      title: "Hamkorlik",
      description: "Jamoaviy ishlash va bilim almashish imkoniyatlari",
      color: "bg-gradient-to-br from-teal-400 to-teal-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
            MetaTa'lim Imkoniyatlari
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Zamonaviy texnologiyalar bilan ta'limni yangi bosqichga olib chiqing
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
