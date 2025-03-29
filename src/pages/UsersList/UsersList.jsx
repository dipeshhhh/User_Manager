import { useEffect, useState, useRef } from "react";
import "./UsersList.css"
import NavBar from "../../components/NavBar/NavBar.jsx";
import SearchBar from "../../components/Searchbar/Searchbar.jsx";
import UserListItem from "../../components/UserListItem/UserListItem.jsx";
import PaginationBar from "../../components/PaginationBar/PaginationBar.jsx";
import axios from "axios";
import { useUserListContext } from "../../contexts/UserListContext.jsx";
import { toast, ToastContainer } from "react-toastify";

export default function UsersList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { userList, setUserList, originalUserListRef } = useUserListContext();
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function getUsers(pageNumber = 1) {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/users?page=${pageNumber}`);
        originalUserListRef.current = response.data.data;
        setUserList(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch (errors) {
        // handle errors
        toast.error(`Error: ${errors}`)
      } finally {
        setIsLoading(false);
      }
    }
    getUsers(pageNumber);
  }, [pageNumber])

  return (
    <div className="page-body user-list-page">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      // transition={Bounce}
      />
      <NavBar />
      <main className="page-main user-list-page-main">
        <SearchBar />
        {/* <PaginationBar
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={totalPages}
        /> */}
        {isLoading ?
          "Loading..."
          :
          <ul className="users-list">
            {userList.map((user) => (
              <UserListItem
                key={user?.id}
                id={user?.id}
                first_name={user?.first_name}
                last_name={user?.last_name}
                email={user?.email}
                avatar={user?.avatar}
              />
            ))}
          </ul>
        }
        <PaginationBar
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={totalPages}
        />
      </main>
    </div>
  )
}