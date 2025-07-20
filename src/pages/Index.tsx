
import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/sections/Navigation';
import Hero from '../components/sections/Hero';
import ForWhom from '../components/sections/ForWhom';
import QRCodeSection from '../components/sections/QRCodeSection';
import Features from '../components/sections/Features';
import TabbedSection from '../components/sections/TabbedSection';
import EducationalFeatures from '../components/sections/EducationalFeatures';
import VRSection from '../components/sections/VRSection';
import Testimonials from '../components/sections/Testimonials';
import Stats from '../components/sections/Stats';
import Newsletter from '../components/sections/Newsletter';
import Footer from '../components/sections/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
        {/* <ForWhom /> */}
        <QRCodeSection />
        <TabbedSection />
        <EducationalFeatures />
        <VRSection />
        {/* <Features /> */}
        <Testimonials />
        <Stats />
        <Newsletter />
        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;
