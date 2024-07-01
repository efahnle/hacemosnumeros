import { AiOutlineLeft} from 'react-icons/ai'; 
import { FaWhatsapp } from 'react-icons/fa'


interface ResultsBarProps {
  onButtonClick: (buttonIndex: number) => void;
}


const ResultsBar: React.FC<ResultsBarProps> = ({ onButtonClick }) => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 flex justify-evenly">
          <button
            onClick={() => onButtonClick(1)}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
          >
            <AiOutlineLeft/>
          </button>
          <button
            onClick={() => onButtonClick(3)}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
          >
            <FaWhatsapp />
          </button>
        </div>
      );
}

export default ResultsBar;