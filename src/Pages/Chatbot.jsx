import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { info } from '../state/atoms';
import { HfInference } from '@huggingface/inference';
import botImage from "../assets/Images/bot.jpg";
import userImage from "../assets/Images/user.jpg";

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

const Chatbot = () => {
  const infoValue = useRecoilValue(info);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [jsonContext, setJsonContext] = useState('');

  useEffect(() => {
    const context = JSON.stringify(infoValue, null, 2);
    setJsonContext(context);
  }, [infoValue]);

  const getChatResponse = async (userInput) => {
    const prompt = `Based on the provided data: ${jsonContext}, answer the question: "${userInput}" directly.`;

    try {
      const out = await hf.chatCompletion({
        model: "microsoft/Phi-3-mini-4k-instruct",
        task: "text-generation",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 512,
        temperature: 0.1,
      });

      return out.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching response:", error);
      return "Sorry, I couldn't get a response.";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Add user's message to the chat
      setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user' }]);
      const botResponse = await getChatResponse(input);
      // Add bot's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: 'bot' },
      ]);
      setInput(''); // Clear input immediately after sending
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior to avoid a new line
      handleSend(e);
    }
  };

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: '#212121' }}>
      <h3 className="text-white">Company Name: {infoValue.name}</h3>
      {/* <pre className="text-white bg-[#2f2f2f] p-4 rounded">{jsonContext}</pre><pre className="text-white bg-[#2f2f2f] p-4 rounded">{jsonContext}</pre> */}
      <div className="flex-1 overflow-auto rounded-lg p-4 mb-4" style={{ backgroundColor: '#212121' }}>
        <div className="flex flex-col">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && <img src={botImage} alt="Bot" className="w-8 h-8 rounded-full mr-2" />}
              <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-[#2f2f2f] text-white' : 'bg-black text-white'}`}>
                {msg.text}
              </span>
              {msg.sender === 'user' && <img src={userImage} alt="User" className="w-8 h-8 rounded-full ml-2" />}
            </div>
          ))}
        </div>
      </div>
      <div className="relative mx-72 mb-5">
        <form onSubmit={handleSend} className="flex">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // Add key down handler
            className="flex-1 rounded-full resize-none overflow-y-auto max-h-60"
            placeholder="Enter your text..."
            style={{
              paddingTop: '12px',
              paddingBottom: '12px',
              paddingLeft: '40px',
              lineHeight: '1.5',
              backgroundColor: '#2f2f2f',
              color: 'white',
              border: 'none',
              outline: 'none'
            }}
          />
          <button 
            type="submit" 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg hover:bg-gray-200 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path 
                fillRule="evenodd" 
                d="M11.47 2.47a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06l-2.47-2.47V21a.75.75 0 0 1-1.5 0V4.81L8.78 7.28a.75.75 0 0 1-1.06-1.06l3.75-3.75Z" 
                clipRule="evenodd" 
                stroke="currentColor" 
                strokeWidth="1"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
