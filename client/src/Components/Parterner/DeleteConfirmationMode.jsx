import React, { useEffect } from "react";

const DeleteConfirmationMode = ({ confirmDelete, cancel, data }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    return () => (body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 ">
      <div className="bg-white w-80 rounded shadow-lg p-6 transform transition-all scale-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Confirm Deletion
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={()=>cancel()}
            className="px-5 py-2 rounded-3xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => confirmDelete(data)}
            className="px-5 py-2 rounded-3xl bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationMode;
