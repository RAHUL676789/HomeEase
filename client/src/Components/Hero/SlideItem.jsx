function SlideItem({ data }) {
    console.log(data);
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-teal-800 mb-4">{data.title}</h1>
        <p className="text-gray-700 text-md md:text-lg mb-6">{data.desc}</p>
        <button className="bg-teal-700 text-white px-6 py-3 rounded-full hover:bg-teal-800 transition">{data.btnText}</button>
      </div>
      <div className="flex-1">
        <img src={data.img} alt="hero" className="w-full max-w-md min-h-[50vh] object-cover mx-auto drop-shadow-xl" />
      </div>
    </div>
  );
}

export default SlideItem;
