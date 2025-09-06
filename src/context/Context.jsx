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

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData(prev => prev + nextWord)
    }, 75 * index)
  }

  const onSent = useCallback(async () => {
    setResultData("")
    setLoading(true)
    setShowResult(true)
    setRecentPrompt(input)
    setPrevPrompts(prev => [...prev, input])
    const response = await main(input)
    let responseArray = response.split("**")
    let newResponse;
    for (let i=0; i < responseArray.length; i++) {
      if (i === 0 || i%2 !== 1) {
        newResponse += responseArray[i]
      } else {
        newResponse += "<b>"+responseArray[i]+"</b>"
      }
    }

    let newResponse2 = newResponse.split("*").join('</br>')
    let newResponseArray = newResponse2.split(" ");
    for (let i=0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i]
      delayPara(i, nextWord + " ")
    }
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
    input
  }

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider;