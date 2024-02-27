import { useContext, createContext, useState, useCallback } from "react";

// 1. Create the context
const UserContext = createContext();

// Custom provider component for this context.
export const UserProvider = (props) => {

  // store the current user in state at the top level
  const [currentUser, setCurrentUser] = useState({});

  // sets user object in state, shared via context
  const handleUpdateUser = useCallback((user) => {
    setCurrentUser(user);
  }, []);

  // clear state to logout user
  const handleLogout = () => {
    setCurrentUser({});  
    localStorage.removeItem('user');
  }

  
   // 2. Provide the context.
 // The Provider component of any context (UserContext.Provider)
 // sends data via its value prop to all children at every level.
 // We are sending both the current user and an update function
  return (
    <UserContext.Provider value={{ currentUser, handleUpdateUser, handleLogout }}>
      {props.children}
    </UserContext.Provider>
  );
};

// 3. Use the context. This custom hook allows easy access
// of this particular context from any child component
export const useUserContext = () => {
  return useContext(UserContext);
};
