import { useRef, useEffect } from "react";
import "./UserListItem.css";

import FallbackAvatar from "../../assets/account_circle.svg"
import ConfirmationDialog from "../Dialogs/ConfirmationDialog/ConfirmationDialog";
import EditUserDialog from "../Dialogs/EditUserDialog/EditUserDialog";

export default function UserListItem({ id, first_name, last_name, email, avatar }) {
  const confirmationDialogRef = useRef(null);
  const editUserDialogRef = useRef(null);
  const openEditDialog = () => {
    editUserDialogRef.current?.showModal();
  }
  const openDeleteDialog = () => {
    confirmationDialogRef.current?.showModal();
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
          <button className="user-list-item-edit-button" onClick={openEditDialog}>Edit</button>
          <button className="user-list-item-delete-button" onClick={openDeleteDialog}>Delete</button>
        </section>
      </div>
      <ConfirmationDialog
        referrer={confirmationDialogRef}
        title="Confirm to delete user"
        message=<>{`Name: ${first_name} ${last_name}`}<br />{`Email: ${email}`}</>
        confirmButtonText="Delete"
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