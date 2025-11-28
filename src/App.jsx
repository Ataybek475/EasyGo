// App.jsx
import { useState, useEffect } from "react";
import EasyGOMockup from "./components/EasyGOMockup";
import { DestinationScreen } from "./components/DestinationScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { BottomNavigation } from "./components/BottomNavigation";

function App() {
  const [screen, setScreen] = useState("home");
  const [transition, setTransition] = useState("");
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    setNavVisible(true);
  }, []);

  const handleSetScreen = (newScreen) => {
    setTransition("fade-out");
    setTimeout(() => {
      setScreen(newScreen);
      setTransition("fade-in");
    }, 200);
  };

  return (
    <div className="w-full max-w-md mx-auto h-screen bg-white relative overflow-hidden">
      {/* Черный размывающийся фон снизу */}
      <div 
        className={`fixed left-1/2 transform -translate-x-1/2 bg-gradient-to-t from-black/30 via-black/15 to-transparent rounded-[40px] pointer-events-none z-10 transition-all duration-500 ${
          navVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ 
          width: '352px', 
          height: '77px', 
          bottom: '18px'
        }}
      ></div>
      
      <div className={`h-full overflow-hidden ${transition}`}>
        {screen === "home" && <EasyGOMockup setScreen={handleSetScreen} />}
        {screen === "destination" && <DestinationScreen setScreen={handleSetScreen} />}
        {screen === "profile" && <ProfileScreen setScreen={handleSetScreen} />}
      </div>
      
      {/* Навигация с плавным появлением */}
      <div 
        className={`fixed left-1/2 transform -translate-x-1/2 z-20 transition-all duration-500 ${
          navVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ 
          width: '352px', 
          height: '77px', 
          bottom: '18px'
        }}
      >
        <BottomNavigation currentScreen={screen} setScreen={handleSetScreen} />
      </div>
    </div>
  );
}

export default App;