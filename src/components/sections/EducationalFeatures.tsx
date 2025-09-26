
  import React from 'react';
  import { motion } from 'framer-motion';
  import { FileText, CreditCard, Users, Headset } from 'lucide-react';

  const EducationalFeatures = () => {
    console.log("EducationalFeatures component rendered");
    
    const features = [
      {
        icon: FileText,
        title: "Qulay va Tezkor Ilovalar",
        description: "Dars jarayonida resurslardan foydalanishda sizga qulay bo'lgan vositalarmizni taklif qilamiz"
      },
      {
        icon: FileText,
        title: "Qulay va Tezkor Ilovalar", 
        description: "Dars jarayonida resurslardan foydalanishda sizga qulay bo'lgan vositalarmizni taklif qilamiz"
      },
      {
        icon: FileText,
        title: "Qulay va Tezkor Ilovalar",
        description: "Dars jarayonida resurslardan foydalanishda sizga qulay bo'lgan vositalarmizni taklif qilamiz"
      },
      {
        icon: FileText,
        title: "Qulay va Tezkor Ilovalar",
        description: "Dars jarayonida resurslardan foydalanishda sizga qulay bo'lgan vositalarmizni taklif qilamiz"
      }
    ];

    return (
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-600 mb-4">
              Tashkilotingiz darajasi yuqori bo'lishi
            </h2>
            <p className="text-xl text-emerald-700">
              uchun Biz beradigan yechimlar
            </p>
          </motion.div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-sky-300 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 "
              >
                <div className="flex items-start gap-3 mb-4 text-xl">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-600 textsm mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-sky-300 rounded-2xl p-6 mb-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-green-600 text-lg mb-1">
                  Tasdiqlangan o'quv uslubiyatlari
                </h3>
                <p className="text-gray-600 text-sm">
                  Ta'lim vazirigi tomonidan, tasdiqlangan o'quv uslubiyatlari bu katta imkoniyat beradi. 
                  Tashkilotingiz ishonchli o'quv resurslariga ega bo'ladi.
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Sertifikat tasdiqlangan sana: 2025.07.26
                </p>
              </div>
            </div>
          </motion.div>

          {/* VR Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - VR Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-600 mb-6">
                VR dars va Laboratoriya
                <br />
                <span className="text-emerald-700">amaliy mashg'ulotlar</span>
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Headset className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      Real resurslar juda ham qimmat, biz bunga virtual yechim berish orqali, turli
                      <strong className="text-emerald-600"> VR darslar va Virtual Laboratoriyalar</strong> taklif qilamiz
                    </p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-orange-600 mb-2">
                  Tez kunda VR sinf
                </h3>
                <p className="text-gray-700">
                  Maxsus ishlab chiqilgan VR sinf ko'z o'ngakri, va VR muhit taklif
                </p>
              </motion.div>
            </motion.div>

            {/* Right Side - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                {/* VR Illustration Placeholder */}
                <div className="w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl flex items-center justify-center">
                  <div className="text-center">
                    <Headset className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <Users className="w-12 h-12 text-blue-600 mx-auto" />
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -left-4 w-16 h-16 bg-pink-200 rounded-2xl flex items-center justify-center"
                >
                  <span className="text-2xl">❤️</span>
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute -bottom-4 -right-4 w-16 h-16 bg-green-200 rounded-2xl flex items-center justify-center"
                >
                  <span className="text-2xl">⚙️</span>
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    x: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute top-1/4 -right-8 w-12 h-12 bg-yellow-200 rounded-xl flex items-center justify-center"
                >
                  <span className="text-xl">🎯</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  export default EducationalFeatures;
