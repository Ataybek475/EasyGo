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

  useEffect(() => {
    setNavVisible(true);
  }, []);

  const handleSetScreen = (newScreen) => {
    if (newScreen === "destination") {
      setIsDestinationModalOpen(true);
      setTimeout(() => {
        setModalAnimation("slide-up");
      }, 10);
      return; 
    }
    
    setTransition("fade-out");
    setTimeout(() => {
      setScreen(newScreen);
      setTransition("fade-in");
    }, 200);
  };

  const closeModal = () => {
    setModalAnimation("slide-down");
    setTimeout(() => {
      setIsDestinationModalOpen(false);
      setModalAnimation("");
    }, 300);
  };

  return (
    <>
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
        `}
      </style>
      
      <div className="w-full max-w-md mx-auto min-h-screen bg-white relative">
        
        {/* Основной контент - ВСЕГДА виден */}
        <div className={`min-h-screen ${transition}`}>
          {screen === "home" && <EasyGOMockup setScreen={handleSetScreen} />}
          {screen === "profile" && <ProfileScreen setScreen={handleSetScreen} />}
        </div>
        
        {/* Навигация */}
        <div 
          className={`fixed left-1/2 transform -translate-x-1/2 z-20 transition-all duration-500 ${
            navVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ 
            width: '352px', 
            height: '77px', 
            bottom: '18px',
            borderRadius: '55px'
          }}
        >
          <BottomNavigation currentScreen={screen} setScreen={handleSetScreen} />
        </div>
        
        {/* МОДАЛЬНОЕ ОКНО */}
        {isDestinationModalOpen && (
          <div className="fixed inset-0 z-30 flex justify-center items-end">
            <div 
              className={`w-full max-w-md bg-white shadow-2xl transform ${
                modalAnimation || "translate-y-full"
              }`}
              style={{ 
                borderRadius: '55px 55px 0 0',
                height: '50%', // Увеличил высоту для лучшего отображения
                minHeight: '50%'
              }}
            >
              <DestinationScreen onClose={closeModal} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;