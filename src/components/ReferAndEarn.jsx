// // src/components/ReferAndEarn.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // if not imported
// import { Home } from "lucide-react"; // optional: using lucide icon
// const VITE_API_URL = import.meta.env.VITE_API_URL;

// const ReferAndEarn = () => {
//   const navigate = useNavigate()
//   const shareLink = "https://rewato-cashback-frontend.vercel.app/";
//   const [totalEarned, setTotalEarned] = useState(0);

//   const fetchUser = async () => {
//     try {
//       const userId = localStorage.getItem("userId");
//       if (!userId) return setTotalEarned(0);
//       const res = await fetch(`${VITE_API_URL}/api/users/${userId}`);
//       if (!res.ok) return setTotalEarned(0);
//       const data = await res.json();
//       setTotalEarned(data.cashbackAmount || 0);
//     } catch (err) {
//       console.error(err);
//       setTotalEarned(0);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//     // you could also poll or listen to events
//   }, []);

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: "Rewato Cashback",
//           text: "Get instant cashback on rides with Rewato! 🚗💸",
//           url: shareLink,
//         });
//         console.log("Link shared successfully!");
//       } catch (error) {
//         console.log("Sharing canceled or failed:", error);
//       }
//     } else {
//       try {
//         await navigator.clipboard.writeText(shareLink);
//         alert("Link copied to clipboard! Share it manually 💬");
//       } catch (err) {
//         alert("Failed to copy link. Please share manually.");
//         console.log(err)
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center font-sans">
//       {/* Top Yellow Card (unchanged) */}

//       <div className="bg-[#FFD700] rounded-b-4xl p-5 w-full flex flex-col items-center shadow-md">

//         <div className="absolute left-4 top-4 z-50">
//           <button
//             onClick={() => navigate("/")}
//             className="w-12 h-12 bg-[#0028FF] flex items-center justify-center rounded-full shadow-lg text-white hover:bg-[#001fcc] transition"
//           >
//             <Home size={24} />
//           </button>
//         </div>

//         <img
//           src="/icons/Sun Brust Rays.svg"
//           alt="Rays"
//           className="inset-0 w-full h-full object-none opacity-150 -mb-120 z-0"
//         />

//         <div className="absolute flex justify-center items-center">
//           <img
//             src="/icons/Rupay sign 3.svg"
//             alt="Coin 2"
//             className="w-8 h-8 relative top-30.5 rotate-35 left-11.5 z-100 "
//           />
//           <img
//             src="/icons/Rupay sign 1.svg"
//             alt="Coin 1"
//             className="w-13 h-13 top-16 relative -rotate-10"
//           />
//           <img
//             src="/icons/Rupay sign 3.svg"
//             alt="Coin 3"
//             className="w-12 h-12 top-11 left-10 -rotate-10 relative"
//           />
//         </div>

//         <img
//           src="/icons/Car2.png"
//           alt="Vehicles"
//           className="mx-auto w-[85%] mb-6 z-10 -top-40"
//         />

//         <h2 className="text-[#0028FF] text-3xl my-1 font-extrabold text-shadow-md text-shadow-amber-100 ">
//           Refer & Earn ₹200
//         </h2>
//         <p className="text-md leading-none text-center font-bold">
//           So they can dive into <br /> rewato cashback with you
//         </p>
//       </div>

//       <button onClick={handleShare} className="bg-[#0028FF] text-white font-semibold text-lg w-[95%] py-3 rounded-lg mt-8 mb-2 shadow-[4px_4px_0px_rgba(250,204,21,1)] active:translate-y-1 active:shadow-none transition relative">
//         Share link
//       </button>

//       <div className="bdr flex flex-row w-90 items-center mx-4 my-3 ">
//         <hr className="border-b border-gray-200 w-full " />
//         <img src="/icons/Star 9.png" alt="star" className="w-7 mx-2" />
//         <hr className="border-b border-gray-200 w-full " />
//       </div>

//       {/* Earned Section */}
//       <div className="flex justify-between items-center w-[95%] bg-amber-50 border border-[#A1B7EA] px-4 rounded-2xl shadow">
//         <span className="text-gray-500 text-md font-bold">You earned</span>
//         <div className="relative my-auto w-16 h-16 rounded-full flex items-center justify-center ">
//           <img src="/icons/Rupay sign.png" alt="" className="w-18 absolute opacity-100 inset-shadow-black" />
//           <span className="text-white font-extrabold text-[1.2rem] mt-1 z-10">₹{totalEarned}</span>
//         </div>
//       </div>

//       {/* The rest stays unchanged */}
//       <div className="flex justify-between items-center w-[95%] bg-amber-50 border border-[#A1B7EA] py-6 px-3 rounded-2xl shadow mt-4">
//         <div>
//           <h3 className="text-black font-black text-[1.5rem] leading-none">Unlimited Free Cashback</h3>
//           <p className="text-gray-500 text-md mt-2 font-bold">on scan qr code</p>
//         </div>
//         <img src="/icons/vehicles.png" alt="Auto Cashback" className="w-40 h-auto" />
//       </div>
//     </div>
//   );
// };

