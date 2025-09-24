"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Globe,
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/button";
import MegaDropdown2 from "../ui/MegaDropdown2";
import MegaDropdownMahsulotlar from "../ui/MegaDropdownMahsulotlar";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMaktabDropdownOpen, setIsMaktabDropdownOpen] = useState(false);
  const [isMahsulotlarDropdownOpen, setIsMahsulotlarDropdownOpen] =
    useState(false);
  const [isUniversitetDropdownOpen, setIsUniversitetDropdownOpen] =
    useState(false);
  const [isOqituvchilarDropdownOpen, setIsOqituvchilarDropdownOpen] =
    useState(false);
  const [isYordamDropdownOpen, setIsYordamDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const navItems = [
    {
      name: "Universitet",
      href: "#",
      dropdown: [
        { label: "Bakalavriat", href: "#" },
        { label: "Magistratura", href: "#" },
        { label: "Doktorantura", href: "#" },
        { label: "Online kurslar", href: "#" },
      ],
    },
    {
      name: "O'qituvchilar",
      href: "#",
      dropdown: [
        { label: "Biyalogiya", href: "#" },
        { label: "Matematika", href: "#" },
        { label: "Fizika", href: "#" },
        { label: "Kimyo", href: "#" },
        { label: "Ingliz tili", href: "#" },
        { label: "Adabiyot", href: "#" },
        { label: "Tarix", href: "#" },
      ],
    },
    {
      name: "Yordam",
      href: "#",
      dropdown: [
        { label: "Qo'llanma", href: "#" },
        { label: "FAQ", href: "#" },
        { label: "Texnik yordam", href: "#" },
        { label: "Bog'lanish", href: "#" },
      ],
    },
  ];

  // Close all dropdowns except the specified one
  const closeOtherDropdowns = (excludeSetter) => {
    const allSetters = [
      setIsMaktabDropdownOpen,
      setIsMahsulotlarDropdownOpen,
      setIsUniversitetDropdownOpen,
      setIsOqituvchilarDropdownOpen,
      setIsYordamDropdownOpen,
    ];
    allSetters.forEach((setter) => {
      if (setter !== excludeSetter) setter(false);
    });
  };

  // Generic dropdown handlers
  const createDropdownHandlers = (setDropdownOpen, currentState) => ({
    onMouseEnter: () => {
      if (!isMobile) {
        setDropdownOpen(true);
        closeOtherDropdowns(setDropdownOpen);
      }
    },
    onMouseLeave: () => {
      if (!isMobile) {
        // Do not close on mouse leave for Maktab and Mahsulotlar
        if (
          setDropdownOpen !== setIsMaktabDropdownOpen &&
          setDropdownOpen !== setIsMahsulotlarDropdownOpen
        ) {
          setDropdownOpen(false);
        }
      }
    },
    onClick: () => {
      if (isMobile) {
        setDropdownOpen(!currentState);
        closeOtherDropdowns(setDropdownOpen);
      }
    },
  });

  const maktabHandlers = createDropdownHandlers(
    setIsMaktabDropdownOpen,
    isMaktabDropdownOpen
  );
  const mahsulotlarHandlers = createDropdownHandlers(
    setIsMahsulotlarDropdownOpen,
    isMahsulotlarDropdownOpen
  );
  const universitetHandlers = createDropdownHandlers(
    setIsUniversitetDropdownOpen,
    isUniversitetDropdownOpen
  );
  const oqutuvchilarHandlers = createDropdownHandlers(
    setIsOqituvchilarDropdownOpen,
    isOqituvchilarDropdownOpen
  );
  const yordamHandlers = createDropdownHandlers(
    setIsYordamDropdownOpen,
    isYordamDropdownOpen
  );

  const CustomDropdown = ({
    isOpen,
    onMouseEnter,
    onMouseLeave,
    onClick,
    buttonText,
    items,
    title,
  }) => (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Button
        variant="ghost"
        className="text-white hover:bg-emerald-600 hover:text-white flex items-center gap-1"
        onClick={onClick}
      >
        {buttonText}
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-transparent z-40 pointer-events-auto"
            style={{ top: "64px" }}
            onClick={() => {
              setIsUniversitetDropdownOpen(false);
              setIsOqituvchilarDropdownOpen(false);
              setIsYordamDropdownOpen(false);
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50"
          >
            <div className="py-2">
              <div className="px-4 py-2 text-gray-700 font-semibold border-b border-gray-100">
                {title}
              </div>
              {items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200"
                  onClick={() => closeOtherDropdowns(null)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-emerald-500 text-white shadow-lg relative z-50"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src="/images/meta-talim-logo.png"
              alt="Musavvir Edu Logo"
              className="h-40 w-40 object-contain"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 relative">
            {/* Special Maktab dropdown */}
            <div
              className="relative static"
              onMouseEnter={maktabHandlers.onMouseEnter}
              onMouseLeave={maktabHandlers.onMouseLeave}
            >
              <Button
                variant="ghost"
                className="text-white hover:bg-emerald-600 hover:text-white flex items-center gap-1"
                onClick={maktabHandlers.onClick}
              >
                Maktab
                <ChevronDown className="h-4 w-4" />
              </Button>

              {isMaktabDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-70 z-40 pointer-events-auto"
                    style={{ top: "64px" }}
                    onClick={() => closeOtherDropdowns(null)}
                  />
                  <MegaDropdown2 isOpen={isMaktabDropdownOpen} />
                </>
              )}
            </div>

            {/* Universitet dropdown */}
            <CustomDropdown
              isOpen={isUniversitetDropdownOpen}
              onMouseEnter={universitetHandlers.onMouseEnter}
              onMouseLeave={universitetHandlers.onMouseLeave}
              onClick={universitetHandlers.onClick}
              buttonText="Universitet"
              items={navItems[0].dropdown}
              title="Universitet"
            />

            {/* O'qituvchilar dropdown */}
            <CustomDropdown
              isOpen={isOqituvchilarDropdownOpen}
              onMouseEnter={oqutuvchilarHandlers.onMouseEnter}
              onMouseLeave={oqutuvchilarHandlers.onMouseLeave}
              onClick={oqutuvchilarHandlers.onClick}
              buttonText="O'qituvchilar"
              items={navItems[1].dropdown}
              title="O'qituvchilar"
            />

            {/* Special Mahsulotlar dropdown */}
            <div
              className="relative static"
              onMouseEnter={mahsulotlarHandlers.onMouseEnter}
              onMouseLeave={mahsulotlarHandlers.onMouseLeave}
            >
              <Button
                variant="ghost"
                className="text-white hover:bg-emerald-600 hover:text-white flex items-center gap-1"
                onClick={mahsulotlarHandlers.onClick}
              >
                Mahsulotlar
                <ChevronDown className="h-4 w-4" />
              </Button>

              {isMahsulotlarDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-70 z-40 pointer-events-auto"
                    style={{ top: "64px" }}
                    onClick={() => closeOtherDropdowns(null)}
                  />
                  <MegaDropdownMahsulotlar isOpen={isMahsulotlarDropdownOpen} />
                </>
              )}
            </div>

            {/* Yordam dropdown */}
            <CustomDropdown
              isOpen={isYordamDropdownOpen}
              onMouseEnter={yordamHandlers.onMouseEnter}
              onMouseLeave={yordamHandlers.onMouseLeave}
              onClick={yordamHandlers.onClick}
              buttonText="Yordam"
              items={navItems[2].dropdown}
              title="Yordam"
            />
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-emerald-600"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-emerald-600"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="ml-1">Marketplace</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-emerald-600"
            >
              <Globe className="h-4 w-4" />
              <span className="ml-1">UZB</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-emerald-600"
            >
              <User className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-emerald-600"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden py-4 border-t border-emerald-400"
          >
            <div className="flex flex-col space-y-4">
              {/* Mobile Maktab Section */}
              <div className="space-y-2">
                <button
                  className="text-white font-medium py-2 border-b border-emerald-400 w-full text-left flex items-center justify-between"
                  onClick={() => {
                    setIsMaktabDropdownOpen(!isMaktabDropdownOpen);
                    closeOtherDropdowns(setIsMaktabDropdownOpen);
                  }}
                >
                  Maktab
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isMaktabDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMaktabDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-4 space-y-1"
                  >
                    <div className="text-emerald-200 text-sm font-medium">
                      FANLAR
                    </div>
                    {["Biyalogiya", "Kimyo", "Fizika", "Tarix"].map(
                      (item, index) => (
                        <a
                          key={index}
                          href="#"
                          className="block text-emerald-200 hover:text-white transition-colors duration-200 py-1 text-sm pl-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item}
                        </a>
                      )
                    )}
                  </motion.div>
                )}
              </div>

              {/* Mobile Mahsulotlar Section */}
              <div className="space-y-2">
                <button
                  className="text-white font-medium py-2 border-b border-emerald-400 w-full text-left flex items-center justify-between"
                  onClick={() => {
                    setIsMahsulotlarDropdownOpen(!isMahsulotlarDropdownOpen);
                    closeOtherDropdowns(setIsMahsulotlarDropdownOpen);
                  }}
                >
                  Mahsulotlar
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isMahsulotlarDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMahsulotlarDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-4 space-y-1"
                  >
                    {[
                      "Kitoblar",
                      "Video darslar",
                      "Test topshiriqlari",
                      "Interaktiv o'yinlar",
                    ].map((item, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block text-emerald-200 hover:text-white transition-colors duration-200 py-1 text-sm pl-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Regular mobile menu items */}
              {navItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-white font-medium py-2 border-b border-emerald-400">
                    {item.name}
                  </div>
                  <div className="pl-4 space-y-1">
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <a
                        key={dropdownIndex}
                        href={dropdownItem.href}
                        className="block text-emerald-200 hover:text-white transition-colors duration-200 py-1 text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {dropdownItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-center space-x-4 pt-4 border-t border-emerald-400">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-emerald-600"
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-emerald-600"
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-emerald-600"
                >
                  <Globe className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-emerald-600"
                >
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;
