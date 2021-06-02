import React from 'react';
import './Modal.module.scss';

export default function Modal(props) {
  if (!props.modalIsVisible) {
    return null
  };

  function handleOnKeyUp(e) {
    e = e || window.event;
    if (e.keyCode === 27) {
      props.handleModal(e)
    }
  };

  return (
    <dialog
      id="modal"
      className="modal"
      data-name='close'
      onClick={(e) => props.handleModal(e)}
      onKeyUp={(e) => handleOnKeyUp(e)}
    >
      <div className="modal__content">
      <div className="modal__icon-wrapper modal__close">
        <i
          className="material-icons"
          data-name='close'
          onClick={(e) => props.handleModal(e)}
        >
          clear
        </i>
      </div>
        {props.children}
      </div>
    </dialog>
  );
}