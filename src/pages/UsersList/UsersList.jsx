import { useEffect, useState, useRef } from "react";
import "./UsersList.css"
import NavBar from "../../components/NavBar/NavBar.jsx";
import SearchBar from "../../components/Searchbar/Searchbar.jsx";
import UserListItem from "../../components/UserListItem/UserListItem.jsx";
import PaginationBar from "../../components/PaginationBar/PaginationBar.jsx";
import axios from "axios";

export default function UsersList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // Maybe handle this in a context
  const [users, setUsers] = useState([]);
  const allUsers = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function getUsers(pageNumber = 1) {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/users?page=${pageNumber}`);
        allUsers.current = response.data.data;
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch (errors) {
        // handle errors
        console.error(errors);
      } finally {
        setIsLoading(false);
      }
    }
    getUsers(pageNumber);
  }, [pageNumber])

  function searchClient(query) {
    // TODO: implement client side search.
  }

  return (
    <div className="page-body user-list-page">
      <NavBar />
      <main className="page-main user-list-page-main">
        <SearchBar />
        <PaginationBar
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={totalPages}
        />
        {isLoading ?
          "Loading..."
          :
          <ul className="users-list">
            {users.map((user) => (
              <UserListItem
                key={user.id}
                id={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                email={user.email}
                avatar={user.avatar}
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

const exampleData = {
  "page": 1,
  "per_page": 6,
  "total": 12,
  "total_pages": 2,
  "data": [
    {
      "id": 1,
      "email": "george.bluth@reqres.in",
      "first_name": "George",
      "last_name": "Bluth",
      "avatar": "https://reqres.in/img/faces/1-image.jpg"
    },
    {
      "id": 2,
      "email": "janet.weaver@reqres.in",
      "first_name": "Janet",
      "last_name": "Weaver",
      "avatar": "https://reqres.in/img/faces/2-image.jpg"
    },
    {
      "id": 3,
      "email": "emma.wong@reqres.in",
      "first_name": "Emma",
      "last_name": "Wong",
      "avatar": "https://reqres.in/img/faces/3-image.jpg"
    },
    {
      "id": 4,
      "email": "eve.holt@reqres.in",
      "first_name": "Eve",
      "last_name": "Holt",
      "avatar": "https://reqres.in/img/faces/4-image.jpg"
    },
    {
      "id": 5,
      "email": "charles.morris@reqres.in",
      "first_name": "Charles",
      "last_name": "Morris",
      "avatar": "https://reqres.in/img/faces/5-image.jpg"
    },
    {
      "id": 6,
      "email": "tracey.ramos@reqres.in",
      "first_name": "Tracey",
      "last_name": "Ramos",
      "avatar": "https://reqres.in/img/faces/6-image.jpg"
    },
    {
      "id": 7,
      "email": "tracey.ramos@reqres.in",
      "first_name": "Tracey",
      "last_name": "Ramos",
      "avatar": ""
    }
  ],
  "support": {
    "url": "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral",
    "text": "Tired of writing endless social media content? Let Content Caddy generate it for you."
  }
}