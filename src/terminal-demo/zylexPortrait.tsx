import { GlitchHandle, useGlitch } from "react-powerglitch";
import "./zylexPortrait.css";
import { useState, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

enum portraitStates {
  off,
  flash,
  loading,
  ready,
}

interface ZylexPortraitProps {
  isOn: boolean;
}

const ZylexPortrait = (props: ZylexPortraitProps) => {
  const [portraitState, setPortraitState] = useState<portraitStates>(
    portraitStates.off
  );
  const [scope, animate] = useAnimate();
  const glitch: GlitchHandle = useGlitch({
    playMode: "always",
    timing: {
      duration: 800,
      iterations: 1,
    },
    slice: {
      hueRotate: false,
      count: 10,
      velocity: 25,
      minHeight: 0.1,
      maxHeight: 0.3,
    },
    shake: { velocity: 15, amplitudeX: 0.05, amplitudeY: 0.15 },
    pulse: false,
  });
  const images = [
    "art/wizard_happy.png",
    "art/wizard_closed.png",
    "art/wizard_angry.png",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (props.isOn) {
      setPortraitState(portraitStates.flash);
    } else {
      setPortraitState(portraitStates.off);
    }
  }, [props.isOn]);

  useEffect(() => {
    glitch.stopGlitch();
  }, []);

  useEffect(() => {
    if (portraitState === portraitStates.flash) {
      flashAnimation().then((_) => setPortraitState(portraitStates.loading));
    }
    if (portraitState === portraitStates.loading) {
      const timeout = setTimeout(
        (_) => setPortraitState(portraitStates.ready),
        4000
      );
      return () => {
        clearInterval(timeout);
      };
    }
  }, [portraitState]);

  useEffect(() => {
    const rotateImage = () => {
      glitch.startGlitch();
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

  async function flashAnimation() {
    await animate(
      scope.current,
      {
        opacity: 0.6,
        background:
          "linear-gradient(180deg, rgba(8,8,8,1) 5%, rgba(94,194,61,1) 40%, rgba(94,194,61,1) 45%, rgba(172,217,126,1) 50%, rgba(93,190,61,1) 55%, rgba(80,142,60,1) 60%, rgba(8,8,8,1) 95%)",
      },
      { delay: 0.3, duration: 0.02 }
    );
    await animate(
      scope.current,
      { opacity: 0 },
      { ease: "easeOut", duration: 0.01 }
    );
    await animate(scope.current, { opacity: 0 }, { duration: 0.2 });
  }

  return (
    <div className={`screen-border side-screen`}>
      <div
        className={`screen${
          portraitState == portraitStates.off ? " off" : ""
        }`}>
        {portraitState == portraitStates.flash ? (
          <motion.div
            className="screen-flash"
            ref={scope}
          />
        ) : portraitState == portraitStates.ready ? (
          <div className="zylex-portrait">
            <img
              ref={glitch.ref}
              src={images[currentImageIndex]}
              alt="Zylex Portrait"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ZylexPortrait;
