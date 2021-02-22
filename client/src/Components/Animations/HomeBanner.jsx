import React from "react";
import Typewriter from "typewriter-effect";

const HomeBanner = () => {
  return (
    <div className="banner">
      <Typewriter
  options={{
    strings: ['Lastest Products','Best Sellers','Lightining delivery'],
    autoStart: true,
    loop: true,
  }}
/>
    </div>
  );
};

export default HomeBanner;
