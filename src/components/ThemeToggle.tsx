// @ts-nocheck
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 group ${className}`}
      aria-label="Toggle theme"
    >
      {/* Background dengan efek glass morphism */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 to-fuchsia-500/20 group-hover:from-amber-500/30 group-hover:to-fuchsia-500/30 backdrop-blur-sm border border-white/10 transition-all"></div>
      
      {/* Icon */}
<div className="relative transform transition-transform duration-500 group-hover:rotate-180">
  {theme === 'dark' ? (
    // Sun icon untuk light mode
    <svg className="w-5 h-5 text-[#A8DADC]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
    </svg>
  ) : (
    // Moon icon untuk dark mode
    <svg className="w-5 h-5 text-[#B39CD0]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  )}
</div>

      {/* Tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-900 to-gray-800 text-amber-300 text-xs py-1 px-2 rounded-lg border border-amber-500/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </div>
    </button>
  );
};

export default ThemeToggle;
