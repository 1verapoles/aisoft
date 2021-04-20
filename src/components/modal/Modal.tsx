import React from 'react';
import Portal from '../portal/Portal';

import './Modal.scss';

interface IModalProps {
  text: string;
  onCancel: () => void;
}

const Modal: React.FC<IModalProps> = ({ onCancel, text }) => {

  return (
    <>
      <Portal>
        <div className="modalOverlay">
          <div className="modalWindow">
            {text}
            <button className="modal-btn" onClick={onCancel}>&times;</button>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default Modal;