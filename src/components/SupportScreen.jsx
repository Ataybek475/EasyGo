// components/SupportScreen.jsx
import React from "react";

export const SupportScreen = ({ setScreen }) => {
  return (
    <div className="h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-6">Поддержка</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-2">📞 Телефон поддержки</h2>
          <p className="text-lg">+996 555 123 456</p>
          <p className="text-sm text-gray-600 mt-1">Круглосуточно</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-2">💬 Онлайн-чат</h2>
          <p className="text-gray-600 mb-3">Быстрые ответы в приложении</p>
          <button className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg">
            Начать чат
          </button>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-2">❓ Частые вопросы</h2>
          <div className="space-y-2">
            <div className="p-3 bg-white rounded-lg border">
              <p className="font-medium">Как отменить поездку?</p>
            </div>
            <div className="p-3 bg-white rounded-lg border">
              <p className="font-medium">Проблемы с оплатой</p>
            </div>
            <div className="p-3 bg-white rounded-lg border">
              <p className="font-medium">Потерянные вещи в такси</p>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => setScreen("home")}
        className="mt-8 w-full py-4 bg-purple-600 text-white font-semibold rounded-full text-lg"
      >
        Вернуться на карту
      </button>
    </div>
  );
};