import { useState, useEffect } from "react";
import heroData from "./HeroData.js";
import SlideItem from "./SlideItem";
import ToastContainer from "../Other/ToastContainer.jsx";

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [toast, settoast] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative  bg-[#f0fdf4] py-10 px-4 md:px-16">
      {toast == true && <ToastContainer type={"error"} content={"error content"}/>}
      <SlideItem data={heroData[current]} />
    </div>
  );
}

export default HeroSlider;
