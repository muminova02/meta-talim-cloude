
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '../ui/button';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Fotima Yusufbekova",
      role: "Yuqori Matematika o'qituvchisi",
      content: "MetaTa'lim platformasi orqali o'quvchilarim matematik formulalarni 3D ko'rinishda ko'rib, chuqurroq tushunishmoqda. Bu ajoyib texnologiya!",
      image: "https://static.vecteezy.com/system/resources/thumbnails/029/769/642/small/portrait-of-beautiful-muslim-female-student-online-learning-in-coffee-shop-young-woman-with-hijab-studies-with-laptop-in-cafe-girl-doing-her-homework-free-photo.jpeg"
    },
    
    {
      name: "Akmal Rahmonov",
      role: "Fizika o'qituvchisi", 
      content: "AR texnologiyasi yordamida atom tuzilishini namoyish qilish o'quvchilar uchun juda qiziqarli va tushunarli. Natijalar ajoyib!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Malika Karimova",
      role: "Kimyo o'qituvchisi",
      content: "VR muhitida kimyoviy reaksiyalarni ko'rsatish imkoniyati o'quvchilar uchun xavfsiz va samarali. Tavsiya qilaman!",
      image: "/images/teacher2.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // 5 soniyada bir o‘zgaradi
    return () => clearInterval(interval);
  }, [testimonials.length]);


  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
            Foydalanuvchi Fikrlari
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            O'qituvchilar va talabalar MetaTa'lim haqida nima deyishadi
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl"
              >
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-24 h-24 rounded-full object-cover shadow-lg"
                    />
                  </div>
                  
                  <div className="flex-1 text-center lg:text-left">
                    <Quote className="h-8 w-8 text-emerald-500 mb-4 mx-auto lg:mx-0" />
                    <p className="text-lg lg:text-xl text-gray-700 mb-6 leading-relaxed">
                      "{testimonials[currentIndex].content}"
                    </p>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-1">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-emerald-600 font-medium">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Control Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="lg"
                onClick={prevTestimonial}
                className="rounded-full p-3 border-emerald-200 hover:bg-emerald-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-emerald-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="lg"
                onClick={nextTestimonial}
                className="rounded-full p-3 border-emerald-200 hover:bg-emerald-50"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
