import React from 'react'


const UserNotLogin = ({handleNavigate}) => {


  return (
    <div className="fixed inset-0 h-screen w-screen bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded shadow-xl p-6 flex flex-col gap-4 animate-fadeIn">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          You’re not logged in
        </h2>
        <p className="text-gray-600 text-center text-sm">
          To continue, please create an account or log in.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <button onClick={()=>handleNavigate("/signup")}  className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
            Sign up
          </button>
          <p className="text-sm text-gray-600 text-center">
            Already a user?{" "}
            <span onClick={()=>handleNavigate("/login")} className="text-blue-600 font-medium cursor-pointer hover:underline">
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserNotLogin
