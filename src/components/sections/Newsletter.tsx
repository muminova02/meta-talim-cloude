
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-500 to-emerald-700">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-8"
          >
            <Mail className="h-8 w-8 text-emerald-600" />
          </motion.div>

          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
            Yangiliklar va Maslahatlar
          </h2>
          
          <p className="text-lg lg:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            MetaTa'lim platformasidagi eng so'nggi yangiliklar va ta'lim bo'yicha foydali maslahatlarni birinchi bo'lib oling
          </p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Email manzilingizni kiriting"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white border-0 h-12 text-gray-800 placeholder:text-gray-500"
              required
            />
            
            <Button
              type="submit"
              className="bg-white text-emerald-600 hover:bg-gray-100 h-12 px-8 font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <ArrowRight className="h-5 w-5 ml-2" />
              Obuna
            </Button>
          </motion.form>

          <AnimatePresence>
            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 text-emerald-100 font-medium"
              >
                ✓ Muvaffaqiyatli obuna bo'ldingiz!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
