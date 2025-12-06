// components/SupportScreen.jsx
import React, { useState } from "react";

export const SupportScreen = ({ setScreen }) => {
  const [message, setMessage] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const quickQuestions = [
    "Проблема с водителем",
    "Как работает рейтинг?",
    "Как сообщение"
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Отправлено сообщение:", message);
      setMessage("");
      setSelectedQuestion(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setMessage(
      question === "Как сообщение"
        ? "Я хочу написать сообщение: "
        : `${question}: `
    );
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white flex flex-col relative">

      {/* ГРАДИЕНТ */}
      <div
        className="h-60 w-full pt-12 px-6"
        style={{
          background: "linear-gradient(180deg, #C834FF 0%, rgba(200,52,255,0.08) 100%)"
        }}
      >
        <h1 className="text-white text-4xl font-bold mb-2">Поддержка</h1>
        <div className="text-white text-xl font-semibold opacity-90">
          EasyGO! Поддержка
        </div>
      </div>

      {/* СООБЩЕНИЕ */}
      <div className="px-6 -mt-10">
        <div
          className="bg-[#1B1924] text-white p-4 rounded-2xl text-lg"
          style={{
            borderTopLeftRadius: 0,
            textShadow: "0 1px 3px rgba(0,0,0,0.6)"
          }}
        >
          Здравствуйте, чем могу помочь?
        </div>
      </div>

      {/* ПРОСТРАНСТВО ДЛЯ КОНТЕНТА */}
      <div className="flex-1"></div>

      {/* БЫСТРЫЕ КНОПКИ — ФИКСИРОВАННЫЕ НАД ПОЛЕМ ВВОДА */}
      <div className="w-full max-w-md mx-auto px-4 py-3 fixed bottom-32 left-1/2 -translate-x-1/2 z-10 bg-transparent">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(question)}
              className="whitespace-nowrap bg-black py-2 px-4 rounded-xl text-white text-sm font-medium hover:bg-gray-800 active:scale-95 transition-all flex-shrink-0"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* ПОЛЕ ВВОДА — НАД НАВИГАЦИЕЙ */}
      <div className="w-full max-w-md mx-auto px-4 py-4 fixed bottom-20 left-1/2 -translate-x-1/2 bg-transparent z-20">
        <div
          className="bg-gray-100 rounded-2xl px-4 flex items-center justify-between shadow-lg"
          style={{ height: "44px", borderRadius: "16px" }}
        >
          <input
            type="text"
            placeholder="Введите ваше сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-transparent w-full outline-none text-gray-800 text-base placeholder:text-gray-500 px-2"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`w-8 h-8 rounded-full flex items-center justify-center ml-1 transition-all ${
              message.trim()
                ? "bg-purple-600 text-white active:scale-95 hover:bg-purple-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <span className="text-sm">➤</span>
          </button>
        </div>
      </div>
    </div>
  );
};