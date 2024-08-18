"use client";

import { Footer, Sidebar, TopMenu } from '@/components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import { BiSolidMessageAltDetail } from "react-icons/bi"
import { MdEmail } from "react-icons/md";
import { useFloating, useInteractions, useHover, offset, FloatingPortal, arrow, shift } from '@floating-ui/react';

const Tooltip = ({ children, label }: { children: React.ReactNode; label: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'left',
    middleware: [
      offset(5),
      shift(),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="text-gray-800 bg-white text-sm px-2 py-1 rounded pointer-events-none"
          >
            {label}
            {/* <div ref={arrowRef} className="absolute bg-gray-800 w-2 h-2 rotate-45 -translate-y-1/2" /> */}
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

export default function ShopLayout({ children }: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const socialIcons = [
    { icon: FaWhatsapp, href: 'https://wa.me/2348174870158', color: '#25D366', label: 'WhatsApp' },
    { icon: FaInstagram, href: 'https://www.instagram.com/carsofabuja_?igsh=YTkwam5veDYwZno3&utm_source=qr', color: '#E4405F', label: 'Instagram' },
    { icon: MdEmail, href: 'mailto:summittechresources@gmail.com', color: '#1E186F', label: 'Email' }
  ];

  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="py-10 lg:py-28 min-h-screen relative">
        {children}
        <motion.div
          className="fixed bottom-4 right-0 mx-2 mb-14 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <motion.button
            className="bg-[#1E186F] text-white rounded-full p-4 shadow-lg transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDropdown}
          >
            {isOpen ? <IoCloseCircle size={24} /> : <BiSolidMessageAltDetail size={24} />}
          </motion.button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl p-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                {socialIcons.map((social, index) => (
                  <Tooltip key={index} label={social.label}>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon size={24} color={social.color} />
                    </motion.a>
                  </Tooltip>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}