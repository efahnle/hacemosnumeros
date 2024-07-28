import { AiOutlinePlus } from "react-icons/ai";

interface AddExpenseButtonProps {
    onButtonClick: (buttonIndex: number) => void;
}

const AddExpenseButton: React.FC<AddExpenseButtonProps> = ({ onButtonClick }) => {
    return (
        <div className="flex justify-end items-center w-full h-full px-2  py-8 text-white">
            <button
                onClick={() => onButtonClick(3)}
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
            >
                <span className="flex items-center">Agregar</span>
                <AiOutlinePlus className="flex-shrink-0" />
            </button>
        </div>
    )
}

export default AddExpenseButton;