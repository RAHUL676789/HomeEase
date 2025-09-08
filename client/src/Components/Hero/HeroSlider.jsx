import { useState, useEffect } from "react";
import heroData from "./HeroData.js";
import SlideItem from "./SlideItem";
import ToastContainer from "../Other/ToastContainer.jsx";
import { AnimatePresence } from "framer-motion";
import Button from "../buttons/Button.jsx"; // custom Button

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right → left, -1 = left → right
  const [toast, settoast] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % heroData.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + heroData.length) % heroData.length);
  };

  return (
    <div className="w-full relative inset-0 bg-[#f0fdf4] py-15 px-4 md:px-16">
      {toast && <ToastContainer type="error" content="error content" />}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <SlideItem key={current} data={heroData[current]} direction={direction} />
        </AnimatePresence>
      </div>

      {/* Navigation buttons - left & right */}
      <div className="absolute inset-y-1/2  w-full h-fit left-0 flex justify-between px-5">
        <Button onClick={goPrev} variant="next" children={"prev"}>
         <i className="ri-arrow-left-wide-line font-semibold"></i>
        </Button>
        <Button onClick={goNext} variant="next" children={"next"}>
         <i className="ri-arrow-right-wide-line font-semibold "></i>
        </Button>
      </div>
    </div>
  );
}

export default HeroSlider;
