"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-green-400 border-b-transparent animate-spin [animation-duration:2s]"></div>
      </div>
    </div>
  );
}
