
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeSection = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      id: 'cyber',
      name: 'Cyber',
      description: 'Default cyberpunk theme with blue and purple accents',
      colors: ['#0EA5E9', '#8B5CF6', '#D946EF'],
    },
    {
      id: 'neon',
      name: 'Neon',
      description: 'Bright neon green and pink for maximum visibility',
      colors: ['#10B981', '#EC4899', '#FBBF24'],
    },
    {
      id: 'midnight',
      name: 'Midnight',
      description: 'Dark theme with subtle blue highlights',
      colors: ['#1E3A8A', '#3B82F6', '#93C5FD'],
    },
  ];

  return (
    <section id="theme" className="py-20 bg-cyber-dark relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
            Customize Your Experience
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {themes.map((t) => (
            <motion.div
              key={t.id}
              whileHover={{ y: -10 }}
              className={`group cursor-pointer p-6 rounded-xl border ${
                theme === t.id
                  ? 'border-neon-cyan bg-cyber-dark/90'
                  : 'border-muted bg-cyber-dark/50'
              } transition-all duration-300 hover:shadow-neon-cyan`}
              onClick={() => setTheme(t.id as any)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{t.name}</h3>
                <div className="flex space-x-2">
                  {t.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{t.description}</p>
              <div
                className={`w-full h-1 rounded-full ${
                  theme === t.id ? 'bg-neon-cyan' : 'bg-muted'
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-blue/20 rounded-full blur-3xl" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-purple/20 rounded-full blur-3xl" />
    </section>
  );
};

export default ThemeSection;
