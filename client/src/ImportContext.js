import { createContext, useState, useEffect } from "react";

const ImportContext = createContext();

export function ValueProvider({ children }) {
  const [datos, setDatos] = useState([]);

  const importNumber = async () => {
    try {
      const response = await fetch("http://localhost:4000/display");
      const data = await response.json();
      setDatos(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    importNumber();
  }, []);

  return (
    <ImportContext.Provider value={{ datos, importNumber }}>
      
      {children}
    </ImportContext.Provider>
  );
}

export default ImportContext;
