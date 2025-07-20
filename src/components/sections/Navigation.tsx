
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '../ui/dropdown-menu';
import MegaDropdown from '../ui/MegaDropdown';
import MegaDropdown2 from '../ui/MegaDropdown2';
import MegaDropdownMahsulotlar from '../ui/MegaDropdownMahsulotlar';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMaktabDropdownOpen, setIsMaktabDropdownOpen] = useState(false);
  const [isMahsulotlarDropdownOpen, setIsMahsulotlarDropdownOpen] = useState(false);

  const navItems = [
    {
      name: 'Universitet',
      href: '#',
      dropdown: [
        { label: 'Bakalavriat', href: '#' },
        { label: 'Magistratura', href: '#' },
        { label: 'Doktorantura', href: '#' },
        { label: 'Online kurslar', href: '#' },
      ]
    },
    {
      name: 'O\'qituvchilar',
      href: '#',
      dropdown: [
        { label: 'Biyalogiya', href: '#' },
        { label: 'Matematika', href: '#' },
        { label: 'Fizika', href: '#' },
        { label: 'Kimyo', href: '#' },
        { label: 'Ingliz tili', href: '#' },
        { label: 'Adabiyot', href: '#' },
        { label: 'Tarix', href: '#' },
      ]
    },
    {
      name: 'Yordam',
      href: '#',
      dropdown: [
        { label: 'Qo\'llanma', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'Texnik yordam', href: '#' },
        { label: 'Bog\'lanish', href: '#' },
      ]
    }
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-emerald-500 text-white shadow-lg relative z-50"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {/* Logo PNG bu yerga qo'ying */}
            <img
              src="/images/meta-talim-logo.png"
              alt="Meta Ta'lim Logo"
              className="h-40 w-40 object-contain"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 relative">
            {/* Special Maktab dropdown */}
            <div
              className="relative static"
              onMouseEnter={() => setIsMaktabDropdownOpen(true)}
              onMouseLeave={() => setIsMaktabDropdownOpen(false)}
              tabIndex={0}
              onFocus={() => setIsMaktabDropdownOpen(true)}
              onBlur={e => {
                // Only close if focus moves outside the dropdown
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setIsMaktabDropdownOpen(false);
                }
              }}
            >
              <Button
                variant="ghost"
                className="text-white hover:bg-emerald-600 hover:text-white flex items-center gap-1"
                aria-haspopup="true"
                aria-expanded={isMaktabDropdownOpen}
                onClick={() => setIsMaktabDropdownOpen((open) => !open)}
                tabIndex={0}
              >
                Maktab
                <ChevronDown className="h-4 w-4" />
              </Button>
              {/* Overlay for closing dropdown on click outside */}
              {isMaktabDropdownOpen && (
                <div
                  className="fixed inset-0 bg-gray-900 bg-opacity-70 z-40 pointer-events-auto"
                  style={{ top: '64px' }}
                  onClick={() => setIsMaktabDropdownOpen(false)}
                  tabIndex={-1}
                  aria-hidden="true"
                />
              )}
              <MegaDropdown2 isOpen={isMaktabDropdownOpen} />
            </div>

            {/* Regular dropdowns for Universitet and O'qituvchilar */}
            {navItems.slice(0, 2).map((item, index) => (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-emerald-600 hover:text-white flex items-center gap-1"
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 bg-white border border-gray-200 shadow-lg z-50"
                  sideOffset={5}
                >
                  <DropdownMenuLabel className="text-gray-700 font-semibold">
                    {item.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {item.dropdown.map((dropdownItem, dropdownIndex) => (
                    <DropdownMenuItem
                      key={dropdownIndex}
                      className="text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer"
                    >
                      <a href={dropdownItem.href} className="w-full">
                        {dropdownItem.label}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}

            {/* Special Mahsulotlar dropdown */}
            <div
              className="relative static"
              onMouseEnter={() => setIsMahsulotlarDropdownOpen(true)}
              onMouseLeave={() => setIsMahsulotlarDropdownOpen(false)}
            >
              <Button
                variant="ghost"
                className="text-white hover:bg-emerald-600 hover:text-white flex items-center gap-1"
              >
                Mahsulotlar
                <ChevronDown className="h-4 w-4" />
              </Button>
              {/* Overlay for closing dropdown on click outside */}
              {isMahsulotlarDropdownOpen && (
                <div
                  className="fixed inset-0 bg-gray-900 bg-opacity-70 z-40 pointer-events-auto"
                  style={{ top: '64px' }}
                  onClick={() => setIsMahsulotlarDropdownOpen(false)}
                  tabIndex={-1}
                  aria-hidden="true"
                />
              )}
              <MegaDropdownMahsulotlar isOpen={isMahsulotlarDropdownOpen} />
            </div>

            {/* Yordam dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-emerald-600 hover:text-white flex items-center gap-1"
                >
                  Yordam
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 bg-white border border-gray-200 shadow-lg z-50"
                sideOffset={5}
              >
                <DropdownMenuLabel className="text-gray-700 font-semibold">
                  Yordam
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {navItems[2].dropdown.map((dropdownItem, dropdownIndex) => (
                  <DropdownMenuItem
                    key={dropdownIndex}
                    className="text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer"
                  >
                    <a href={dropdownItem.href} className="w-full">
                      {dropdownItem.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-emerald-600">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-emerald-600">
              <ShoppingCart className="h-4 w-4" />
              <span className="ml-1">Marketplace</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-emerald-600">
              <Globe className="h-4 w-4" />
              <span className="ml-1">UZB</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-emerald-600">
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
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden py-4 border-t border-emerald-400"
          >
            <div className="flex flex-col space-y-4">
              {/* Mobile Maktab Section */}
              <div className="space-y-2">
                <div className="text-white font-medium py-2 border-b border-emerald-400">
                  Maktab
                </div>
                <div className="pl-4 space-y-1">
                  <div className="text-emerald-200 text-sm font-medium">FANLAR</div>
                  {['Biyalogiya', 'Kimyo', 'Fizika', 'Tarix'].map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block text-emerald-200 hover:text-white transition-colors duration-200 py-1 text-sm pl-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
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
                <Button variant="ghost" size="sm" className="text-white hover:bg-emerald-600">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-emerald-600">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-emerald-600">
                  <Globe className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-emerald-600">
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
