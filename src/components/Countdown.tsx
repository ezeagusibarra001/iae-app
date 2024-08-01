import React, { useState, useEffect } from "react";

export default function Countdown({ onEnd }: { onEnd?: () => void }) {
  const [seconds, setSeconds] = useState(45);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (onEnd) {
      onEnd(); // Trigger any callback when countdown ends
    }
  }, [seconds, onEnd]);

  return (
    <div className="mt-10 text-center text-lg font-semibold">
      {seconds > 0 ? `Cargando... ${seconds}s` : "Tiempo agotado"}
    </div>
  );
}
