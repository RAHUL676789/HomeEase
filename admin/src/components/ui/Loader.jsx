import { useEffect } from "react";

export default function Loader() {
  useEffect(()=>{
    const body = document.querySelector("body");
    body.style.overflow="hidden"
    return ()=>body.style.overflow = "auto"
  })
  return (
    <div className="fixed  w-screen h-screen inset-0 z-50 bg-black/1  flex items-center justify-center pointer-events-auto">
      <div className="relative w-8 h-8">
        {/* Rotating Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-teal-500 border-b-transparent animate-spin"></div>

        {/* Inner Circle Glow */}
        <div className="absolute inset-2 rounded-full bg-white/30 backdrop-blur-md shadow-inner"></div>
      </div>
    </div>
  );
}
