  // src/components/Rewardpopup1.jsx
  import React, { useState, useEffect } from "react";
  import { motion } from "framer-motion";
  import { X } from "lucide-react";
  import OpenReward from "./OpenReward";
  import { useNavigate } from "react-router-dom";
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const Rewardpopup1 = ({ onClose, scannedData }) => {
    const [showOpenReward, setShowOpenReward] = useState(false);
    const [cashbackAmount, setCashbackAmount] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const isOpen = localStorage.getItem("openRewardVisible");
      if (isOpen === "true") setShowOpenReward(true);
    }, []);

    const handleOpenReward = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("userId");
        const res = await fetch(`${API_BASE_URL}/api/scan`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, code: scannedData })
        });
        const data = await res.json();
        if (res.ok) {
          setCashbackAmount(data.addedAmount);
          localStorage.setItem("openRewardVisible", "true");
          setShowOpenReward(true);
        } else {
          console.error("Scan API error:", data);
          setCashbackAmount(0);
          setShowOpenReward(true);
        }
      } catch (err) {
        console.error(err);
        setCashbackAmount(0);
        setShowOpenReward(true);
      } finally {
        setLoading(false);
      }
    };

    // On close we want to ensure the user lands on AboutScreen (home)
    const handleCloseOpenReward = () => {
      setShowOpenReward(false);
      localStorage.removeItem("openRewardVisible");
      if (onClose) onClose();

      // ensure redirect to AboutScreen — replace history to clear any state
      navigate("/", { replace: true });
    };

    // If user clicks the top-close while the first popup (before OpenReward) is shown,
    // we also redirect home.
    const handleTopClose = () => {
      if (onClose) onClose();
      navigate("/", { replace: true });
    };

    return (
      <>
        {!showOpenReward && (
          <div className="fixed inset-0 bg-black backdrop-blur-[2px] flex items-center justify-center z-50">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 120 }} className="relative z-10 flex flex-col items-center justify-center p-6 -mt-10">
              <button onClick={handleTopClose} className="absolute -top-5 -right-2 text-amber-400 text-xl font-bold z-20">
                <X size={22} />
              </button>

              <div className="relative w-full">
                <img src="/icons/hurray.png" alt="image" className="w-40 m-auto overflow-hidden" />
              </div>

              <p className="text-sm text-white -mt-4 mb-9">Aapka Luck Chal Gaya! Dekho, Kya Jeete Ho!</p>

              <motion.div onClick={handleOpenReward} className="relative w-[100%] max-w-xs rounded-3xl overflow-hidden shadow-2xl bg-[#FFD700] text-center cursor-pointer">
                <img src="/icons/Sun brust rays cashback screen.svg" alt="sun rays" className="absolute inset-0 w-full h-full object-cover opacity-100" />
                <div className="relative w-full h-76 flex flex-col items-center justify-center mb-4 space-y-6">
                  <motion.div className="relative my-auto w-42 h-42 -mb-2 rounded-full flex items-center justify-center">
                    <img src="/icons/Subtract.png" alt="" className="w-42 absolute opacity-100" />
                  </motion.div>
                  <div className="bg-black w-[100%] text-white mb-6 inset-0 px-4 py-2 mt-4 shadow-md opacity-70">
                    <p className="text-white text-md">Tap & Win <br /> upto your every ride</p>
                  </div>
                </div>
              </motion.div>
              {loading && <p className="text-white mt-2">Opening reward...</p>}
            </motion.div>
          </div>
        )}

        {showOpenReward && <OpenReward onClose={handleCloseOpenReward} cashbackAmount={cashbackAmount} />}
      </>
    );
  };

  export default Rewardpopup1;




