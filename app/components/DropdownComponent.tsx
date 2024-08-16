import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { getNamesInGroup } from '@/app/lib/LocalStorageWrapper';

interface DropdownComponentProps {
  multiSelect?: boolean;
  onSelect: (value: any) => void;
  prePayer?: string
  preParticipants?: string[]
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ multiSelect = false, onSelect, prePayer, preParticipants }) => {
  const params = useParams<{group_id: string}>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedOptions = getNamesInGroup(Number(params['group_id']));

    

    if (storedOptions) {
      setOptions(storedOptions);
    }

    if (prePayer) {
        setSelectedOptions([prePayer]);
    } 
    if (preParticipants && preParticipants.length > 0) {
        setSelectedOptions(preParticipants);
    }

  }, []);


  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    let updatedOptions;
    if (multiSelect) {
      updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter(opt => opt !== option)
        : [...selectedOptions, option];
    } else {
      updatedOptions = [option];
      setIsOpen(false);
    }
    setSelectedOptions(updatedOptions);
    onSelect(multiSelect ? updatedOptions : option);
  };

  const renderSelectedOptions = () => {
    return selectedOptions.length > 0
      ? selectedOptions.join(', ')
      : multiSelect ? 'Elegí' : 'Elegí uno';
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={handleToggleDropdown}
      >
        {renderSelectedOptions()}
        <svg
          className="-mr-1 h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <button
                key={index}
                className={`text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${selectedOptions.includes(option) ? 'bg-gray-200' : ''}`}
                role="menuitem"
                tabIndex={-1}
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
