// src/App.jsx
import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import AboutScreen from "./components/AboutScreen";
import QRCodeScanner from "./components/QRCodeScanner";
import Rewardpopup1 from "./components/Rewardpopup1";
import OpenReward from "./components/OpenReward";
import ReferAndEarn from "./components/ReferAndEarn";
import Signup from "./components/Signup";

const MainWrapper = () => {
  const location = useLocation();
  const [activePopup, setActivePopup] = useState(null); // "reward" | "openReward" | null
  const [scannedData, setScannedData] = useState(null);

  // When QR scanner navigates here with state, open reward popup on top of AboutScreen
  useEffect(() => {
    if (location.state?.fromQRSuccess) {
      setScannedData(location.state.scannedData || null);
      setActivePopup("reward");

      // Remove state from history to avoid re-showing popup when refreshing
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleClosePopup = () => {
    setActivePopup(null);
    setScannedData(null);
  };

  const handleOpenReward = () => setActivePopup("openReward");

  return (
    <div className="relative">
      <div className={`transition-all duration-500 ${activePopup ? "opacity-40 blur-sm pointer-events-none" : "opacity-100"}`}>
        <AboutScreen onOpenReward={handleOpenReward} />
      </div>

      {activePopup === "reward" && (
        <Rewardpopup1 onClose={handleClosePopup} scannedData={scannedData} />
      )}

      {activePopup === "openReward" && (
        <OpenReward onClose={handleClosePopup} />
      )}
    </div>
  );
};

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <MainWrapper /> },
    { path: "/qrscan", element: <QRCodeScanner /> },
    { path: "/reward", element: <Rewardpopup1 /> },
    { path: "/refer", element: <ReferAndEarn /> },
    { path: "/signup", element: <Signup /> },
    { path: "/money", element: <OpenReward /> },
  ]);

  return <RouterProvider router={router} />;
  
};

export default App;

