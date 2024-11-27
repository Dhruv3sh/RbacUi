import React from 'react';
import useCurrentUser from '../context/UserContext';

function Profile() {
  const { currentUser } = useCurrentUser();

  return (
    <div className=" bg-gray-100 flex flex-col items-center">
      
      <h1 className="text-center text-4xl font-bold text-gray-800 p-4 border-b-4 border-indigo-500">
        Profile
      </h1>

      
      <div className="mt-8 bg-white h-auto w-full max-w-lg p-6 rounded-lg shadow-lg border border-gray-200">
        
        <div className="flex flex-col items-center mb-6">
          <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold text-3xl">
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
          <p className="text-lg font-medium text-gray-600 mt-2">Welcome, {currentUser?.name}</p>
        </div>

        
        <div className="space-y-4">
          <p className="text-xl font-semibold text-gray-700">
            <span className="text-gray-500">Name: </span>
            {currentUser?.name || "N/A"}
          </p>
          <p className="text-xl font-semibold text-gray-700">
            <span className="text-gray-500">Email: </span>
            {currentUser?.email || "N/A"}
          </p>
          <p className="text-xl font-semibold text-gray-700">
            <span className="text-gray-500">Role: </span>
            {currentUser?.role || "N/A"}
          </p>
          <p className="text-xl font-semibold text-gray-700">
            <span className="text-gray-500">Permissions: </span>
            {currentUser?.permissions?.length
              ? currentUser.permissions.join(", ")
              : "N/A"}
          </p>
          <p className="text-xl font-semibold text-gray-700">
            <span className="text-gray-500">Status: </span>
            {currentUser?.status || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
