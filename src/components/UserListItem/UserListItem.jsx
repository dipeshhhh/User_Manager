import { useRef, useState } from "react";
import axios from "axios";
import "./UserListItem.css";
import { useUserListContext } from "../../contexts/UserListContext";
import { toast } from "react-toastify";

import ConfirmationDialog from "../Dialogs/ConfirmationDialog/ConfirmationDialog";
import EditUserDialog from "../Dialogs/EditUserDialog/EditUserDialog";

import FallbackAvatar from "../../assets/account_circle.svg";
import EditIcon from "../../assets/edit.svg";
import DeleteIcon from "../../assets/delete.svg";

export default function UserListItem({ id, first_name, last_name, email, avatar }) {
  const [isLoading, setIsLoading] = useState(false);
  const confirmationDialogRef = useRef(null);
  const editUserDialogRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { deleteUser } = useUserListContext();

  const openEditDialog = () => {
    editUserDialogRef.current?.showModal();
  }
  const openDeleteDialog = () => {
    confirmationDialogRef.current?.showModal();
  }

  const confirmDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.delete(`${BASE_URL}/users/${id}`);
      if (response.status < 200 || response.status > 299) throw new Error("deletion failed");
      deleteUser(id);
      toast.success("User deleted successfully");
      confirmationDialogRef.current.close();
    } catch (error) {
      toast.error(`Error: ${error}`)
    } finally {
      setIsLoading(false);
      confirmationDialogRef.current?.close();
    }
  }

  return (
    <li className="user-list-item">
      <img
        className="user-list-item-image"
        src={avatar || FallbackAvatar}
        loading="lazy"
        alt="User profile"
      />
      <div className="user-list-item-right">
        <section className="user-list-item-detail-section">
          <div>{first_name} {last_name}</div>
          <div>{email}</div>
        </section>
        <section className="user-list-item-button-section">
          <button className="user-list-item-edit-button" onClick={openEditDialog}>
            <img src={EditIcon} />
            Edit
          </button>
          <button className="user-list-item-delete-button" onClick={openDeleteDialog}>
            <img src={DeleteIcon} />
            Delete
          </button>
        </section>
      </div>
      <ConfirmationDialog
        referrer={confirmationDialogRef}
        title="Confirm to delete user"
        message=<>{`Name: ${first_name} ${last_name}`}<br />{`Email: ${email}`}</>
        confirmButtonText={isLoading ? "Loading..." : "Delete"}
        onConfirm={confirmDelete}
      />
      <EditUserDialog
        referrer={editUserDialogRef}
        id={id}
        first_name={first_name}
        last_name={last_name}
        email={email}
        avatar={avatar}
      />
    </li>
  )
}