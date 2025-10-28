import React, { useRef, useEffect, useState } from "react";

const ScratchCard = ({ width, height, onComplete, children }) => {
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // ✅ prevent null reference
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw overlay
    ctx.fillStyle = "#d1d5db"; // light gray overlay
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#000";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Scratch Here!", width / 2 - 45, height / 2);

    const handleScratch = (e) => {
      if (revealed || !canvasRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();

      // Check reveal %
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      let cleared = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) cleared++;
      }
      const clearedPercent = (cleared / (pixels.length / 4)) * 100;

      if (clearedPercent > 60 && !revealed) {
        setRevealed(true);
        onComplete?.();
      }
    };

    const startScratch = () => setIsScratching(true);
    const stopScratch = () => setIsScratching(false);

    // ✅ Add listeners
    canvas.addEventListener("mousedown", startScratch);
    canvas.addEventListener("touchstart", startScratch);
    canvas.addEventListener("mouseup", stopScratch);
    canvas.addEventListener("touchend", stopScratch);
    canvas.addEventListener("mousemove", (e) => isScratching && handleScratch(e));
    canvas.addEventListener("touchmove", (e) => isScratching && handleScratch(e));

    // ✅ Cleanup
    return () => {
      if (!canvas) return;
      canvas.removeEventListener("mousedown", startScratch);
      canvas.removeEventListener("touchstart", startScratch);
      canvas.removeEventListener("mouseup", stopScratch);
      canvas.removeEventListener("touchend", stopScratch);
      canvas.removeEventListener("mousemove", (e) => isScratching && handleScratch(e));
      canvas.removeEventListener("touchmove", (e) => isScratching && handleScratch(e));
    };
  }, [width, height, isScratching, revealed, onComplete]);

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to bottom, #facc15, #fbbf24)",
          zIndex: 0,
        }}
      >
        {children}
      </div>

      {!revealed && (
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{
            position: "absolute",
            inset: 0,
            cursor: "grab",
            borderRadius: "12px",
          }}
        />
      )}
    </div>
  );
};

export default ScratchCard;





//For scratchcard
// export default Rewardpopup1;


// import ScratchCard from "./ScratchCard";

// <div className="rounded-xl overflow-hidden shadow-lg border border-yellow-400">
//   <ScratchCard
//     width={300}
//     height={200}
//     onComplete={() => console.log("Scratch Completed! 🎉")}
//   >
//     <div className="flex flex-col items-center justify-center h-full">
//       <h3 className="text-3xl font-extrabold text-blue-700">₹50 Cashback</h3>
//       <p className="text-black font-semibold mt-2">
//         Tap & Win upto your every ride
//       </p>
//     </div>
//   </ScratchCard>
// </div>
