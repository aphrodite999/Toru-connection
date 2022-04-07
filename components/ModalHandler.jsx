import React from 'react';
import { useRouter } from 'next/router';
import Modal from './Modal';
import MagicModal from './MagicModal';

const ModalHandler = () => {
  const router = useRouter()
  
  return (
    <>
      <Modal
        isOpen={!!router.query.magic}
        onRequestClose={() => router.push(router.pathname)}
      ><MagicModal/></Modal>
    </>
  );
};

export default ModalHandler;