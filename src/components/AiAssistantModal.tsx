import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../lib/types';
import { SERVICES_DATA } from '../data/constants';
import { X, SendIcon, BotMessageSquare } from 'lucide-react';

interface AiAssistantModalProps {
  onClose: () => void;
}

const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'أهلاً بك في شركة "يسرها"! كيف يمكنني مساعدتك في خدمات البرمجيات اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      const res = await fetch("/.netlify/functions/gemini-proxy", {
        method: "POST",
        body: JSON.stringify({ message: input, servicesData: SERVICES_DATA }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      const replyText = data.reply || data.error || "حدث خطأ";

      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage.role === 'model') {
          return [...prev.slice(0, -1), { ...lastMessage, text: replyText }];
        }
        return prev;
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ';
      setError(errorMessage);
      setMessages(prev => [...prev, { role: 'model', text: `عذرًا، حدث خطأ: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 mt-4" onClick={onClose}>
      <div className="w-full max-w-2xl h-[80vh] bg-stone-100 rounded-2xl shadow-2xl flex flex-col border border-stone-300 mt-20" onClick={e => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b border-stone-200">
          <div className="flex items-center space-x-3 gap-2">
            <BotMessageSquare className="w-8 h-8 text-cyan-400" />
            <h2 className="text-3xl text-teal-400 mr-2">المساعد الذكي</h2>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 transition-colors" aria-label="Close modal">
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md lg:max-w-lg p-3 rounded-2xl ${msg.role === 'user' ? 'bg-cyan-400 text-white rounded-br-none' : 'bg-stone-200 text-slate-800 rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap leading-relaxed font-medium">{msg.text}</p>
              
              {/* إذا كانت هناك صورة */}
              {msg.image && (
                <img src={msg.image} alt="Service" className="mt-2 rounded-lg shadow-md object-cover max-h-48 w-full" />
              )}
            </div>
          </div>
        ))}

{isLoading && (
  <div className="flex items-end gap-3 justify-start">
    <div className="max-w-md lg:max-w-lg p-3 rounded-2xl bg-stone-200 text-slate-800 rounded-bl-none flex items-center gap-2">
      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-75"></div>
      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-150"></div>
      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
      <span className="text-sm text-slate-600">جاري الكتابة...</span>
    </div>
  </div>
)}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-stone-200 bg-stone-200/50 rounded-b-2xl">
          <div className="flex items-center bg-white rounded-full p-2 border border-stone-300 focus-within:ring-2 focus-within:ring-cyan-400 transition-shadow">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="اسأل عن الخدمات، الميزات، أو الأسعار..."
              className="flex-1 bg-transparent px-4 text-slate-800 placeholder-slate-500 focus:outline-none"
              disabled={isLoading}
              dir="rtl"
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="p-3 bg-cyan-400 text-white rounded-full disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300 hover:bg-emerald-400">
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AiAssistantModal;
