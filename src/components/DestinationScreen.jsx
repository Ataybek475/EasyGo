import React, { useState, useEffect } from "react";

export const DestinationScreen = ({ setScreen }) => {
  const [currentTime, setCurrentTime] = useState("");

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

  return (
    <div className="min-h-screen bg-white flex flex-col pb-20">
      {/* Status Bar */}
      <div className="pt-2 px-4 text-center">
        <div className="text-black font-medium">{currentTime}</div>
      </div>

      {/* Header с текстовым логотипом */}
      <div className="px-6 pt-2">
        <button 
          onClick={() => setScreen("home")}
          className="text-black text-lg mb-4"
        >
          ←
        </button>
        
        {/* Логотип с фиолетовым Go! */}
        <div className="text-3xl font-bold text-black notranslate">
          Easy<span className="text-purple-600">Go!</span>
        </div>

        {/* Promo Banner */}
        <div className="mt-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-4 flex justify-between items-center">
          <div>
            <div className="font-semibold">Скидка 20% на</div>
            <div className="font-semibold">первую поездку</div>
          </div>
          <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
            EASYGO25
          </div>
        </div>
      </div>

      {/* Destination Form */}
      <div className="flex-1 px-6 mt-6">
        <div className="space-y-6">
          {/* Откуда */}
          <div>
            <h2 className="font-bold mb-3 text-gray-700">Откуда</h2>
            <div className="flex items-center border border-gray-300 rounded-2xl p-4">
              <span className="mr-3">📍</span>
              <span>Ваше местоположение</span>
            </div>
          </div>

          {/* Куда */}
          <div>
            <h2 className="font-bold mb-3 text-gray-700">Куда</h2>
            <div className="flex items-center border border-gray-300 rounded-2xl p-4">
              <span className="mr-3">📍</span>
              <span>Выбрать на карте</span>
            </div>
          </div>

          {/* Способ оплаты */}
          <div className="flex items-center bg-black text-white rounded-2xl p-4">
            <span className="mr-3">💳</span>
            <div>
              <p className="font-bold">Способ оплаты</p>
              <p className="text-sm opacity-70">Карта</p>
            </div>
          </div>

          {/* Search Button */}
          <button className="w-full bg-purple-600 text-white rounded-2xl py-4 text-lg font-bold">
            🚗 Искать машину
          </button>
        </div>
      </div>
    </div>
  );
};