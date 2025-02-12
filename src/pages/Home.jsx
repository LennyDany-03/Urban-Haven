import React, { useState } from 'react';
import { 
  Search, 
  Map, 
  User, 
  ShoppingCart, 
  DollarSign,
  ClipboardList,
  Building,
  Moon,
  Sun
} from 'lucide-react';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { title: 'Find Products', icon: Search, path: '/FindProduct' },
    { title: 'StoreMap', icon: Map, path: '/StoreMap' },
    { title: 'Account', icon: User, path: '/Account' },
    { title: 'Current Cart', icon: ShoppingCart, path: '/Cart' },
    { title: 'PriceCheck', icon: DollarSign, path: '/PriceCheck' },
    { title: 'ShoppingList', icon: ClipboardList, path: '/ShoppingList' },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-4 transition-colors duration-200`}>
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Building className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'} hidden sm:inline`}>Urban Haven</span>
          </div>
          <h1 className={`text-xl sm:text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Urban View</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-600'} hover:bg-opacity-80 transition-colors duration-200`}
          >
            {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-grow container mx-auto px-4 py-8 transition-colors duration-200 ${darkMode ? 'text-white' : ''}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className={`flex flex-col items-center justify-center p-4 sm:p-6 ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-white hover:bg-gray-50'
              } rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <item.icon className={`h-8 sm:h-12 w-8 sm:w-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-4`} />
              <span className={`text-base sm:text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {item.title}
              </span>
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-800 text-white'} py-6 sm:py-8`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4">About Urban Haven</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-300'}`}>
                Your one-stop solution for urban shopping needs.
              </p>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">Home</a></li>
                <li><a href="/FindProduct" className="text-gray-300 hover:text-white transition-colors duration-200">Products</a></li>
                <li><a href="/Contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">Email: info@urbanhaven.com</p>
              <p className="text-gray-300">Phone: (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-300">&copy; 2025 Urban Haven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;