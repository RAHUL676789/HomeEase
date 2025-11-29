const NotLogin = ({ handleNavigate }) => {
  return (
    <div className="h-screen w-screen fixed inset-0 bg-black/20 flex justify-center items-center flex-col p-5">
      <div className="w-full md:w-[50vw] bg-white p-6 rounded">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          You’re Not Logged In
        </h2>

        <p className="text-center text-gray-600 text-sm">
          To continue, please log in with your admin account.
        </p>

        <div className="flex flex-col gap-3 mt-4">
          <p className="text-sm text-gray-600 text-center">
            Are you an admin?{" "}
            <span
              onClick={() => handleNavigate("/login")}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotLogin;
