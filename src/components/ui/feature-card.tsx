"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './badge';
import { Card } from './card';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay?: number;
}

export const FeatureCard = ({ 
  title, 
  subtitle, 
  description, 
  icon, 
  gradient,
  delay = 0 
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer"
    >
      <Card className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 p-8 h-full">
        <div className="relative z-10">
          {/* Icon with gradient background */}
          <motion.div 
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${gradient} mb-6 shadow-lg`}
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-white text-2xl">
              {icon}
            </div>
          </motion.div>
          
          {/* Badge */}
          <Badge variant="secondary" className="mb-4 bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 transition-colors">
            {subtitle}
          </Badge>
          
          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-base">
            {description}
          </p>
        </div>
        
        {/* Gradient overlay on hover */}
        <motion.div 
          className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.05 }}
        />
        
        {/* Subtle border glow */}
        <motion.div 
          className="absolute inset-0 rounded-lg border border-transparent group-hover:border-gray-200/50 transition-colors duration-500"
          whileHover={{ 
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.1)" 
          }}
        />
      </Card>
    </motion.div>
  );
};