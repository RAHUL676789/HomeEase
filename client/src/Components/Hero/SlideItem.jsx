import { easeIn, easeInOut, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SlideItem({ data, direction }) {
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300, // next = right to left, prev = left to right
      opacity: 0.8,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300, // opposite side
      opacity: 0,
    }),
  };

  const navigate = useNavigate();

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.7, ease: easeIn }}
      className="flex flex-col-reverse   md:flex-row items-center justify-between gap-10 w-[100%]"
    >
      <div className="flex-1 text-center  md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-teal-800 mb-4">
          {data.title}
        </h1>
        <p className="text-gray-700 text-md md:text-lg mb-6">{data.desc}</p>
        <button onClick={()=>navigate(`/services/${data?.category}`,{
          state:data?.category
        })} className="bg-teal-700 text-white px-6 py-3 rounded-full hover:bg-teal-800 transition">
          {data.btnText}
        </button>
      </div>
      <div className="flex-1">
        <img
          src={data.img}
          alt="hero"
          className="w-full max-w-md min-h-[50vh] object-cover mx-auto drop-shadow-xl"
        />
      </div>
    </motion.div>
  );
}

export default SlideItem;
