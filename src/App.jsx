import { useState } from "react";
import EasyGOMockup from "./components/EasyGOMockup";
import { DestinationScreen } from "./components/DestinationScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { BottomNavigation } from "./components/BottomNavigation";

function App() {
  const [screen, setScreen] = useState("home"); // home / destination / profile
  const [transition, setTransition] = useState("");

  const handleSetScreen = (newScreen) => {
    setTransition("fade-out");
    setTimeout(() => {
      setScreen(newScreen);
      setTransition("fade-in");
    }, 200);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white relative overflow-hidden">
      {/* Черный размывающийся фон снизу с увеличенными отступами */}
      <div className="fixed bottom-0 left-10 right-10 max-w-md mx-auto h-1/2 bg-gradient-to-t from-black/30 via-black/15 to-transparent rounded-[40px] pointer-events-none z-10"></div>
      
      <div className={`min-h-screen pb-24 ${transition}`}>
        {screen === "home" && <EasyGOMockup setScreen={handleSetScreen} />}
        {screen === "destination" && <DestinationScreen setScreen={handleSetScreen} />}
        {screen === "profile" && <ProfileScreen setScreen={handleSetScreen} />}
      </div>
      
      {/* Единая навигация с увеличенными отступами по бокам */}
      <div className="fixed bottom-2 left-10 right-10 max-w-md mx-auto z-20">
        <BottomNavigation currentScreen={screen} setScreen={handleSetScreen} />
      </div>
    </div>
  );
}

export default App;