// export default ReferAndEarn;





import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const ReferAndEarn = () => {
  const [totalEarn, setTotalEarn] = useState(0);
  // const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate()
  const shareLink = "https://rewato-cashback.netlify.app/";

  useEffect(() => {
    const fetchTotalEarn = async () => {
      try {
        const userId = localStorage.getItem("userId"); // assuming you store it on login
        const res = await axios.get(`${VITE_API_URL}/api/total-earn/${userId}`);
        // const res = await axios.get(`/api/total-earn/${userId}`);
        setTotalEarn(res.data.total);
      } catch (error) {
        console.error("Error fetching total earn:", error);
        setTotalEarn(0);
      }
    };
    fetchTotalEarn();
  }, [location.key]);


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Rewato Cashback",
          text: "Get instant cashback on rides with Rewato! 🚗💸",
          url: shareLink,
        });
        console.log("Link shared successfully!");
      } catch (error) {
        console.log("Sharing canceled or failed:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareLink);
        alert("Link copied to clipboard! Share it manually 💬");
      } catch (err) {
        alert("Failed to copy link. Please share manually.");
        console.log(err)
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center font-sans">
      {/* Top Yellow Card (unchanged) */}

      <div className="bg-[#FFD700] rounded-b-4xl p-5 w-full flex flex-col items-center shadow-md">

        <div className="absolute left-4 top-4 z-50">
          <button
            onClick={() => navigate("/")}
            className="w-12 h-12 bg-[#0028FF] flex items-center justify-center rounded-full shadow-lg text-white hover:bg-[#001fcc] transition"
          >
            <Home size={24} />
          </button>
        </div>

        <img
          src="/icons/Sun Brust Rays.svg"
          alt="Rays"
          className="inset-0 w-full h-full object-none opacity-150 -mb-120 z-0"
        />

        <div className="absolute flex justify-center items-center">
          <img
            src="/icons/Rupay sign 3.svg"
            alt="Coin 2"
            className="w-8 h-8 relative top-30.5 rotate-35 left-11.5 z-100 "
          />
          <img
            src="/icons/Rupay sign 1.svg"
            alt="Coin 1"
            className="w-13 h-13 top-16 relative -rotate-10"
          />
          <img
            src="/icons/Rupay sign 3.svg"
            alt="Coin 3"
            className="w-12 h-12 top-11 left-10 -rotate-10 relative"
          />
        </div>

        <img
          src="/icons/Car2.png"
          alt="Vehicles"
          className="mx-auto w-[85%] mb-6 z-10 -top-40"
        />

        <h2 className="text-[#0028FF] text-3xl my-1 font-extrabold text-shadow-md text-shadow-amber-100 ">
          Refer & Earn ₹200
        </h2>
        <p className="text-md leading-none text-center font-bold">
          So they can dive into <br /> rewato cashback with you
        </p>
      </div>

      <button onClick={handleShare} className="bg-[#0028FF] text-white font-semibold text-lg w-[95%] py-3 rounded-lg mt-8 mb-2 shadow-[4px_4px_0px_rgba(250,204,21,1)] active:translate-y-1 active:shadow-none transition relative">
        Share link
      </button>

      <div className="bdr flex flex-row w-90 items-center mx-4 my-3 ">
        <hr className="border-b border-gray-200 w-full " />
        <img src="/icons/Star 9.png" alt="star" className="w-7 mx-2" />
        <hr className="border-b border-gray-200 w-full " />
      </div>

      {/* Earned Section */}
      <div className="flex justify-between items-center w-[95%] bg-amber-50 border border-[#A1B7EA] px-4 rounded-2xl shadow">
        <span className="text-gray-500 text-md font-bold">You earned</span>
        <div className="relative my-auto w-16 h-16 rounded-full flex items-center justify-center ">
          <img src="/icons/Rupay sign.png" alt="" className="w-18 absolute opacity-100 inset-shadow-black" />
          <span className="text-white font-extrabold text-[1.2rem] mt-1 z-10">₹{totalEarn}</span>
        </div>
      </div>

      {/* The rest stays unchanged */}
      <div className="flex justify-between items-center w-[95%] bg-amber-50 border border-[#A1B7EA] py-6 px-3 rounded-2xl shadow mt-4">
        <div>
          <h3 className="text-black font-black text-[1.5rem] leading-none">Unlimited Free Cashback</h3>
          <p className="text-gray-500 text-md mt-2 font-bold">on scan qr code</p>
        </div>
        <img src="/icons/vehicles.png" alt="Auto Cashback" className="w-40 h-auto" />
      </div>
    </div>
  );
};

export default ReferAndEarn;
