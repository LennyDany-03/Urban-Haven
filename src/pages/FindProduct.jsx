import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, ShoppingCart, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Milk from '../assets/Milk.jpg';
import Banana from '../assets/Banana.jpg';
import Bread from '../assets/Bread.jpg';
import Breast from '../assets/Breast.jpg';

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [imageLoadError, setImageLoadError] = useState({});
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  // Load dark mode from localStorage on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const products = [
    { 
      id: 1, 
      name: 'Fresh Milk', 
      price: 2.99, 
      category: 'dairy', 
      location: 'Aisle 1', 
      stock: 15,
      image: Milk
    },
    { 
      id: 2, 
      name: 'Whole Wheat Bread', 
      price: 3.49, 
      category: 'bakery', 
      location: 'Aisle 2', 
      stock: 8,
      image: Bread
    },
    { 
      id: 3, 
      name: 'Organic Bananas', 
      price: 1.99, 
      category: 'produce', 
      location: 'Aisle 3', 
      stock: 25,
      image: Banana
    },
    { 
      id: 4, 
      name: 'Chicken Breast', 
      price: 8.99, 
      category: 'meat', 
      location: 'Aisle 4', 
      stock: 12,
      image: Breast
    },
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'produce', name: 'Produce' },
    { id: 'meat', name: 'Meat' }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleImageError = (productId) => {
    setImageLoadError(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToCart = (product) => {
    const cartProduct = {
      ...product,
      quantity: 1
    };
    addToCart(cartProduct);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-4 sm:p-6 transition-colors duration-200`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className={`p-2 rounded-full ${
              darkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-200 text-gray-800'
            } transition-colors duration-200`}
            aria-label="Back to home"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Find Products
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Cart Icon with Count */}
          <button 
            onClick={() => navigate('/Cart')}
            className={`relative p-2 rounded-full ${
              darkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-200 text-gray-800'
            } transition-colors duration-200`}
          >
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${
              darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-200 text-gray-600'
            } hover:bg-opacity-80 transition-colors duration-200`}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="relative">
          <Search 
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} 
            size={20}
          />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={`w-full p-4 pl-12 rounded-lg border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className={`${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white'
            } p-4 rounded-lg shadow-md transition-colors duration-200`}
          >
            {/* Product Image */}
            <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={imageLoadError[product.id] ? '/api/placeholder/200/200' : product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg transition-opacity duration-200"
                onError={() => handleImageError(product.id)}
                loading="lazy"
              />
            </div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Location: {product.location}
                </p>
              </div>
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className={`text-sm ${
                product.stock > 10 
                  ? 'text-green-500' 
                  : 'text-orange-500'
              }`}>
                {product.stock} in stock
              </span>
              <button 
                onClick={() => handleAddToCart(product)}
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors duration-200"
                aria-label="Add to cart"
                disabled={product.stock === 0}
              >
                <ShoppingCart size={16} />
                <span className="hidden sm:inline">Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-8`}>
          No products found. Try adjusting your search.
        </div>
      )}
    </div>
  );
};

export default ProductSearch;