// src/components/Navbar.jsx
import React from 'react';
import { Building, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-4 transition-colors duration-200`}>
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <Building className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <span className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'} hidden sm:inline`}>
            Urban Haven
          </span>
        </div>
        
        <h1 className={`text-xl sm:text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Urban View
        </h1>
        
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg ${
            darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-600'
          } hover:bg-opacity-80 transition-colors duration-200`}
        >
          {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;