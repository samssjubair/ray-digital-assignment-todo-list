import React from 'react';
import { GoogleOutlined } from '@ant-design/icons';

const HomePage = ({handleClick}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome to Todo App</h1>
        <p className="text-lg text-center text-gray-600 mb-8">A simple and easy-to-use todo list manager.</p>
        <button onClick={handleClick} className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <GoogleOutlined className="mr-2" />
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default HomePage;
