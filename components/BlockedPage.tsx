// components/BlockedPage.js
import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'; // Heroicons for the warning icon
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react'; // Assuming you are using next-auth for authentication

const BlockedPage = () => {


  const handleLogout = async () => {
    await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}` });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center max-w-md mx-auto">
        <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You have been blocked by the admin. Please contact support if you believe this is a mistake.
        </p>
        <div className='flex gap-3  justify-center'>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-400 text-white rounded-lg shadow hover:bg-red-600 transition duration-200 
          "
        >
          Try Again
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-400 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200 "
        >
          Logout
        </button>
        </div>
      </div>
    </div>
  );
};

export default BlockedPage;
