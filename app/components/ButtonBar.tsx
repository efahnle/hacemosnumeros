import React, {useState} from 'react';
import Link from 'next/link';

interface ButtonBarProps {
  onButtonClick: (buttonIndex: number) => void;
}

const ButtonBar: React.FC<ButtonBarProps> = ({ onButtonClick }) => {
  const [isRadioOn, setIsRadioOn] = useState(false)

  const handleRadioChange = () => {
    setIsRadioOn(!isRadioOn);
    onButtonClick(2);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 flex justify-evenly">
      <button
        onClick={() => onButtonClick(1)}
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
      >
        + Agregar gasto
      </button>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="radioButton"
          checked={isRadioOn}
          onChange={handleRadioChange}
          className="form-checkbox h-5 w-5 text-green-500"
        />
        <label htmlFor="radioButton" className="mr-2">Simplificar</label>
        <Link href="/simplificar" className="text-blue-300 underline">
          ¿Qué es esto?
        </Link>
      </div>
      <button
        onClick={() => onButtonClick(3)}
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
      >
        Finalizar
      </button>
    </div>
  );
};

export default ButtonBar;