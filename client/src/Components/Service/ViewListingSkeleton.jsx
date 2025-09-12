import React from "react";
import SkeleTonCard from "./SkeleTonCard";

const ViewListingSkeleton = () => {
  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className="h-full w-full flex">
        {/* Sidebar skeleton */}
        <div className="flex flex-col min-h-screen md:w-1/4 gap-3 shadow-sm border-r px-5 py-4 bg-gray-50">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="w-full h-10 rounded-md animate-pulse bg-gray-200"
            ></div>
          ))}
        </div>

        {/* Main content skeleton */}
        <div className="overflow-y-auto w-full md:w-3/4 p-6 space-y-6">
          {/* Top search/filter bar */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-2/5 rounded-md animate-pulse bg-gray-200"></div>
            <div className="h-10 w-1/5 rounded-md animate-pulse bg-gray-200"></div>
            <div className="h-10 w-1/5 rounded-md animate-pulse bg-gray-200"></div>
          </div>

          {/* Card grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
           <SkeleTonCard/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewListingSkeleton;
