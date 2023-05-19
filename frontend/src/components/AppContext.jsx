import { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [user, setUser] = useState('peter');
  useEffect(()=> {
    const getData = async () => {
      const res = await fetch("/api/isLogedIn", {
        method: 'GET',
        credentials: "same-origin"
      });
      console.log(res)
      const data = await res.json();
      console.log(data)
      setUser(data.user);
  }
  getData();
  },[]);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
