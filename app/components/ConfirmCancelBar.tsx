'use client'

import React  from 'react';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'; // Import an icon from react-icons

interface ConfirmCancelBarProps {
  onButtonClick: (buttonIndex: number) => void;
}

const ConfirmCancelBar: React.FC<ConfirmCancelBarProps> = ({ onButtonClick }) => {
  
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 flex justify-evenly">
      <button
        onClick={() => onButtonClick(1)}
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
      >
        <AiOutlineCheck/>
      </button>
      <button
        onClick={() => onButtonClick(2)}
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
      >
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default ConfirmCancelBar;