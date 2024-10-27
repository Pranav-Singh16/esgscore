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
      setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user' }]);
      setInput(''); // Clear input immediately after sending

      const botResponse = await getChatResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: 'bot' },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="flex flex-col h-screen rounded-lg overflow-hidden" style={{ backgroundColor: '#212121' }}>
      <h3 className="text-white pl-4">Company Name: {infoValue.name}</h3>
      <div className="flex-1 overflow-auto p-4 mb-4" style={{ backgroundColor: '#2a2a2a', height: 'calc(95vh - 80px)', borderRadius: '16px' }}>
        <div className="flex flex-col">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && <img src={botImage} alt="Bot" className="w-8 h-8 rounded-full mr-2" />}
              <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-[#3a3a3a] text-white' : 'bg-black text-white'}`}>
                {msg.text}
              </span>
              {msg.sender === 'user' && <img src={userImage} alt="User" className="w-8 h-8 rounded-full ml-2" />}
            </div>
          ))}
        </div>
      </div>
      <div className="relative mb-5 mx-4"> {/* Add margin for mobile */}
        <form onSubmit={handleSend} className="flex items-center">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-full resize-none overflow-y-auto max-h-20 p-2 mx-0 md:mx-10" // Adjust for button overlap
            placeholder="Enter your text..."
          style={{
              paddingTop: '12px',
              paddingBottom: '12px',
              paddingLeft: '30px',
              lineHeight: '1.5',
              backgroundColor: '#3a3a3a',
              color: 'white',
              border: 'none',
              outline: 'none'
            }}
          />
          <button 
            type="submit" 
            className="-absolute right-14 w-8 h-8 bg-white rounded-full shadow-lg hover:bg-gray-200 flex items-center justify-center md:absolute right-11"
            style={{ marginLeft: '-2.5rem' }} // Adjust to overlap
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-5 h-5">
              <path 
                fillRule="evenodd" 
                d="M11.47 2.47a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06l-2.47-2.47V21a.75.75 0 0 1-1.5 0V4.81L8.78 7.28a.75.75 0 0 1-1.06-1.06l3.75-3.75Z" 
                clipRule="evenodd" 
                stroke="black" 
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
