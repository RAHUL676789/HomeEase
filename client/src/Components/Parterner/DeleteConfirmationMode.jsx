import React, { useEffect } from "react";
import Button from "../buttons/Button";

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
          <Button
            onClick={()=>cancel()}
           variant="cancel"
          >
            Cancel
          </Button>
          <Button

            onClick={() => confirmDelete(data)}
            variant="delete"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationMode;
