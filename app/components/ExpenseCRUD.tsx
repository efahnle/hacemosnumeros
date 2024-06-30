import DropdownComponent from "@/app/components/DropdownComponent";

export const ExpenseCrud = () => {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-16 align-middle h-16">
      <div className=" text-left  text-slate-500">¿Quién hizo el gasto?</div>
        <DropdownComponent/>
      <div className=" text-left  text-slate-500">¿Cuánto gastó?</div>
      <div>
        <input type="number" id="amount" className="bg-gray-10 align-middle text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="$100" required />
      </div>
      <div className=" text-left  text-slate-500">¿Entre quienes?</div>
      <DropdownComponent multiSelect={true}/>
      <div className=" text-left  text-slate-500">¿En qué?</div>
      <div>
        <input type="text" id="description" className="bg-gray-10 align-middle text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Pan y queso" required />
      </div>

    </div>
  );
};