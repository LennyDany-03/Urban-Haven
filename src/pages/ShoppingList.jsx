// src/pages/ShoppingList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Check, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ShoppingList = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('shoppingList');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'groceries' // Default category
  });
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { cartItems } = useCart();

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items]);

  const categories = [
    { id: 'groceries', name: 'Groceries' },
    { id: 'household', name: 'Household' },
    { id: 'personal', name: 'Personal Care' },
    { id: 'other', name: 'Other' }
  ];

  const addItem = (e) => {
    e.preventDefault();
    if (newItem.name.trim()) {
      const item = {
        id: Date.now(),
        name: newItem.name.trim(),
        category: newItem.category,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setItems([item, ...items]);
      setNewItem({ name: '', category: newItem.category }); // Keep the same category for next item
    }
  };

  const toggleComplete = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item =>
    selectedFilter === 'all' ? true : item.category === selectedFilter
  );

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
            Shopping List
          </h1>
        </div>
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
      </div>

      {/* Add Item Form */}
      <form onSubmit={addItem} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Product Name Input */}
          <div className="sm:col-span-2">
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Enter product name..."
              className={`w-full p-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
          
          {/* Category Select */}
          <div className="flex gap-2">
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className={`flex-1 p-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>
      </form>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200 ${
            selectedFilter === 'all'
              ? 'bg-blue-600 text-white'
              : darkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          All Items
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedFilter(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200 ${
              selectedFilter === category.id
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

      {/* Shopping List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your shopping list is empty
          </div>
        ) : (
          filteredItems.map(item => (
            <div
              key={item.id}
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } p-4 rounded-lg shadow-md transition-colors duration-200 ${
                item.completed ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleComplete(item.id)}
                    className={`p-1 rounded-full ${
                      item.completed
                        ? 'bg-green-500 text-white'
                        : darkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-600'
                    } hover:opacity-80 transition-colors duration-200`}
                  >
                    <Check size={18} />
                  </button>
                  <div>
                    <span className={`font-medium ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    } ${item.completed ? 'line-through' : ''}`}>
                      {item.name}
                    </span>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {categories.find(cat => cat.id === item.category)?.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShoppingList;