import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { useContext } from 'react'
import DOMPurify from 'dompurify';


const preWrittenContent = [
  {imageSrc: assets.compass_icon , content: 'Suggest beautiful places to see on an upcoming road trip'},
  {imageSrc: assets.bulb_icon , content: 'Briefly summarize this concept: urban planning'},
  {imageSrc: assets.message_icon , content: 'Brainstorm team bonding activities for our work retreat'},
  {imageSrc: assets.code_icon , content: 'Improve the readability of the following code'},
]

const Main = () => {
  const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)

  return (
    <div className='main'>
      <div className="nav">
        <p>Lumen AI</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? <>
        <div className="greet">
          <p><span>Hello, Dev.</span></p>
          <p>How can i help you today?</p>
        </div>
        <div className="cards">
          {preWrittenContent.map((item, index) => (
            <div onClick={() => onSent(item.content)} className="card" key={index}>
              <p>{item.content}</p>
              <img src={item.imageSrc} alt="" />
            </div>
          ))}
        </div>
        </> : <div className='result'>
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading ? <div className='loader'>
              <hr />
              <hr />
              <hr />
            </div>
              : <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resultData) }}></p>}
          </div>
        </div> }
        <div className="main-bottom">
          <div className="search-box">
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Enter a prompt here!' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input && <img src={assets.send_icon} onClick={() => onSent()} alt="" />}
            </div>
          </div>
          <p className='bottom-info'>
            Lumen AI may display inaccurate info, including about people, so double-check its
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main