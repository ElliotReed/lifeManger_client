import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Modal.module.scss";

const modalElement = document.getElementById("modal-root");

export function Modal({ children, fade = false, defaultOpened = false }, ref) {
  const [isOpen, setIsOpen] = useState(defaultOpened);

  const close = useCallback(() => setIsOpen(false), []);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close]
  );

  const handleEscape = useCallback(
    (event) => {
      if (event.keyCode === 27) close();
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return createPortal(
    isOpen ? (
      <div className={classnames(styles.Modal, fade ? styles.fade : "")}>
        <div className={styles.overlay} onClick={close} />
        <div className={styles.body}>
          <div className={styles.bar__top}>
            <span
              role="button"
              className={styles.bar__top}
              aria-label="close"
              onClick={close}
            >
              <FontAwesomeIcon icon={["fas", "times"]} />
            </span>
          </div>
          {children}
        </div>
      </div>
    ) : null,
    modalElement
  );
}

export default forwardRef(Modal);
