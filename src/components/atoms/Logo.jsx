import React, { useMemo } from "react";

function Logo({ size }) {
  const logoTextSize = useMemo(
    () =>
      size === "large"
        ? "text-4xl"
        : size === "regular"
        ? "text-2xl"
        : "text-xl",
    [size]
  );

  const logoImgWidth = useMemo(
    () => (size === "large" ? "16rem" : size === "regular" ? "9rem" : "6rem"),
    [size]
  );
  const logoImgHeight = useMemo(
    () => (size === "large" ? "10rem" : size === "regular" ? "5rem" : "3.5rem"),
    [size]
  );

  return (
    <div
      className={`text-primary font-bold ${logoTextSize} flex items-center justify-center gap-x-1.5`}
    >
      <img
        src="/assets/logo.png"
        alt="logo"
        style={{ width: logoImgWidth, height: logoImgHeight }}
      />
    </div>
  );
}

export default Logo;
