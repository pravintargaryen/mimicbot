import { useState} from 'react'


const App = () => {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])

    console.log('messages',messages)


    const LANGUAGE_MODEL_API_KEY = import.meta.env.VITE_MY_VARIABLE
    const LANGUAGE_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta3/models/chat-bison-001:generateMessage?key=${LANGUAGE_MODEL_API_KEY}`

    
  const getResponse = async () => {

    const payload = {
      prompt: { "messages": [{ "content": text }]},
      temperature: 0.1,
      candidate_count: 1,
  }

    const response = await fetch(LANGUAGE_MODEL_URL, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        method: "POST",
    })
      const data = await response.json()
      console.log('data', data)
      setMessages([...messages,
          {
            author: data.messages[0].content,
            bot:  data.candidates[0].content
          }
      ])

  
  }
  

  console.log(text)

  return (
    <div className="chat-bot">
      <div className="chat-header">
        <div className="info-container">
            <h2>C Bot</h2>
        </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="rgb(106, 13, 131)" fillOpacity="1"
                    d="M0,224L60,218.7C120,213,240,203,360,186.7C480,171,600,149,720,154.7C840,160,960,192,1080,186.7C1200,181,1320,139,1380,117.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>
      </div>
      <div className="feed">
          {messages?.map((message, _index) =>
              <div key={_index}>
                  <div className="question bubble">{message.author}</div>
                  <div id="response-text" className="response bubble">{message.bot}</div>
              </div>


          )}

      </div>
      <textarea id="text-input" value={text} onChange={e => setText(e.target.value)}/>
      <button id="input-button" onClick={getResponse}>⇨</button>
    </div>
  )
}

export default App
