import { useEffect, useRef, useState } from "react";
import "./EditUserDialog.css";
import "../Dialog.css";
import { capitalizeFirstLetter, isShallowCopy, validateEmail, validateName } from "../../../utils/helpers";

import FallBackAvatar from "../../../assets/account_circle.svg";
import FormTextInput from "../../FormInputs/FormTextInput/FormTextInput";
import axios from "axios";
import { useUserListContext } from "../../../contexts/UserListContext";
import { toast } from "react-toastify";

export default function EditUserDialog({
  referrer,
  id,
  first_name,
  last_name,
  email,
  avatar
}) {
  const originalDataRef = useRef({ id, first_name, last_name, email, avatar });
  const [userInputs, setUserInputs] = useState({ id, first_name, last_name, email, avatar });
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { updateUser } = useUserListContext();

  useEffect(() => {
    function handleClickOutside(e) {
      if ((referrer.current && formRef.current) && !formRef.current.contains(e.target)) {
        resetChanges();
        referrer.current.close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  const handleFirstNameInput = (e) => {
    setUserInputs({ ...userInputs, first_name: capitalizeFirstLetter(e.target.value) });
  }
  const handleLastNameInput = (e) => {
    setUserInputs({ ...userInputs, last_name: capitalizeFirstLetter(e.target.value) });
  }
  const handleEmailInput = (e) => {
    setUserInputs({ ...userInputs, email: e.target.value });
  }

  const validateData = () => {
    if (!userInputs.first_name || !userInputs.last_name || !userInputs.email) {
      toast.error("Error: missing inputs");
      return false;
    }
    if (!validateName(userInputs.first_name)) {
      toast.error("Error: invalid first name");
      return false;
    }
    if (!validateName(userInputs.last_name)) {
      toast.error("Error: invalid last name");
      return false;
    }
    if (!validateEmail(userInputs.email)) {
      toast.error("Error: invalid email");
      return false;
    }
    return true;
  }

  const onConfirm = async (e) => {
    e.preventDefault();
    if (!validateData()) return;
    if (isShallowCopy(userInputs, originalDataRef.current)) {
      // If nothing is changed
      toast.warn("No changes made");
      referrer.current?.close();
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/users/{id}`,
        userInputs,
        { headers: { "Content-Type": "application/json" } }
      )
      updateUser(id, response.data);
      toast.success("User edited successfully")
      referrer.current?.close();
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }
  const onClose = () => {
    resetChanges();
    referrer.current.close()
  }

  const resetChanges = () => {
    setUserInputs(originalDataRef.current);
  }

  return (
    <dialog className="dialog edit-user-dialog" ref={referrer}>
      <form ref={formRef} onSubmit={onConfirm}>
        <div className="dialog-text">
          <h5 className="dialog-title">Edit User</h5>
          <section className="user-edit-form">
            <img
              className="form-user-image"
              src={userInputs.avatar || FallBackAvatar}
              loading="lazy"
              alt="User profile"
            />
            <FormTextInput
              autoFocus
              inputName="First name"
              inputType="text"
              inputValue={userInputs.first_name}
              handleInput={handleFirstNameInput}
              required={true}
            />
            <FormTextInput
              inputName="Last name"
              inputType="text"
              inputValue={userInputs.last_name}
              handleInput={handleLastNameInput}
              required={true}
            />
            <FormTextInput
              inputName="Email"
              inputType="email"
              inputValue={userInputs.email}
              handleInput={handleEmailInput}
              required={true}
            />
          </section>
        </div>
        <div className="dialog-buttons">
          <button className="dialog-button cancel-button" onClick={onClose}>Cancel</button>
          <button type="submit" className="dialog-button confirm-button">{isLoading ? "Loading..." : "Edit"}</button>
        </div>
      </form>
    </dialog>
  )
}