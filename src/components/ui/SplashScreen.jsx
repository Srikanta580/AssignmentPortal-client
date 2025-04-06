import React, { useEffect, useState } from "react";
import Logo from "../atoms/Logo";

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Display splash for 3 seconds, then fade out over 1 second
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Remove splash completely after fade-out animation (1 sec)
    const removeTimer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-dark transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <Logo size="large" />
    </div>
  );
};

export default SplashScreen;
