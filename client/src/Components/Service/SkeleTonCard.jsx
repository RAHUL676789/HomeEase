import React from 'react'

const SkeleTonCard = () => {
  return (
    <>
       {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm  overflow-hidden"
              >
                {/* Image placeholder */}
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>

                {/* Card content */}
                <div className="p-4 space-y-3">
                  <div className="h-5 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
                  <div className="flex gap-2 mt-2">
                    <div className="h-8 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
    </>
  )
}

export default SkeleTonCard
