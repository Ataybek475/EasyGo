// App.jsx
import React, { useState, useEffect } from "react";
import EasyGOMockup from "./components/EasyGOMockup"; 
import { DestinationScreen } from "./components/DestinationScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { BottomNavigation } from "./components/BottomNavigation";

function App() {
  const [screen, setScreen] = useState("home");
  const [transition, setTransition] = useState("");
  const [navVisible, setNavVisible] = useState(false);
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [modalAnimation, setModalAnimation] = useState("");

  // Показать навигацию после загрузки
  useEffect(() => {
    setNavVisible(true);
  }, []);

  const handleSetScreen = (newScreen) => {
    // Если это экран назначения - открываем модальное окно
    if (newScreen === "destination") {
      setIsDestinationModalOpen(true);
      setTimeout(() => {
        setModalAnimation("slide-up");
      }, 10);
      return; 
    }
    
    // Анимация перехода для других экранов
    setTransition("fade-out");
    setTimeout(() => {
      setScreen(newScreen);
      setTransition("fade-in");
    }, 200);
  };

  const closeModal = () => {
    // Анимация закрытия модального окна
    setModalAnimation("slide-down");
    setTimeout(() => {
      setIsDestinationModalOpen(false);
      setModalAnimation("");
    }, 300);
  };

  return (
    <>
      {/* Встроенные стили для анимаций */}
      <style>
        {`
          .fade-out {
            opacity: 0;
            transition: opacity 0.2s ease-out;
          }
          .fade-in {
            opacity: 1;
            transition: opacity 0.2s ease-in;
          }
          .slide-up {
            transform: translateY(0);
            transition: transform 0.3s ease-out;
          }
          .slide-down {
            transform: translateY(100%);
            transition: transform 0.3s ease-in;
          }
          
          /* Дополнительные стили для улучшения UX */
          .modal-overlay {
            background-color: rgba(0, 0, 0, 0.5);
          }
          
          .bottom-nav-shadow {
            box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
      
      {/* Основной контейнер приложения */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-white relative">
        
        {/* Основной контент */}
        <div className={`min-h-screen ${transition}`}>
          {screen === "home" && <EasyGOMockup setScreen={handleSetScreen} />}
          {screen === "profile" && <ProfileScreen setScreen={handleSetScreen} />}
        </div>
        
        {/* Панель навигации (фиксированная внизу) */}
        <div 
          className={`fixed left-1/2 transform -translate-x-1/2 z-20 transition-all duration-500 bottom-nav-shadow ${
            navVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ 
            width: '352px', 
            height: '77px', 
            bottom: '18px',
            borderRadius: '55px',
            backgroundColor: 'white'
          }}
        >
          <BottomNavigation currentScreen={screen} setScreen={handleSetScreen} />
        </div>
        
        {/* Модальное окно назначения (Destination) */}
        {isDestinationModalOpen && (
          <>
            {/* Затемнение фона */}
            <div 
              className="fixed inset-0 z-30 modal-overlay"
              onClick={closeModal}
            />
            
            {/* Само модальное окно */}
            <div className="fixed inset-0 z-40 flex justify-center items-end pointer-events-none">
              <div 
                className={`w-full max-w-md bg-white shadow-2xl transform pointer-events-auto ${
                  modalAnimation || "translate-y-full"
                }`}
                style={{ 
                  borderRadius: '55px 55px 0 0',
                  height: '55%',
                  minHeight: '55%',
                  maxHeight: '90vh'
                }}
              >
                <DestinationScreen onClose={closeModal} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;