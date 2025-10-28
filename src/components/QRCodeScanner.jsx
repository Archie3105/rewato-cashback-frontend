import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Rewardpopup1 from "./Rewardpopup1";

const QRCodeScanner = () => {
  const html5QrCodeRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const hasScannedRef = useRef(false); // 👈 prevent duplicate popup

  useEffect(() => {
    const scannerId = "qr-reader";
    const html5QrCode = new Html5Qrcode(scannerId);
    html5QrCodeRef.current = html5QrCode;

    const startScanner = async () => {
      try {
        setError(null);
        setIsScanning(true);
        hasScannedRef.current = false; // reset flag every start

        await html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 300 },
          async (decodedText) => {
            // 🔥 Prevent multiple triggers
            if (hasScannedRef.current) return;
            hasScannedRef.current = true;

            console.log("✅ QR Code Scanned:", decodedText);
            try {
              await html5QrCode.stop();
            } catch (err) {
              console.warn("Stop error ignored:", err);
            }

            setIsScanning(false);
            setScannedData(decodedText);
            setShowRewardPopup(true);
          },
          (errorMessage) => {
            console.log("Scan error:", errorMessage);
          }
        );
      } catch (err) {
        console.error("Camera access error:", err);
        setError("Cannot access camera. Please allow permission.");
        setIsScanning(false);
      }
    };

    startScanner();

    return () => {
      const qrCode = html5QrCodeRef.current;
      if (qrCode && qrCode.isScanning) {
        qrCode.stop().catch(() => {});
      }
    };
  }, []);

  // 👇 when popup closes, restart scanner cleanly
  const handleCloseReward = async () => {
    setShowRewardPopup(false);
    setScannedData(null);
    hasScannedRef.current = false;

    try {
      const qrCode = html5QrCodeRef.current;
      if (qrCode && !qrCode.isScanning) {
        await qrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 300 },
          async (decodedText) => {
            if (hasScannedRef.current) return;
            hasScannedRef.current = true;

            console.log("✅ QR Code Scanned:", decodedText);
            try {
              await qrCode.stop();
            } catch (err) {
              console.log(err)
            }
            setScannedData(decodedText);
            setShowRewardPopup(true);
          }
        );
      }
    } catch (err) {
      console.error("Restart scanner error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white font-sans">
      {!showRewardPopup && (
        <>
          {error && (
            <div className="text-red-400 bg-white p-4 rounded-xl text-center font-medium border border-red-400">
              <p className="font-bold mb-1">Error:</p>
              {error}
            </div>
          )}
          <div className="relative w-[85%] aspect-square flex items-center justify-center overflow-hidden rounded-xl">
            <div id="qr-reader" className="absolute top-0 left-0 w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-3/4 h-3/4 border-2 border-dashed border-yellow-400/50 rounded-lg opacity-70" />
            </div>
          </div>
          {isScanning && <p className="mt-4 text-gray-700">Scanning for QR Code...</p>}
        </>
      )}

      {showRewardPopup && (
        <Rewardpopup1 scannedData={scannedData} onClose={handleCloseReward} />
      )}
    </div>
  );
};

export default QRCodeScanner;
