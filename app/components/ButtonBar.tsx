
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'; // Import an icon from react-icons

interface ButtonBarProps {
  onButtonClick: (buttonIndex: number) => void;
}

const ButtonBar: React.FC<ButtonBarProps> = ({ onButtonClick }) => {
  const [isRadioOn, setIsRadioOn] = useState<boolean>(false);

  useEffect(() => {
    const simplifySetting = localStorage.getItem('simplify');
    if (simplifySetting) {
      setIsRadioOn(simplifySetting === 'true');
    }
  }, []);

  const handleRadioChange = () => {
    const newSimplifySetting = !isRadioOn;
    setIsRadioOn(newSimplifySetting);
    localStorage.setItem('simplify', String(newSimplifySetting));
    onButtonClick(2); // Optionally trigger action on button click
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 flex justify-evenly">
      <button
        onClick={() => onButtonClick(1)}
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
      >
        <AiOutlinePlus/>
      </button>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="radioButton"
          checked={isRadioOn}
          onChange={handleRadioChange}
          className="form-checkbox h-5 w-5 text-green-500"
        />
        <Link href="/simplificar" className="text-blue-300 underline">
          Simplificar (?)
        </Link>
      </div>
      <button
        onClick={() => onButtonClick(3)}
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
      >
        <AiOutlineCheck />
      </button>
    </div>
  );
};

export default ButtonBar;