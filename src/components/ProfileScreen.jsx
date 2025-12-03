// components/ProfileScreen.jsx
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

  const handleMenuClick = (menuTitle) => {
    console.log(`Клик по меню: ${menuTitle}`);
    switch(menuTitle) {
      case "Способы оплаты":
        alert("Переход к способам оплаты");
        break;
      case "Ввести промокод":
        alert("Открытие окна для ввода промокода");
        break;
      case "История поездок":
        alert("Переход к истории поездок");
        break;
      case "Уведомления":
        alert("Переход к уведомлениям");
        break;
      case "Мои адреса":
        alert("Переход к моим адресам");
        break;
      case "Настройки":
        alert("Переход к настройкам");
        break;
      case "Информация":
        alert("Переход к информации");
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="h-60 w-full bg-gradient-to-b from-[#C834FF] to-white pt-4 px-6 flex flex-col flex-shrink-0">
        <div className="text-white font-semibold text-lg text-center">{currentTime}</div>

        <div className="mt-4 flex items-center space-x-4">
          <div className="w-20 h-20 bg-[#1D1B20] rounded-full flex items-center justify-center shadow">
            <img
              src="/EasyGo/assets/ProfileIcon.png"
              alt="Аватар пользователя"
              style={{ width: '80px', height: '80px' }}
              className="opacity-70"
            />
          </div>

          <div className="text-left flex flex-col">
            <h1 className="text-white text-2xl font-bold">Пользователь</h1>

            <div className="flex flex-col gap-2 mt-2">
              <div 
                className="bg-white rounded-lg px-3 text-sm font-medium flex items-center justify-center"
                style={{ width: '180px', height: '25px' }}
              >
                +996 000000000
              </div>

              <div 
                className="bg-black text-white px-3 rounded-lg text-sm font-medium flex items-center justify-center"
                style={{ height: '25px' }}
              >
                Рейтинг&nbsp;&nbsp;5/5
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 -mt-10 space-y-3 overflow-y-auto pb-4">
        <div className="space-y-2 bg-[#1D1B20] rounded-2xl overflow-hidden shadow-sm">
          <MenuCard 
            icon="/EasyGo/assets/1.png" 
            title="Способы оплаты" 
            iconStyle={{ width: '22px', height: '22px' }}
            onClick={() => handleMenuClick("Способы оплаты")}
          />
          <MenuCard 
            icon="/EasyGo/assets/promo.png" 
            title="Ввести промокод" 
            iconStyle={{ width: '22px', height: '22px' }}
            onClick={() => handleMenuClick("Ввести промокод")}
          />
        </div>

        <div className="space-y-2 bg-[#1D1B20] rounded-2xl overflow-hidden shadow-sm">
          <MenuCard 
            icon="/EasyGo/assets/history.png" 
            title="История поездок" 
            iconStyle={{ width: '22px', height: '22px' }}
            onClick={() => handleMenuClick("История поездок")}
          />
          <MenuCard 
            icon="/EasyGo/assets/bell.png" 
            title="Уведомления" 
            iconStyle={{ width: '22px', height: '22px' }}
            onClick={() => handleMenuClick("Уведомления")}
          />
          <MenuCard 
            icon="/EasyGo/assets/map-pin.png" 
            title="Мои адреса" 
            iconStyle={{ width: '18px', height: '22px' }}
            onClick={() => handleMenuClick("Мои адреса")}
          />
        </div>

        <div className="space-y-2 bg-[#1D1B20] rounded-2xl overflow-hidden shadow-sm">
          <MenuCard 
            icon="/EasyGo/assets/settings.png" 
            title="Настройки" 
            iconStyle={{ width: '22px', height: '22px' }}
            onClick={() => handleMenuClick("Настройки")}
          />
          <MenuCard 
            icon="/EasyGo/assets/info.png" 
            title="Информация" 
            iconStyle={{ width: '22px', height: '22px' }}
            onClick={() => handleMenuClick("Информация")}
          />
        </div>
      </div>
    </div>
  );
};

function MenuCard({ icon, title, iconStyle, onClick }) {
  return (
    <div 
      className="bg-[#1D1B20] text-white py-3 px-4 flex justify-between items-center border-b border-[#2D2B30] last:border-b-0 active:bg-[#2D2B30] transition-colors duration-200 cursor-pointer hover:bg-[#2D2B30]"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-[#2D2B30] rounded-lg flex items-center justify-center">
          <img 
            src={icon} 
            alt={title} 
            className="opacity-90"
            style={iconStyle}
          />
        </div>
        <span className="text-base font-medium">{title}</span>
      </div>

      <span className="text-white text-lg font-semibold">›</span>
    </div>
  );
}