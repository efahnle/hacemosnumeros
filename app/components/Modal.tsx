import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  simplifyStatus: boolean
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, message, simplifyStatus }) => {
  if (!isOpen) return null;
  console.log(simplifyStatus)

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded shadow-lg z-10">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className='text-red-700 mb-8'>
           Se recomienda tener habilitada la función Simplificar. Podés tildarla en la barra de abajo
        </p>
        <p className="mb-8">
            No habilitar esta función resultará en más cantidad de pagos, aunque el resultado final será el mismo
        </p>
        <p className="mb-6">
            {message}
        </p>
        <div className="flex justify-evenly">
          <button
            onClick={onClose}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-700"
          >
            Volver
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          > 
            Seguir sin simplificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;