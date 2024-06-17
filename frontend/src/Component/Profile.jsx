import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
  const { username } = useParams();
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-teal-500 to-teal-700 dark:bg-gray-800 text-black dark:text-white p-8 md:p-8 rounded-lg shadow-md w-screen h-full md:h-screen">
      <div className="flex items-center mb-4 mt-10">
        <div className="flex flex-col items-center justify-center">
          <img
            src={user?.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full mb-4"
          />
            <button
              type="button"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md"
              onClick={() => navigate("/edit-avatar")}
            >
              Edit
            </button>
        </div>
        <div className="ml-3">
          <h2 className="text-lg font-bold">{user?.username}</h2>
          <p className="text-sm">{user?.fullname}</p>
          <p className="text-sm">Score: {user?.score}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
