// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Map, 
  User, 
  ShoppingCart, 
  DollarSign,
  ClipboardList,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';

const Home = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Find Products', icon: Search, path: '/FindProduct' },
    { title: 'StoreMap', icon: Map, path: '/StoreMap' },
    { title: 'Account', icon: User, path: '/Account' },
    { title: 'Current Cart', icon: ShoppingCart, path: '/Cart' },
    { title: 'PriceCheck', icon: DollarSign, path: '/PriceCheck' },
    { title: 'ShoppingList', icon: ClipboardList, path: '/ShoppingList' },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />

      {/* Main Content */}
      <main className={`flex-grow container mx-auto px-4 py-8 transition-colors duration-200 ${darkMode ? 'text-white' : ''}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
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
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-800 text-white'} py-6 sm:py-8`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4">About Urban Haven</h3>
              <p className="text-gray-300">
                Your one-stop solution for urban shopping needs.
              </p>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => navigate('/')} className="text-gray-300 hover:text-white transition-colors duration-200">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/FindProduct')} className="text-gray-300 hover:text-white transition-colors duration-200">
                    Products
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/Contact')} className="text-gray-300 hover:text-white transition-colors duration-200">
                    Contact
                  </button>
                </li>
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