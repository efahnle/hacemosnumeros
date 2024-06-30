import DropdownComponent from "@/app/components/DropdownComponent";
import { useState } from 'react';

interface ExpenseCrudProps {
  onInputChange: (name: string, value: any) => void;
}

export const ExpenseCrud: React.FC<ExpenseCrudProps> = ({ onInputChange }) => {
  const [payer, setPayer] = useState<string>('');
  const [amount, setAmount] = useState<number | ''>('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');

  const handlePayerChange = (value: string) => {
    setPayer(value);
    onInputChange('payer', value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(value);
    onInputChange('amount', value);
  };

  const handleParticipantsChange = (value: string[]) => {
    setParticipants(value);
    onInputChange('participants', value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value);
    onInputChange('description', value);
  };

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-16 align-middle h-16">
      <div className="text-left text-slate-500">¿Quién hizo el gasto?</div>
      <DropdownComponent onSelect={handlePayerChange} />

      <div className="text-left text-slate-500">¿Cuánto gastó?</div>
      <div>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          className="bg-gray-10 align-middle text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="$100"
          required
        />
      </div>

      <div className="text-left text-slate-500">¿Entre quienes?</div>
      <DropdownComponent multiSelect={true} onSelect={handleParticipantsChange} />

      <div className="text-left text-slate-500">¿En qué?</div>
      <div>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="bg-gray-10 align-middle text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Pan y queso"
          required
        />
      </div>
    </div>
  );
};