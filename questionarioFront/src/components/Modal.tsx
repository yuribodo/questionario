import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white text-black rounded-lg overflow-hidden'>
        <div className='p-4'>
          {children}
          <button
            onClick={onClose}
            className='bg-red-500 text-white p-2 rounded-md mt-4'
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
