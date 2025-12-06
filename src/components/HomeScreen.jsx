// components/HomeScreen.jsx
import React from "react";

export const HomeScreen = ({ setScreen }) => {
  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Встроенный стиль для шрифта Poppins */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
        `}
      </style>
      
      {/* ТОЛЬКО 2 элемента: правый верхний и левый нижний углы */}
      
      {/* ПРАВЫЙ ВЕРХНИЙ УГОЛ */}
      <div className="absolute top-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 20% 20%, #AE00FF 0%, #9D00E6 15%, #8C00CC 30%, rgba(140, 0, 204, 0.7) 45%, rgba(140, 0, 204, 0.4) 60%, rgba(140, 0, 204, 0.2) 75%, transparent 90%)',
          filter: 'blur(45px)',
          opacity: 0.85
        }}
      />
      
      {/* ЛЕВЫЙ НИЖНИЙ УГОЛ */}
      <div className="absolute bottom-[-70px] left-[-70px] w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 80% 80%, #AE00FF 0%, #A300F0 20%, #9800E0 40%, rgba(152, 0, 224, 0.8) 55%, rgba(152, 0, 224, 0.5) 70%, rgba(152, 0, 224, 0.3) 85%, transparent 100%)',
          filter: 'blur(40px)',
          opacity: 0.8
        }}
      />
      
      {/* Основной контент */}
      <div className="flex flex-col items-center z-20 relative">
        
        {/* Заголовок EasyGO! - БОЛЬШЕ */}
        <div 
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: '88px', // Увеличил с 72px до 88px
            lineHeight: '0.8',
            letterSpacing: '-3px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '50px' // Уменьшил отступ снизу
          }}
        >
          <span style={{ color: '#000000' }}>Easy</span>
          <span style={{ color: '#AE00FF' }}>GO!</span>
        </div>
        
        {/* Кнопка - БОЛЬШЕ */}
        <div>
          <button 
            onClick={() => setScreen("main")}
            className="px-14 py-4 text-white font-semibold rounded-full hover:opacity-90 transition duration-200 active:scale-[0.98]"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '16px', // Увеличил с 13px до 16px
              fontWeight: 600,
              backgroundColor: '#2C2931',
              color: '#FFFFFF',
              border: 'none',
              boxShadow: '0px 8px 25px rgba(44, 41, 49, 0.3)',
              letterSpacing: '0.4px',
              minWidth: '280px'
            }}
          >
            Войти с помощью TYNDYK
          </button>
        </div>
        
      </div>
      
      {/* Версия в самом низу */}
      <div className="absolute bottom-6">
        <div 
          className="text-[10px] tracking-wider"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 300,
            color: '#888888',
            letterSpacing: '1px',
            opacity: 0.7
          }}
        >
          v0.0.1
        </div>
      </div>
      
    </div>
  );
};