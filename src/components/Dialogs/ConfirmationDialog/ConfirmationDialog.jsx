import { useEffect, useRef } from "react";
import "./ConfirmationDialog.css";
import "../Dialog.css";

export default function ConfirmationDialog({
  referrer,
  title,
  message,
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Confirm',
  onConfirm = () => { referrer.current.close() },
  onClose = () => { referrer.current.close() }
}) {
  const formRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) { // Close dialog on clicking outside
      if ((referrer.current && formRef.current) && !formRef.current.contains(e.target)) {
        referrer.current.close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  return (
    <dialog className="dialog confirmation-dialog" ref={referrer}>
      <form method='dialog' ref={formRef}>
        <div className='dialog-text'>
          <h5 className='dialog-title'>{title}</h5>
          <p className='dialog-message'>{message}</p>
        </div>
        <div className='dialog-buttons'>
          <button className='dialog-button cancel-button' onClick={onClose} autoFocus>{cancelButtonText}</button>
          <button className='dialog-button confirm-button' onClick={onConfirm}>{confirmButtonText}</button>
        </div>
      </form>
    </dialog>
  )
}