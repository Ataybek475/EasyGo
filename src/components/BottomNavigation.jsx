// components/BottomNavigation.jsx
import React from 'react';

export const BottomNavigation = ({ currentScreen, setScreen }) => {
  const navItems = [
    {
      key: 'support',
      icon: '/src/assets/SupportEasyGo!.png',
      label: 'Поддержка',
      screen: 'support'
    },
    {
      key: 'home',
      icon: '/src/assets/MapEasyGo!.png',
      label: 'Карта',
      screen: 'home'
    },
    {
      key: 'profile',
      icon: '/src/assets/ProfileEasyGo!.png',
      label: 'Профиль',
      screen: 'profile'
    }
  ];

  return (
    <div className="relative">
      {/* Черное размытие снизу с идеальными закруглениями */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-black bg-opacity-20 backdrop-blur-sm rounded-[40px] -mt-2"></div>
      
      {/* Навигация с идеальными закруглениями */}
      <nav className="bg-white border-t border-gray-200 px-6 py-4 rounded-[40px] shadow-lg relative z-20">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setScreen(item.screen)}
              className={`flex flex-col items-center gap-1 ${
                currentScreen === item.screen ? 'text-purple-600 font-semibold' : 'text-gray-600'
              }`}
            >
              <img 
                src={item.icon} 
                alt={item.label} 
                className="w-6 h-6 object-contain"
              />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};