import React, { useState } from 'react';
import { Trash2, Minus, Plus, ArrowLeft, X } from 'lucide-react';

const Cart = ({ darkMode = false }) => {
  // Cart items state with quantity
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: 'Fresh Milk', 
      price: 2.99, 
      quantity: 2,
      imageSize: { width: 200, height: 200 }
    },
    { 
      id: 3, 
      name: 'Organic Bananas', 
      price: 1.99, 
      quantity: 1,
      imageSize: { width: 200, height: 200 }
    }
  ]);

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Handle quantity changes
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  // Handle back navigation
  const handleBack = () => {
    window.location.href = '/FindProduct';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-4 sm:p-6 transition-colors duration-200`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack}
            className={`p-2 rounded-full ${
              darkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-200 text-gray-800'
            } transition-colors duration-200`}
            aria-label="Back to products"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Shopping Cart
          </h1>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-8">
        {cartItems.map(item => (
          <div 
            key={item.id}
            className={`${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg shadow-md p-4 transition-colors duration-200`}
          >
            <div className="flex items-center gap-4">
              {/* Product Image */}
              <img
                src={`/api/placeholder/${item.imageSize.width}/${item.imageSize.height}`}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {item.name}
                    </h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className={`p-2 rounded-full ${
                      darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                    } transition-colors duration-200`}
                    aria-label="Remove item"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className={`p-1 rounded-full ${
                      darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                    } transition-colors duration-200`}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={`p-1 rounded-full ${
                      darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                    } transition-colors duration-200`}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty Cart Message */}
      {cartItems.length === 0 && (
        <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-8`}>
          Your cart is empty. Add some products to get started.
        </div>
      )}

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-md p-4 transition-colors duration-200`}>
          <div className="flex justify-between items-center mb-4">
            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Total ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
            </span>
            <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <button 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;