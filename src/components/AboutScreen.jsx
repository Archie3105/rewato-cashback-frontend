import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import StepGuide from "./StepGuide";
import Rewardpopup1 from "./Rewardpopup1";

const AboutScreen = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const [showReward, setShowReward] = useState(false);

  const [showSignupButton, setShowSignupButton] = React.useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // ✅ Show Rewardpopup1 on first load or after QR success
  // useEffect(() => {
  //   if (location.state?.fromQRSuccess) {
  //     setShowReward(true);
  //     localStorage.setItem("popupClosed", "false");
  //     window.history.replaceState({}, document.title);
  //   } else {
  //     const popupClosed = localStorage.getItem("popupClosed");
  //     if (popupClosed !== "true") setShowReward(true);
  //   }
  // }, [location]);

  // ✅ Close Rewardpopup1
  // const handleCloseReward = () => {
  //   setShowReward(false);
  //   localStorage.setItem("popupClosed", "true");
  // };

  // check if signup done
  useEffect(() => {
    const signedUp = localStorage.getItem("signedUp");
    if (signedUp === "true") {
      setShowSignupButton(false);
      setShowSuccessMessage(true);

      // Hide the message after 3 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      return () => clearTimeout(timer); // cleanup
    }
  }, []);
  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex flex-col items-center font-sans relative z-0">

      {/* Header + Graphics */}
      <div className="bg-gradient-to-b from-[#FFD700] to-yellow-10 p-1">
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/icons/Logo1.svg"
            alt="Logo"
            className="w-32 m-auto drop-shadow-md z-10 mt-16 mb-2 relative"
          />
          <div className="flex items-center justify-center z-10 mx-auto relative">
            <img src="/icons/Star 4.png" alt="" className="w-4 h-4 left-19 top-1 z-10 absolute" />
            <img
              src="/icons/Rupay sign 1.svg"
              alt=""
              className="w-6 h-6 z-10 left-29 top-[0.5px] rotate-45 overflow-hidden absolute"
            />
            <img src="/icons/Star 4.png" alt="" className="w-3 h-3 left-37 top-3 absolute" />
            <img
              src="/icons/Rupay sign 1.svg"
              alt=""
              className="w-8 h-8 right-26 -top-[10px] -rotate-12 absolute"
            />
            <img src="/icons/Star 4.png" alt="" className="w-3 h-3 right-13 top-1 z-100 absolute" />
          </div>

          <h1
            className="drop-shadow-md text-[4.5rem] font-[900] text-[#0028FF] text-shadow-amber-white z-10 -mt-4 font-sans 
            [text-shadow:-2px_-2px_0_#fff,2px_-2px_0_#fff,-2px_2px_0_#fff,2px_2px_0_#fff,4px_4px_8px_rgba(0,0,0,0.5)]"
          >
            Cashback
          </h1>

          <div className="flex items-center justify-center z-10 mx-auto -mt-4 relative">
            <img src="/icons/Rupay sign 1.svg" alt="" className="w-12 h-12 z-10 left-18 top-[0.5px] -rotate-12 absolute" />
            <img src="/icons/Star 9.png" alt="" className="w-5 h-5 left-49 -top-1 rotate-30 absolute" />
            <img src="/icons/Rupay sign 1.svg" alt="" className="w-8 h-8 right-22 top-2 absolute" />
            <img src="/icons/Star 4.png" alt="" className="w-5 h-5 right-35 top-15 z-100 absolute" />
          </div>

          <h1
            className="drop-shadow-md text-[4.5rem] font-[900] text-[#0028FF] font-sans z-10 -mt-5 
            [text-shadow:-2px_-2px_0_#fff,2px_-2px_0_#fff,-2px_2px_0_#fff,2px_2px_0_#fff,4px_4px_8px_rgba(0,0,0,0.5)]"
          >
            Fest
          </h1>

          <p className="w-[80%] m-auto mt-4 text-[1.4rem] font-black leading-none">
            Up to ₹100 cashback guaranteed on every your rides
          </p>
        </motion.div>

        <motion.img
          src="/icons/vehicles.png"
          alt="Rewato Vehicles"
          className="w-90 my-6 m-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 p-4 w-full max-w-md">
          <div className="bg-white p-4 rounded-2xl shadow text-center">
            <img src="/icons/Group 90.png" alt="scanner" className="w-16 m-auto" />
            <p className="text-sm font-extrabold mt-8">Open camera mobile scanner</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow text-center">
            <img src="/icons/Group 901.png" alt="scanner" className="w-16 m-auto" />
            <p className="text-sm font-extrabold mt-8">Scan rewato cashback QR code</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow text-center">
            <img src="/icons/Cashback screen.png" alt="scanner" className="w-16 m-auto" />
            <p className="text-sm font-extrabold mt-8">Get cashback every scan of QR</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow text-center">
            <img src="/icons/Driver.png" alt="scanner" className="w-16 m-auto" />
            <p className="text-sm font-extrabold mt-8">And pay you fare with cashback</p>
          </div>
        </div>
      </div>

      {/* How to Claim Cashback */}
      <div className="mt-10 w-full max-w-md p-5">
        <h3 className="text-center text-gray-800 font-bold text-lg mb-3">
          How to claim cashback?
        </h3>
        <div className="bg-white flex items-center">
          <img src="/icons/Thumbnail.png" alt="Cashback" className="w-32 shadow" />
          <div className="ml-5">
            <StepGuide />
          </div>
        </div>

        {/* Scan Now Button */}
        <button
          onClick={() => navigate("/qrscan")}
          className="bg-[#FFD700] text-black font-bold w-full py-3 rounded-xl 
             hover:bg-yellow-300 active:bg-yellow-500 focus:bg-yellow-500 
             transition transform active:scale-95 mt-10"
        >
          Scan Now
        </button>

        {/* Signup button at bottom */}
        <div className="my-5">
          {showSignupButton ? (
            <p
              onClick={handleSignupClick}
              className="w-[100%] flex mx-auto text-center justify-center transform bg-[#0028FF] border-2 border-[#0028FF] text-white font-bold py-3 px-8 rounded-xl shadow-lg cursor-pointer"
            >
              Sign Up
            </p>
          ) : (
            showSuccessMessage && (
              <p className="fixed top-6 left-1/2 transform -translate-x-1/2 text-green-900 font-bold transition-opacity duration-500">
                Signup Successful! 🎉
              </p>
            )
          )}
        </div>

        <div className="text-center text-md font-semibold text-gray-400 mt-16">
          <a href="#" className="underline">T&C Apply</a>
          <p>Max 5 scans per unique QR code.</p>
          <a href="#" className="underline">Click here for more details</a>
        </div>
      </div>

      {/* Reward Popup */}
      {/* {showReward && <Rewardpopup1 onClose={handleCloseReward} />} */}
    </div>
  );
};

export default AboutScreen;
