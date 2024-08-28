"use client"

import React from 'react';
import { titleFont } from '@/config/fonts';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title: React.FC<Props> = ({ title, subtitle, className }) => {
  return (
    <motion.div
      className={`px-5 lg:px-10 my-8 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className={`
        ${titleFont.className} 
        text-4xl md:text-5xl lg:text-6xl 
        font-bold 
        text-gray-800 
        leading-tight
        mb-4
      `}>
        <motion.span
          initial={{ backgroundSize: '0 100%' }}
          animate={{ backgroundSize: '100% 100%' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            backgroundImage: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 88%',
            backgroundSize: '100% 0.2em',
            padding: '0 0.2em',
          }}
        >
          {title}
        </motion.span>
      </h1>

      {subtitle && (
        <motion.h3
          className="
            text-xl md:text-2xl 
            text-gray-600 
            max-w-3xl 
            leading-relaxed
          "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {subtitle}
        </motion.h3>
      )}

      <motion.div
        className="w-24 h-1 bg-indigo-600 mt-6"
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
    </motion.div>
  )
}