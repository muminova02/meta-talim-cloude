import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Award, Globe } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      number: "10,000+",
      label: "Faol foydalanuvchilar",
      color: "text-emerald-600",
    },
    {
      icon: BookOpen,
      number: "500+",
      label: "Ta'lim materiallari",
      color: "text-blue-600",
    },
    {
      icon: Award,
      number: "50+",
      label: "Ta'lim muassasalari",
      color: "text-orange-600",
    },
    {
      icon: Globe,
      number: "25+",
      label: "Shahar va viloyatlar",
      color: "text-purple-600",
    },
  ];

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
            Bizning Natijalarimiz
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            MusavvirEdu platformasi O'zbekiston bo'ylab muvaffaqiyatli faoliyat
            yuritmoqda
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className={`${stat.color} mx-auto mb-4`}
                >
                  <stat.icon className="h-12 w-12 mx-auto" />
                </motion.div>

                <motion.h3
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-3xl lg:text-4xl font-bold mb-2 text-gray-800"
                >
                  {stat.number}
                </motion.h3>

                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-full shadow-lg">
            <Award className="h-6 w-6" />
            <span className="font-semibold">
              O'zbekiston Ta'lim Vazirligi tomonidan tasdiqlangan
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
