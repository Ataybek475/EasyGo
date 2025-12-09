import React, { useState, useEffect } from "react";
import { HomeScreen } from "./components/HomeScreen";
import EasyGOMockup from "./components/EasyGOMockup.jsx";
import { ProfileScreen } from "./components/ProfileScreen";
import { SupportScreen } from "./components/SupportScreen";
import { DestinationScreen } from "./components/DestinationScreen";
import { BottomNavigation } from "./components/BottomNavigation";

function App() {
  const [screen, setScreen] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [transition, setTransition] = useState("");
  const [destination, setDestination] = useState(null);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);

  useEffect(() => {
    const savedLogin = localStorage.getItem("easygo_logged_in");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
      setScreen("main");
    }
  }, []);

  const handleSetScreen = (newScreen) => {
    if (newScreen === "destination") {
      setIsDestinationOpen(true);
    } else {
      setTransition("fade-out");
      setTimeout(() => {
        setScreen(newScreen);
        setTransition("fade-in");
      }, 200);
    }
  };

  const handleLogin = () => {
    localStorage.setItem("easygo_logged_in", "true");
    setIsLoggedIn(true);
    setScreen("main");
  };

  const handleLogout = () => {
    localStorage.removeItem("easygo_logged_in");
    setIsLoggedIn(false);
    setScreen("home");
  };

  const handleCloseDestination = () => {
    setIsDestinationOpen(false);
  };

  const handleSelectDestination = (address) => {
    setDestination(address);
    console.log("Выбран адрес:", address);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white relative overflow-hidden">
      {/* Основной контент */}
      <div className={`min-h-screen ${isLoggedIn ? 'pb-24' : ''} ${transition}`}>
        {screen === "home" && (
          <HomeScreen setScreen={handleLogin} />
        )}
        {screen === "main" && (
          <EasyGOMockup 
            setScreen={handleSetScreen}
            onLogout={handleLogout}
            destination={destination}
          />
        )}
        {screen === "profile" && (
          <ProfileScreen 
            setScreen={handleSetScreen} 
          />
        )}
        {screen === "support" && (
          <SupportScreen setScreen={handleSetScreen} />
        )}
      </div>
      
      {/* Модальное окно DestinationScreen */}
      <DestinationScreen 
        isOpen={isDestinationOpen}
        onClose={handleCloseDestination}
        onSelectDestination={handleSelectDestination}
      />
      
      {/* Панель навигации */}
      {isLoggedIn && screen !== "home" && (
        <div 
          className="fixed left-1/2 transform -translate-x-1/2 z-20"
          style={{ 
            width: '352px', 
            height: '77px', 
            bottom: '18px',
            borderRadius: '55px'
          }}
        >
          <BottomNavigation 
            currentScreen={screen} 
            setScreen={handleSetScreen} 
          />
        </div>
      )}
    </div>
  );
}

export default App;