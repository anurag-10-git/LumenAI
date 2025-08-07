import { createContext } from "react";
import main from "../config/gemini";

const Context = createContext()

const onSent = async (prompt) => {
  await main(prompt);
}

const ContextProvider = ({ children }) => {

  onSent("What is React?");

  const contextValue = {

  }

  return (
    <Context.Provider value={{}}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider;