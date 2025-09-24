import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const serviceLinks = [
    { name: "Illustrations", href: "#" },
    { name: "Mobile Design", href: "#" },
    { name: "Motion Graphic", href: "#" },
    { name: "Web Design", href: "#" },
    { name: "Development", href: "#" },
    { name: "SEO", href: "#" },
  ];

  const companyLinks = [
    { name: "Service", href: "#" },
    { name: "Features", href: "#" },
    { name: "Our Team", href: "#" },
    { name: "Portfolio", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Musavvir Edu</h3>
            </div>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              CEO/Founder: Muqaddas
            </p>

            <p className="text-gray-500 text-sm mb-6">
              Copyright © 2025 Musavvir Edu
            </p>

            <p className="text-gray-500 text-xs">
              Autorlik huquqlari ega. 2025 Fevral
            </p>
          </motion.div>

          {/* Service Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-gray-800">
              Service
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-emerald-500 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-gray-800">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-emerald-500 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-gray-800">
              Join a Newsletter
            </h4>

            <div className="space-y-4 mb-6">
              <Input type="email" placeholder="Your Email" className="w-full" />
              <Input type="text" placeholder="Your Name" className="w-full" />
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                Subscribe
              </Button>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-500" />
              <span>Amir Temur ko'chasi, 10-uy</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-500" />
              <span>muminova.2m@gmail.com</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-500" />
              <span>+998(94) 546-18-12</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
