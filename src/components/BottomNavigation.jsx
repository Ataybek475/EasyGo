// components/BottomNavigation.jsx
import React, { useState, useEffect, useRef } from 'react';

export const BottomNavigation = ({ currentScreen, setScreen }) => {
  const navItems = [
    {
      key: 'support',
      icon: 'support',
      label: 'Поддержка',
      screen: 'support',
      iconPaths: {
        normal: '/assets/SupportEasyGo!.png',  // ИСПРАВЛЕНО
        active: '/assets/SupportEasyGo!2.png'  // ИСПРАВЛЕНО
      }
    },
    {
      key: 'home',
      icon: 'home',
      label: 'Карта',
      screen: 'main', // Важно: здесь 'main'
      iconPaths: {
        normal: '/assets/MapEasyGo!.png',  // ИСПРАВЛЕНО
        active: '/assets/MapEasyGo!2.png'  // ИСПРАВЛЕНО
      }
    },
    {
      key: 'profile',
      icon: 'profile',
      label: 'Профиль',
      screen: 'profile',
      iconPaths: {
        normal: '/assets/ProfileEasyGo!.png',  // ИСПРАВЛЕНО
        active: '/assets/ProfileEasyGo!2.png'  // ИСПРАВЛЕНО
      }
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
          borderRadius: '33.5px',
          backgroundColor: '#CCCCCC',
          transition: 'left 0.3s ease-in-out'
        });
      }
    }
  };

  const getIconPath = (item, isActive) => {
    return isActive ? item.iconPaths.active : item.iconPaths.normal;
  };

  return (
    <div className="relative">
      {/* Фон с размытием */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-20 backdrop-blur-sm rounded-[40px] -mt-2"
        style={{ width: '352px', height: '77px' }}
      ></div>
      
      {/* Навигация */}
      <nav 
        ref={navRef}
        className="bg-white border-t border-gray-200 px-10 py-4 rounded-[40px] shadow-lg relative z-20 overflow-hidden"
        style={{ width: '352px', height: '77px' }}
      >
        {/* Активный индикатор */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 z-0 transition-all duration-300 ease-in-out"
          style={indicatorStyle}
        />
        
        <div className="flex justify-between items-center h-full relative z-10">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            
            return (
              <button
                key={item.key}
                onClick={() => setScreen(item.screen)}
                className={`flex flex-col items-center gap-2 transition-all duration-300 ease-in-out relative z-10`}
              >
                {/* Контейнер для иконки с анимацией */}
                <div className={`transition-all duration-300 ease-in-out ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}>
                  <div className="w-6 h-6 flex items-center justify-center relative">
                    {/* Иконка */}
                    <img 
                      src={getIconPath(item, isActive)} 
                      alt={item.label}
                      className={`w-5 h-5 object-contain transition-all duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-80'
                      }`}
                    />
                    
                    {/* Анимация пульсации для активной иконки */}
                    {isActive && (
                      <div className="absolute inset-0 animate-ping bg-purple-400 opacity-20 rounded-full"></div>
                    )}
                  </div>
                </div>
                
                {/* Текст - всегда черный */}
                <span className={`text-xs transition-all duration-300 relative z-10 text-black ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-90'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};