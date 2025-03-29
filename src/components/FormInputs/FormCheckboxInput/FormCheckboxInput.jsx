import { generateUniqueId } from "../../../utils/helpers";
import "../FormInputs.css";
import "./FormCheckboxInput.css";

export default function FormCheckboxInput({
  id=generateUniqueId(),
  checked,
  onChange,
  inputName
}) {
  return (
    <div className="form-checkbox-container">
      <input
        id={id}
        type="checkbox"
        className="form-checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{inputName}</label>
    </div>
  )
}