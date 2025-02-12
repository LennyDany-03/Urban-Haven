import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-4 sm:p-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className={`p-2 rounded-full ${
              darkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-200 text-gray-800'
            }`}
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Shopping Cart
          </h1>
        </div>
      </div>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your cart is empty
          </p>
          <button
            onClick={() => navigate('/FindProduct')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div 
                key={item.id}
                className={`${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-lg shadow-md p-4`}
              >
                <div className="flex items-center gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/100?text=Product';
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {item.name}
                    </h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      ${item.price.toFixed(2)}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Location: {item.location}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className={`p-1 rounded-full ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Minus size={20} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={`p-1 rounded-full ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  {/* Total and Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 p-1 rounded-full"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <div className="flex justify-between items-center mb-4">
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Total:
              </span>
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                ${getCartTotal().toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;