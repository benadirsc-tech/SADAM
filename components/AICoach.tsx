
import React, { useState, useRef, useEffect } from 'react';
import { UserStats, Habit, ChatMessage } from '../types';
import { getAICoachResponse } from '../services/geminiService';
import { Icons } from '../constants';

interface AICoachProps {
  stats: UserStats;
  habits: Habit[];
}

const AICoach: React.FC<AICoachProps> = ({ stats, habits }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Warrior, I've analyzed your current progression. You're showing potential, but we can optimize. What's standing in your way today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getAICoachResponse(stats, habits, userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col animate-in fade-in duration-500">
      <header className="mb-6 flex items-center gap-4">
        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20">
          <Icons.AI />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-black">StepUp <span className="text-blue-500">Coach</span></h2>
          <p className="text-slate-400 text-sm">Real-time performance optimization.</p>
        </div>
      </header>

      <div className="flex-1 bg-slate-900/50 rounded-3xl border border-slate-800 flex flex-col overflow-hidden relative shadow-2xl">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 animate-pulse flex gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-.15s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <div className="relative max-w-4xl mx-auto">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for a plan, motivation, or technique..."
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-100"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 w-10 h-10 flex items-center justify-center rounded-xl transition-all disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoach;
