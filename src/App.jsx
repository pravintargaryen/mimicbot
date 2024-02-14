import { useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  console.log("messages", messages);

  const LANGUAGE_MODEL_API_KEY = import.meta.env.VITE_MY_VARIABLE;
  const LANGUAGE_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta3/models/chat-bison-001:generateMessage?key=${LANGUAGE_MODEL_API_KEY}`;

  const getResponse = async () => {
    const payload = {
      prompt: { messages: [{ content: text }] },
      temperature: 0.1,
      candidate_count: 1,
    };

    const response = await fetch(LANGUAGE_MODEL_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      method: "POST",
    });
    const data = await response.json();
    console.log("data", data);
    setMessages([
      ...messages,
      {
        author: data.messages[0].content,
        bot: data.candidates[0].content,
      },
    ]);
  };

  console.log(text);

  return (
    <div className="chat-bot">
      <div className="chat-header">
        <div className="info-container">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Atom_editor_logo.svg/262px-Atom_editor_logo.svg.png"
            alt="Logo"
            width={120}
            height={120}
            className="logo"
          />
        </div>
      </div>
      <div className="feed">
        {messages?.map((message, _index) => (
          <div key={_index}>
            <div className="question bubble">{message.author}</div>
            <div id="response-text" className="response bubble">
              {message.bot}
            </div>
          </div>
        ))}
      </div>
      <textarea
        id="text-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button id="input-button" onClick={getResponse}>
        ⇨
      </button>
    </div>
  );
};

export default App;
