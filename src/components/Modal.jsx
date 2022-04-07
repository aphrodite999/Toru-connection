import React from 'react';

const Modal = ( {isOpen, onRequestClose, children} ) => {

  return (
    <>
      {
        isOpen ?
          <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform
                transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
               <div className={'inline-block flex align-end'}>
                 <button type="button"
                         onClick={onRequestClose}
                         className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto
                        inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                 >
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                     <path fillRule="evenodd"
                           d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0
                          01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                           clipRule="evenodd"/>
                   </svg>
                 </button>
               </div>
                {children}
              </div>
            </div>
          </div>
          : null
      }
    </>
  );
};

export default Modal;