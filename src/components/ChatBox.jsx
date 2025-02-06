import { useState, useRef, useEffect } from 'react';

const systemPrompt = `I am Genrec AI's official assistant. I help visitors learn about Genrec AI, its projects, and the incredible team behind it. Here's what I know:

About Genrec AI:
- A revolutionary AI company founded by a team of innovators from VSB Engineering College, Karur.
- Focused on AI-driven solutions for *education, automation, and digital transformation*.
- Specializing in *AI chatbots, RAG-based AI systems, AI-integrated websites, and paperless automation*.
- Passionate about privacy-first AI development that ensures efficiency without compromising security.

Core Team:
- *Jai Samyukth B U* (Co-Founder)
- *Shyamnath Sankar* (Co-Founder)
- *Harish* (Technical Head)
- *Lokesh* (Sales Executive)

Vision & Mission:
- *Revolutionizing AI* with cutting-edge, privacy-focused technologies.
- *Bridging the gap* between artificial intelligence and real-world applications.
- *Driving sustainability* by reducing paper-based workflows and saving trees.

I maintain a professional yet energetic tone and aim to help visitors connect with Genrec AI or learn about its work.`;


const contextPrompts = {
  projects: `Let me introduce you to Genrec AI’s groundbreaking projects:
  - *Revolvo AI Library: A next-gen, RAG-powered AI library that digitalizes books **while ensuring complete privacy* with local AI setups.
  - *Chatbot Intelligence*: Advanced AI-driven chatbots for businesses, education, and personal productivity.
  - *AI-Integrated Websites*: Creating smart, interactive, and intuitive websites powered by AI.
  - *AI Software for Institutions: Automating manual processes to **eliminate paperwork* and enhance efficiency.
  
  Would you like to explore any of these projects in detail?`,
  
  skills: `Genrec AI’s expertise spans across:
  - *AI/ML Development*: Deep learning, NLP, and RAG-based AI.
  - *Python & Hugging Face*: Advanced AI model implementation and fine-tuning.
  - *API Development*: Building scalable, high-performance interfaces.
  - *System Architecture*: Designing privacy-first, efficient AI solutions.

  Which area interests you the most?`,
  
  contact: `You can reach the creators personally using:
  1. *Official Email:* shyamnathsankar.s@gmail.com (Shyamnath Sankar)
  2. *Official Email:* jaisamyukth@gmail.com (Jai Samyukth)
  3. *Institutional Network:* VSB Engineering College, Karur (CSBS Department)
  
  Genrec AI is actively looking for *collaborations, research opportunities, and industry partnerships*.  
  How would you like to connect with us?`
};

const ChatBox = ({ className = '', onActiveChange = () => {} }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 `I am Genrec AI's official assistant. I help visitors learn about Genrec AI, its projects, and the incredible team behind it."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const chatContainerRef = useRef(null);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000;

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 100;
      setShouldAutoScroll(isNearBottom);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current && shouldAutoScroll) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
  }, [messages, shouldAutoScroll]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setShouldAutoScroll(true);
    
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    setIsLoading(true);
    try {
      const response = await sendChatRequest(systemPrompt, userMessage);
      if (response) {
        setMessages(prev => [...prev, { role: "assistant", content: response }]);
        setRetryCount(0);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const sendChatRequest = async (contextualPrompt, userMessage, retryAttempt = 0) => {
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDrnz8PneHDdMed6ktvVA7wCjPiuuhsahs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${contextualPrompt}\n\n${userMessage}` }]
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429 && retryAttempt < MAX_RETRIES) {
          await sleep(RETRY_DELAY * (retryAttempt + 1));
          return sendChatRequest(contextualPrompt, userMessage, retryAttempt + 1);
        }
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      if (retryAttempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY * (retryAttempt + 1));
        return sendChatRequest(contextualPrompt, userMessage, retryAttempt + 1);
      }
      throw error;
    }
  };

  return (
    <div className={`bg-tertiary rounded-md shadow-md flex flex-col px-12 ${className}`}>
      <div className="bg-primary p-2 rounded-t-md">
        <h3 className="text-white font-bold text-[24px]">AI Assistant</h3>
      </div>

      <div 
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[70%] p-2 rounded-md ${
                message.role === "assistant"
                  ? "bg-black-200 text-white"
                  : "bg-primary text-white"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-black-200 text-white p-3 rounded-lg">
              {retryCount > 0 ? `Retrying (${retryCount}/${MAX_RETRIES})...` : "Thinking..."}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-black-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg bg-black-200 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg ${
              isLoading ? "bg-gray-500" : "bg-primary hover:bg-primary-dark"
            } text-white transition-colors`}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;