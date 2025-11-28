// components/BottomNavigation.jsx
import React, { useState, useEffect, useRef } from 'react';

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

  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef(null);

  useEffect(() => {
    updateIndicatorPosition();
  }, [currentScreen]);

  const updateIndicatorPosition = () => {
    if (navRef.current) {
      const navElement = navRef.current;
      const buttons = navElement.querySelectorAll('button');
      const activeIndex = navItems.findIndex(item => item.screen === currentScreen);
      
      if (buttons[activeIndex]) {
        const activeButton = buttons[activeIndex];
        const buttonRect = activeButton.getBoundingClientRect();
        const navRect = navElement.getBoundingClientRect();
        
        setIndicatorStyle({
          left: buttonRect.left - navRect.left + (buttonRect.width - 100) / 2,
          width: '100px',
          height: '67px',
          borderRadius: '33.5px', // 50% от высоты для максимального закругления
          backgroundColor: '#CCCCCC',
          transition: 'left 0.3s ease-in-out'
        });
      }
    }
  };

  return (
    <div className="relative">
      {/* Черное размытие снизу */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-20 backdrop-blur-sm rounded-[40px] -mt-2"
        style={{ 
          width: '352px', 
          height: '77px'
        }}
      ></div>
      
      {/* Навигация */}
      <nav 
        ref={navRef}
        className="bg-white border-t border-gray-200 px-6 py-4 rounded-[40px] shadow-lg relative z-20 overflow-hidden"
        style={{ 
          width: '352px', 
          height: '77px'
        }}
      >
        {/* Подвижный фон-индикатор */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 z-0"
          style={indicatorStyle}
        />
        
        <div className="flex justify-around items-center h-full relative z-10">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setScreen(item.screen)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ease-in-out relative z-10 ${
                currentScreen === item.screen 
                  ? 'text-purple-600 font-semibold' 
                  : 'text-gray-600 hover:text-purple-500'
              }`}
            >
              <div className={`transition-all duration-300 ease-in-out ${
                currentScreen === item.screen ? 'scale-110' : 'scale-100'
              }`}>
                <img 
                  src={item.icon} 
                  alt={item.label} 
                  className="w-6 h-6 object-contain relative z-10"
                />
              </div>
              <span className="text-xs transition-colors duration-300 relative z-10">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};  