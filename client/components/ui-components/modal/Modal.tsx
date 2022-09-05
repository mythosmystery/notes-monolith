import React from 'react';

interface ModalProps {
   show: boolean;
}

export const Modal: React.FC<ModalProps> = ({ show, children }) => {
   return (
      <div
         className={
            'fixed bg-gray-600/40 backdrop-blur-sm h-screen w-screen justify-center items-center ' + show
               ? 'flex'
               : 'hidden'
         }
      >
         {children}
      </div>
   );
};
