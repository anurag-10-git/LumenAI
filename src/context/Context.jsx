import { createContext, useCallback, useState } from "react";
import main from "../config/gemini";

export const Context = createContext()



const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("")
  const [recentPrompt, setRecentPrompt] = useState("")
  const [prevPrompts, setPrevPrompts] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultData, setResultData] = useState("")

  const onSent = useCallback(async () => {
    setResultData("")
    setLoading(true)
    setShowResult(true)
    const response = await main(input)
    console.log(response)
    setResultData(response)
    setLoading(false)
    setInput("")
  }, [input])

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    // setResultData,
    // setShowResult,
  }

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider;