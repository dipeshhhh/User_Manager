import { createContext, useContext, useState, useRef } from "react";

const UserListContext = createContext({});

export function useUserListContext() {
  return useContext(UserListContext);
}

export function UserListProvider({ children }) {
  // Separating original list and the list that will be shown for implementation of client side searching/filtering. (No need for separation if searching within servers).
  const [userList, setUserList] = useState([]);
  const originalUserListRef = useRef();

  const deleteUser = (userId) => { // Optimistic deleting
    originalUserListRef.current = originalUserListRef.current?.filter(user => user.id !== userId);
    setUserList(userList.filter(user => user.id !== userId));
  }

  const updateUser = (userId, userData) => { // Optimistic updating
    originalUserListRef.current = originalUserListRef.current?.map(user => (user.id === userId) ? { ...user, ...userData } : user)
    setUserList(userList.map(user => (
      user.id === userId ? { ...user, ...userData } : user
    )))
  }

  const searchUsers = (query, fields = ["first_name", "last_name", "email", "full_name"]) => {
    if (!query) {
      originalUserListRef.current && setUserList(originalUserListRef.current)
      return;
    }
    setUserList(
      originalUserListRef.current.filter(user =>
        fields.some(field => {
          if (field === "full_name") {
            return `${user.first_name} ${user.last_name}`.toLowerCase().includes(query.toLowerCase());
          }
          return user[field]?.toLowerCase().includes(query.toLowerCase())
        })
      )
    );
  };

  return (
    <UserListContext.Provider value={{
      userList,
      setUserList,
      originalUserListRef,
      deleteUser,
      updateUser,
      searchUsers
    }}>
      {children}
    </UserListContext.Provider>
  )
}