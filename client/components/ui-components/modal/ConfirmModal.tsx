import React from 'react';

interface ConfirmProps {
   show: boolean;
   handleClose: () => void;
   callback: any;
   text: string;
}

export const ConfirmModal: React.FC<ConfirmProps> = ({ handleClose, callback, show, text }) => {
   return (
      <>
         <div
            className={
               'fixed bg-gray-600/40 backdrop-blur-sm min-h-screen w-screen justify-center items-center flex top-0 left-0 ' +
               (show ? 'flex' : 'hidden')
            }
         >
            <div className='fixed flex flex-col h-1/2 w-1/2 dark:bg-background bg-disabled dark:text-foreground rounded-lg items-center justify-center overflow-hidden shadow-md'>
               <div className='p-1 my-2 mx-4 text-xl text-foreground text-center'>{text}</div>
               <div className='flex flex-row h-full w-full'>
                  <button
                     onClick={handleClose}
                     className='p-5 flex-grow h-full dark:hover:bg-purple hover:bg-teal text-orange hover:text-background-secondary text-xl'
                  >
                     Cancel
                  </button>
                  <button
                     onClick={callback}
                     className='p-5 flex-grow h-full dark:hover:bg-purple hover:bg-teal text-accent hover:text-background-secondary text-xl'
                  >
                     Confirm
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};
