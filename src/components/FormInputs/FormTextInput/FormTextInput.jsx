import "../FormInputs.css";
import "./FormTextInput.css";

import { generateUniqueId } from "../../../utils/helpers";

export default function FormTextInput({
  children,
  id = generateUniqueId(),
  inputName,
  inputType,
  inputValue,
  handleInput,
  required=false,
  autoFocus=false
}) {
  return (
    <div className="form-input-container">
      <label htmlFor={id}>{inputName}</label>
      <span className="form-text-input-section">
        <input
          id={id}
          className="form-text-input"
          type={inputType}
          placeholder={inputName}
          value={inputValue}
          onChange={handleInput}
          required={required}
          autoFocus={autoFocus}
        />
        {children}
      </span>
    </div>
  )
}