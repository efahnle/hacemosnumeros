import React from 'react';
import { AiOutlineLeft, AiOutlineCheck, AiOutlineUser } from 'react-icons/ai';

interface ButtonBarProps {
  onButtonClick: (buttonIndex: number) => void;
  loading: boolean;
}

const ButtonBar: React.FC<ButtonBarProps> = ({ onButtonClick, loading }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 flex justify-evenly">
      <button
        onClick={() => onButtonClick(1)}
        className={`bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        <span className="flex items-center"><AiOutlineLeft />
          <AiOutlineUser className="flex-shrink-0" />
        </span>
      </button>
      <button
        onClick={() => onButtonClick(2)}
        className={`bg-green-500 px-4 py-2 rounded hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Loading...' : <AiOutlineCheck />}
      </button>
    </div>
  );
};

export default ButtonBar;