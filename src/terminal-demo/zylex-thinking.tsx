import "./zylex-thinking.css";
import { useState, useEffect, useRef } from "react";

const ZylexThinking = () => {
  const [loadingText, setLoadingText] = useState("ZYLEX IS THINKING");
  const numberRef = useRef(0);

  const animateLoading = () => {
    if (numberRef.current === 10) {
      setLoadingText("ZYLEX IS THINKING");
      numberRef.current = 0;
    } else {
      setLoadingText((prevText) => prevText + ".");
      numberRef.current += 1;
    }
  };

  useEffect(() => {
    const loadingTimeoutRef = setTimeout(animateLoading, 150);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(loadingTimeoutRef);
  }, [loadingText]);

  return <div className="zylex-typing">{loadingText}</div>;
};

export default ZylexThinking;
