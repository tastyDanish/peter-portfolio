import { GlitchHandle, useGlitch } from "react-powerglitch";
import "./zylexPortrait.css";
import { useState, useEffect, useRef } from "react";

const ZylexPortrait = () => {
  const glitch: GlitchHandle = useGlitch({
    playMode: "click",
    glitchTimeSpan: false,
    slice: {
      hueRotate: false,
      count: 10,
      velocity: 15,
      minHeight: 0.1,
      maxHeight: 0.3,
    },
    shake: { velocity: 15, amplitudeX: 0.05, amplitudeY: 0.05 },
    pulse: false,
  });
  const images = [
    "art/wizard_happy.png",
    "art/wizard_closed.png",
    "art/wizard_angry.png",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const loaded = useRef(false);

  useEffect(() => {
    glitch.stopGlitch();
    loaded.current = true;
  }, []);

  useEffect(() => {
    const rotateImage = () => {
      if (loaded.current) glitch.startGlitch();
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        glitch.stopGlitch();
      }, 300);
    };

    const rotationInterval = setInterval(rotateImage, 8000);

    return () => {
      clearInterval(rotationInterval);
      glitch.stopGlitch();
    };
  }, [images]);

  return (
    <div className="screen-border side-screen">
      <div className="screen">
        <div className="zylex-portrait">
          <img
            ref={glitch.ref}
            width="160px"
            src={images[currentImageIndex]}
            alt="Rotating Image"
          />
        </div>
      </div>
    </div>
  );
};

export default ZylexPortrait;
