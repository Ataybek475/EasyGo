import React, { useState, useEffect } from "react";

export const ProfileScreen = ({ setScreen }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white pb-20">
      {/* Градиент сверху */}
      <div className="h-60 w-full bg-gradient-to-b from-[#C834FF] to-white pt-4 px-6 relative z-0 flex flex-col">
        {/* Время сверху */}
        <div className="text-white font-semibold text-lg text-center">{currentTime}</div>

        {/* Аватар + данные под временем */}
        <div className="mt-4 flex items-center space-x-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow">
            <img
              src="/assets/ProfileIcon.png"
              alt="avatar"
              className="w-12 h-12 opacity-70"
            />
          </div>

          <div className="text-left">
            <h1 className="text-white text-2xl font-bold">Пользователь</h1>

            <div className="bg-white rounded-lg px-3 py-1 mt-2 text-sm font-medium inline-block">
              +996 000000000
            </div>

            <div className="bg-black text-white w-fit px-3 py-1 rounded-lg mt-2 text-sm font-medium inline-block ml-2">
              Рейтинг&nbsp;&nbsp;5/5
            </div>
          </div>
        </div>
      </div>

      {/* БЛОКИ МЕНЮ */}
      <div className="px-5 -mt-10 space-y-3 relative z-10">
        {/* ГРУППА 1 */}
        <div className="space-y-2 bg-[#1D1B20] rounded-2xl overflow-hidden shadow-sm">
          <MenuCard icon="1.png" title="Способы оплаты" />
          <MenuCard icon="promo.png" title="Ввести промокод" />
        </div>

        {/* ГРУППА 2 */}
        <div className="space-y-2 bg-[#1D1B20] rounded-2xl overflow-hidden shadow-sm">
          <MenuCard icon="history.png" title="История поездок" />
          <MenuCard icon="bell.png" title="Уведомления" />
          <MenuCard icon="map-pin.png" title="Мои адреса" />
        </div>

        {/* ГРУППА 3 */}
        <div className="space-y-2 bg-[#1D1B20] rounded-2xl overflow-hidden shadow-sm">
          <MenuCard icon="settings.png" title="Настройки" />
          <MenuCard icon="info.png" title="Информация" />
        </div>
      </div>
    </div>
  );
};

/* Компонент карточки */
function MenuCard({ icon, title }) {
  return (
    <div className="bg-[#1D1B20] text-white py-3 px-4 flex justify-between items-center border-b border-[#2D2B30] last:border-b-0">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-[#2D2B30] rounded-lg flex items-center justify-center">
          <img src={`/assets/${icon}`} alt={title} className="w-4 h-4 opacity-90" />
        </div>
        <span className="text-base font-medium">{title}</span>
      </div>

      <span className="text-white text-lg font-semibold">›</span>
    </div>
  );
}