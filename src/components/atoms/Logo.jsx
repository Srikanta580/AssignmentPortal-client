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

  const logoImgSize = useMemo(
    () => (size === "large" ? "6rem" : size === "regular" ? "3rem" : "1.5rem"),
    [size]
  );

  return (
    <div
      className={`text-[#005F73] font-bold ${logoTextSize} flex items-center justify-center gap-x-1.5`}
    >
      <img
        src="/assets/logo.png"
        alt="logo"
        style={{ width: logoImgSize, height: logoImgSize }}
      />
      Submit
    </div>
  );
}

export default Logo;
