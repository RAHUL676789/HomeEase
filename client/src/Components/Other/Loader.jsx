export default function Loader() {
  return (
    <div className="fixed inset-0 z-100 bg-black/1  flex items-center justify-center pointer-events-auto">
      <div className="relative w-8 h-8">
        {/* Rotating Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-b-transparent animate-spin"></div>

        {/* Inner Circle Glow */}
        <div className="absolute inset-2 rounded-full bg-white/30 backdrop-blur-md shadow-inner"></div>
      </div>
    </div>
  );
}
