"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './badge';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  children?: React.ReactNode;
}

export const HeroSection = ({ title, subtitle, description, children }: HeroSectionProps) => {
  const titleWords = title.split(' ');
  
  return (
    <div className="relative text-center max-w-4xl mx-auto">
      {/* Subtitle Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Badge 
          variant="secondary" 
          className="px-6 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm text-gray-700 border-gray-200/50 shadow-sm"
        >
          ✨ {subtitle}
        </Badge>
      </motion.div>

      {/* Main Title */}
      <motion.h1 
        className="text-6xl lg:text-8xl font-black text-gray-900 mb-8 leading-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {titleWords.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3 + index * 0.1,
              ease: "easeOut"
            }}
            className="inline-block mr-4"
            style={{
              background: index === titleWords.length - 1 
                ? 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' 
                : 'inherit',
              WebkitBackgroundClip: index === titleWords.length - 1 ? 'text' : 'initial',
              WebkitTextFillColor: index === titleWords.length - 1 ? 'transparent' : 'inherit',
              backgroundClip: index === titleWords.length - 1 ? 'text' : 'initial',
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      {/* Description */}
      <motion.p 
        className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {description}
      </motion.p>

      {/* Children (CTA buttons, etc.) */}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};