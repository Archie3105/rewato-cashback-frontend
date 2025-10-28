import React from "react";

const StepGuide = () => {
  const steps = [
    {
      id: 1,
      text: (
        <>
          Scan with <span className="text-blue-600 font-semibold">Rewato</span>
          <br />
          QR get cashback
        </>
      ),
    },
    {
      id: 2,
      text: (
        <>
          Find it in the <span className="text-blue-600 font-semibold">‘Rewards’</span>
          <br />
          on screen
        </>
      ),
    },
    {
      id: 3,
      text: (
        <>
          Scratch the card reveal
          <br />
          your cashback
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col space-y relative">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start relative">
          {/* Step Circle */}
          <div className="flex flex-col items-center mr-4">
            <div className="w-9 h-9 bg-gray-200   rounded-full flex items-center justify-center text-gray-700 font-bold text-xl">
              {step.id}
            </div>

            {/* Dotted Line */}
            {index !== steps.length - 1 && (
              <div className="h-12 border-l-2 border-dashed border-gray-300 mt-1"></div>
            )}
          </div>

          {/* Step Text */}
          <p className="text-gray-400 text-md font-bold leading-tight mt-1">{step.text}</p>
        </div>
      ))}
    </div>
  );
};

export default StepGuide;
