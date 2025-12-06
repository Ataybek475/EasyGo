// components/DestinationScreen.jsx
import React, { useState, useEffect } from "react";

// ИКОНКА МАШИНЫ
const CarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="9" width="14" height="6" rx="2" stroke="white" strokeWidth="2"/>
    <path d="M7 9L9 6H15L17 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="8" cy="16" r="1.5" fill="white"/>
    <circle cx="16" cy="16" r="1.5" fill="white"/>
  </svg>
);

// Иконка карты
const CardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 7.2L21 16.8C21 18.0065 20.4732 19.165 19.5355 20.0039C18.5979 20.8427 17.3377 21.3195 16 21.3195H8C6.66231 21.3195 5.40214 20.8427 4.46447 20.0039C3.5268 19.165 3 18.0065 3 16.8V7.2C3 5.99351 3.5268 4.83501 4.46447 3.99613C5.40214 3.15725 6.66231 2.68048 8 2.68048H16C17.3377 2.68048 18.5979 3.15725 19.5355 3.99613C20.4732 4.83501 21 5.99351 21 7.2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 8H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="7" y="14" width="6" height="3" rx="1.5" fill="white"/>
  </svg>
);

// Иконка геолокации/точки
const LocationCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="white" stroke="#9C27B0" strokeWidth="2.5"/>
    <circle cx="12" cy="12" r="5" fill="#9C27B0"/>
  </svg>
);

// Иконка пина/метки
const PinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C16.4183 2 20 5.58172 20 10C20 15.2559 14.5458 21.5714 12.8392 23.3642C12.3906 23.8344 11.6094 23.8344 11.1608 23.3642C9.45421 21.5714 4 15.2559 4 10C4 5.58172 7.58172 2 12 2ZM12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7Z" fill="#9C27B0"/>
  </svg>
);

// Компонент, отображаемый в модальном окне
export const DestinationScreen = ({ onClose, isOpen }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Анимация появления
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSearchCar = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Если компонент не открыт, не рендерим ничего
  if (!isOpen && !isVisible) {
    return null;
  }

  return (
    <>
      {/* Затемнение фона - всегда рендерится, если компонент открыт */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
        style={{
          display: isOpen || isVisible ? 'block' : 'none'
        }}
        onClick={handleClose}
      />
      
      {/* Модальное окно с фиксированными размерами */}
      <div 
        className={`fixed left-1/2 transform -translate-x-1/2 bottom-0 bg-white font-sans flex flex-col z-50 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ 
          width: '402px',
          height: '514px',
          borderTopLeftRadius: '55px',
          borderTopRightRadius: '55px',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.15)',
          display: isOpen || isVisible ? 'flex' : 'none'
        }}
      >
        {/* 1. Handlebar (Ручка для перетаскивания) */}
        <div className="text-center py-4 flex-shrink-0">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto" />
        </div>

        {/* 2. Destination Form (Форма адресов и оплаты) */}
        <div className="flex-1 px-6 space-y-4 overflow-y-auto pb-6" style={{ paddingTop: '0' }}>
          
          {/* ОТКУДА (Ваше местоположение) */}
          <div>
            <h2 className="font-bold mb-2 text-base ml-2" style={{ color: '#1D1B20' }}>Откуда</h2>
            <div className="flex items-center rounded-full p-4" style={{ backgroundColor: '#D9D9D9', height: '60px' }}>
              <div className="mr-3 flex-shrink-0">
                <LocationCircleIcon />
              </div>
              <span className="font-medium" style={{ color: '#929292' }}>Ваше местоположение</span>
            </div>
          </div>

          {/* КУДА (Выбрать на карте) */}
          <div>
            <h2 className="font-bold mb-2 text-base ml-2" style={{ color: '#1D1B20' }}>Куда</h2>
            <div className="flex items-center rounded-full p-4" style={{ backgroundColor: '#D9D9D9', height: '60px' }}>
              <div className="mr-3 flex-shrink-0">
                <PinIcon />
              </div>
              <span className="font-medium" style={{ color: '#929292' }}>Выбрать на карте</span>
            </div>
          </div>

          {/* Способ оплаты - больше чем сверху, центрирован */}
          <div className="flex justify-center">
            <button 
              onClick={() => console.log("Payment method clicked")} 
              className="text-left transition duration-150 transform active:scale-[0.99]"
              style={{ width: '290px', height: '75px' }}
            >
              <div className="flex items-center bg-gray-800 text-white rounded-full h-full px-4 shadow-lg">
                <div className="mr-3 flex-shrink-0">
                  <CardIcon />
                </div>
                <div>
                  <p className="font-bold text-base">Способ оплаты</p>
                  <p className="text-sm opacity-70 mt-0">Карта</p>
                </div>
              </div>
            </button>
          </div>
          
          {/* Search Button (Фиолетовый градиент) - больше чем сверху, центрирован */}
          <div className="flex justify-center mt-3">
            <button 
              onClick={handleSearchCar}
              className="text-left rounded-full text-lg font-bold shadow-lg transition duration-150 transform active:scale-[0.99]"
              style={{
                background: 'linear-gradient(90deg, #9C27B0 0%, #E040FB 100%)', 
                color: 'white',
                width: '290px',
                height: '75px'
              }}
            >
              <div className="flex items-center h-full pl-4">
                <div className="mr-3">
                  <CarIcon />
                </div>
                Искать машину
              </div>
            </button>
          </div>
        </div>
        
        {/* Безопасная зона */}
        <div className="h-4 bg-white"></div>
      </div>
    </>
  );
};