// components/EasyGOMockup.jsx
import React, { useState, useEffect, useRef } from "react";

export default function EasyGOMockup({ setScreen }) {
  const [currentTime, setCurrentTime] = useState("");
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartPos({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    
    setPosition({
      x: touch.clientX - startPos.x,
      y: touch.clientY - startPos.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="h-full bg-white flex flex-col relative overflow-hidden">
      {/* КАРТА НА ВЕСЬ ЭКРАН КАК ФОН */}
      <div className="absolute inset-0">
        {/* Контейнер карты */}
        <div 
          ref={mapRef}
          className={`w-full h-full relative overflow-hidden ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Стилизованная карта с трансформациями */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400"
            style={{
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              transition: isDragging ? 'none' : 'transform 0.1s ease',
              minWidth: '200%',
              minHeight: '200%'
            }}
          >
            {/* Дороги - сетка */}
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Горизонтальные дороги */}
              <div className="absolute top-1/4 left-0 right-0 h-3 bg-gray-600 transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-600 transform -translate-y-1/2"></div>
              <div className="absolute top-3/4 left-0 right-0 h-3 bg-gray-600 transform -translate-y-1/2"></div>
              
              {/* Вертикальные дороги */}
              <div className="absolute left-1/4 top-0 bottom-0 w-3 bg-gray-600 transform -translate-x-1/2"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-gray-600 transform -translate-x-1/2"></div>
              <div className="absolute left-3/4 top-0 bottom-0 w-3 bg-gray-600 transform -translate-x-1/2"></div>
            </div>
            
            {/* Здания */}
            <div className="absolute top-1/4 left-1/4 w-20 h-28 bg-gray-700 rounded-lg transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/3 right-1/3 w-24 h-32 bg-gray-800 rounded-lg transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-1/4 left-1/3 w-28 h-36 bg-gray-900 rounded-lg transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-1/3 right-1/4 w-16 h-24 bg-gray-700 rounded-lg transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-2/3 left-1/5 w-22 h-26 bg-gray-800 rounded-lg transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/5 right-1/5 w-26 h-30 bg-gray-900 rounded-lg transform -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Парки/зеленые зоны */}
            <div className="absolute top-2/5 left-2/5 w-40 h-40 bg-green-500 rounded-xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-1/5 right-2/5 w-36 h-36 bg-green-500 rounded-xl transform -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Текущее местоположение пользователя */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <div className="w-12 h-12 bg-purple-600 rounded-full border-4 border-white shadow-xl"></div>
                <div className="absolute inset-0 w-12 h-12 bg-purple-600 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>

            {/* Маркеры машин такси */}
            <div className="absolute top-2/5 left-2/5 w-10 h-10 bg-yellow-400 rounded-full border-3 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-3/5 right-2/5 w-10 h-10 bg-yellow-400 rounded-full border-3 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-1/3 left-2/3 w-10 h-10 bg-yellow-400 rounded-full border-3 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/3 right-1/4 w-10 h-10 bg-yellow-400 rounded-full border-3 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-2/5 left-1/4 w-10 h-10 bg-yellow-400 rounded-full border-3 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </div>

      {/* Контент поверх карты */}
      <div className="relative z-10 bg-transparent flex-shrink-0">
        {/* Status Bar */}
        <div className="pt-2 px-4 text-center">
          <div className="text-black font-medium">{currentTime}</div>
        </div>

        {/* Header с текстовым логотипом */}
        <header className="px-6 pt-2">
          {/* Увеличенный логотип с градиентным Go! */}
          <div 
            className="font-bold notranslate"
            style={{
              width: '350px',
              height: '60px',
              fontSize: '48px',
              lineHeight: '60px'
            }}
          >
            Easy<span 
              className="font-bold"
              style={{
                background: 'linear-gradient(90deg, #AE00FF 0%, #D06CFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Go!
            </span>
          </div>

          {/* Promo Banner с градиентом */}
          <div 
            className="mt-4 text-white p-4"
            style={{ 
              width: '189px', 
              height: '84px', 
              marginLeft: '-24px',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderTopRightRadius: '16px',
              borderBottomRightRadius: '16px',
              background: 'linear-gradient(90deg, #AE00FF 0%, #D06CFF 100%)'
            }}
          >
            <div className="h-full flex flex-col justify-center">
              <div className="font-semibold text-sm">Скидка 20% на</div>
              <div className="font-semibold text-sm">первую поездку</div>
              <div className="mt-1 bg-black text-white px-2 py-1 rounded-full text-xs font-semibold text-center">
                EASYGO25
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Кнопка "Куда едем?" с новыми размерами и цветом */}
      <div 
        className="absolute left-1/2 transform -translate-x-1/2 z-10 flex-shrink-0" 
        style={{ bottom: "121px" }}
      >
        <button
          onClick={() => setScreen("destination")}
          className="text-white font-semibold hover:opacity-90 active:opacity-80 transition shadow-lg flex items-center gap-4"
          style={{
            width: "213px",
            height: "60px",
            backgroundColor: "#AE00FF",
            borderRadius: "30px",
            paddingLeft: "16px",
            fontSize: "18px"
          }}
        >
          {/* Круг с иконкой */}
          <div 
            className="flex items-center justify-center" 
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#A100F5",
              borderRadius: "50%",
            }}
          >
            {/* Иконка лупы */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              fill="white" 
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5L20.5 19l-5-5zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14z"/>
            </svg>
          </div>

          {/* Текст */}
          <span>Куда едем?</span>
        </button>
      </div>
    </div>
  );
}