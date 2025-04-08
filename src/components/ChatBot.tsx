import { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface FAQData {
  question: string;
  answer: string;
  category: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [faqData, setFaqData] = useState<FAQData[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadExcelData();
    // Add initial greeting
    setMessages([
      {
        text: "Hi! I'm QUBITX Assistant. How can I help you today?",
        isBot: true,
        timestamp: new Date()
      }
    ]);
  }, []);

  const loadExcelData = async () => {
    try {
      const response = await fetch('/data/faq.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json<FAQData>(worksheet);
      setFaqData(data);
    } catch (error) {
      console.error('Error loading FAQ data:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [isTyping, setIsTyping] = useState(false);

  const findAnswer = (question: string): string => {
    const normalizedQuestion = question.toLowerCase();
    
    // Greetings
    if (normalizedQuestion.includes('hello') || normalizedQuestion.includes('hi') || normalizedQuestion.includes('hey')) {
      return "Hello! How can I assist you with QUBITX hackathon today? 😊";
    }

    // Thank you responses
    if (normalizedQuestion.includes('thank') || normalizedQuestion.includes('thanks')) {
      return "You're welcome! Is there anything else you'd like to know about QUBITX? 🌟";
    }

    // Goodbye responses
    if (normalizedQuestion.includes('bye') || normalizedQuestion.includes('goodbye')) {
      return "Goodbye! Feel free to come back if you have more questions about QUBITX! 👋";
    }

    // First check FAQ data from Excel
    const faqMatch = faqData.find(faq => 
      faq.question.toLowerCase().includes(normalizedQuestion) ||
      normalizedQuestion.includes(faq.question.toLowerCase())
    );
    
    if (faqMatch) return faqMatch.answer;

    // Enhanced fallback responses
    if (normalizedQuestion.includes('track') || normalizedQuestion.includes('challenge')) {
      return "We have exciting tracks including Open Innovation 🎯, AI & ML 🤖, Health-Tech 🏥, Mid-Tech 🔄, Edu-Tech 📚, and Fin-Tech 💰. Each track offers unique challenges to solve real-world problems. Which track interests you the most?";
    }
    
    if (normalizedQuestion.includes('register') || normalizedQuestion.includes('sign up')) {
      return "Great that you're interested in joining! You can register for QUBITX through our registration section. Click the 'Register Now' button to begin your journey! Need any specific details about registration? 📝";
    }

    return "I understand you're asking about " + question + ". Could you please provide more details or rephrase your question? I'm here to help with information about our tracks, registration, schedule, or any other aspect of QUBITX! 🤔";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay for more natural interaction
    await new Promise(resolve => setTimeout(resolve, 1000));

    const botMessage: Message = {
      text: findAnswer(input),
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-neon-blue hover:bg-neon-blue/90 text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-neon-blue/20 transition-all duration-300"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 sm:relative sm:inset-auto bg-cyber-dark border border-neon-blue/30 rounded-t-lg sm:rounded-lg shadow-lg w-full sm:w-96 max-w-full">
          <div className="p-3 sm:p-4 border-b border-neon-blue/30 flex justify-between items-center">
            <h3 className="text-base sm:text-lg font-semibold text-white">QUBITX Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="h-[60vh] sm:h-96 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start ${message.isBot ? 'justify-start' : 'justify-end'} space-x-2`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center">
                    <span className="text-sm">🤖</span>
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-2.5 sm:p-3 rounded-lg text-sm sm:text-base ${
                    message.isBot
                      ? 'bg-cyber-darker text-white'
                      : 'bg-neon-blue text-white'
                  }`}
                >
                  {message.text}
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center">
                    <span className="text-sm">👤</span>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center">
                  <span className="text-sm">🤖</span>
                </div>
                <div className="bg-cyber-darker text-white rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-neon-blue/30">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about QUBITX..."
                className="flex-1 bg-cyber-darker text-white text-sm sm:text-base rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue/50"
              />
              <button
                type="submit"
                className="bg-neon-blue hover:bg-neon-blue/90 text-white text-sm sm:text-base rounded-lg px-3 py-2 sm:px-4 sm:py-2 transition-colors whitespace-nowrap flex items-center space-x-1"
              >
                <span>Send</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;