// src/components/OpenReward.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OpenReward = ({ onClose, cashbackAmount = null }) => {
  const navigate = useNavigate();
  const [showOpenReward, setShowOpenReward] = React.useState(true);

  useEffect(() => {
    const isVisible = localStorage.getItem("openRewardVisible");
    if (isVisible === "true") setShowOpenReward(true);
  }, []);

  const handleClose = () => {
    setShowOpenReward(false);
    localStorage.removeItem("openRewardVisible");
    if (onClose) onClose();
    navigate("/", { replace: true });
  };

  const handleReferNow = () => {
    localStorage.removeItem("openRewardVisible");
    localStorage.setItem("popupClosed", "true");
    setShowOpenReward(false);
    navigate("/refer");
  };

  if (!showOpenReward) return null;

  return (
    <>
      {/* Background blur overlay */}
      <div className="fixed inset-0 opacity-40 blur-sm pointer-events-none"></div>

      {/* Reward Popup */}
      <div className="fixed inset-0 bg-black backdrop-blur-[2px] flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="relative z-10 flex flex-col items-center justify-center p-6"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute -top-5 -right-2 text-[#FFD700] text-xl font-bold z-20"
          >
            <X size={22} />
          </button>

          {/* Title and Description */}
          <h1 className="text-white text-3xl font-extrabold">
            {cashbackAmount && cashbackAmount > 0 ? "You won!" : "Oops, Missed it!"}
          </h1>
          <p className="text-md text-white m-4">
            {cashbackAmount && cashbackAmount > 0
              ? `You got ₹${cashbackAmount}`
              : "Don't stop now, every scan counts"}
          </p>

          {/* ✅ Fixed-size Yellow Reward Card */}       
           <motion.div className="relative w-[300px] h-[380px] rounded-3xl overflow-hidden shadow-2xl bg-[#FFD700] text-center mt-4 flex flex-col items-center justify-between p-6">
            {/* Sunburst background */}
            <img
              src="/icons/Sun brust rays cashback screen.svg"
              alt="sun rays"
              className="absolute inset-0 w-full h-full object-cover opacity-100"
            />

            {/* Main reward circle */}
            <div className="relative w-36 h-36 rounded-full flex items-center justify-center mt-8">
              {cashbackAmount && cashbackAmount > 0 ? (
                <>
                  <img
                    src="/icons/Rupay sign.png"
                    alt="Rupees"
                    className="w-50 h-40 absolute opacity-100"
                  />
                  <span className="text-white font-extrabold text-[2rem] z-10">
                    ₹{cashbackAmount}
                  </span>
                </>
              ) : (
                <img
                  src="/icons/Rupay sign 1.svg"
                  alt="Rupees"
                  className="w-36 h-36 absolute opacity-100"
                />
              )}
            </div>

            {/* Refer Section */}
            <div className="relative w-full mt-6">
              <h1 className="text-[#0028FF] font-extrabold text-2xl leading-tight">
                Refer your friend <br /> and get on ride
              </h1>

              <button
                onClick={handleReferNow}
                className="bg-white border-2 border-[#0028FF] text-[#0028FF] font-bold w-[90%] py-1.5 mx-auto rounded-lg hover:bg-white active:shadow-none transition transform active:scale-95 mt-6 shadow-[3px_3px_0px_rgba(0,0,0,0.8)]"
              >
                Refer Now
              </button>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </>
  );
};

export default OpenReward;
