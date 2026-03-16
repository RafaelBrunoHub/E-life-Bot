/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  Send, 
  Bot, 
  User, 
  Info, 
  Phone, 
  MapPin, 
  Calendar, 
  Trash2, 
  ShieldAlert,
  Menu,
  X,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { askChatbot } from "./services/geminiService";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      text: "Olá! Sou o assistente virtual do E/life Mandaqui. Como posso ajudar você hoje? Posso informar sobre regras de pets, mudanças, obras, coleta de lixo e muito mais.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const botResponse = await askChatbot(input);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "bot",
      text: botResponse,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  const quickLinks = [
    { icon: <Phone size={18} />, label: "Contatos Úteis", info: "Econ: 4020-8120 | Síndico: (11) 96590-1611" },
    { icon: <Calendar size={18} />, label: "Mudanças", info: "Agendar via Winker com 48h de antecedência." },
    { icon: <Trash2 size={18} />, label: "Coleta de Lixo", info: "Orgânico: Seg/Qua/Sex | Reciclável: Sex 22h" },
    { icon: <ShieldAlert size={18} />, label: "Obras", info: "ART/RRT obrigatória. Martelete proibido." },
  ];

  return (
    <div className="flex flex-col h-screen bg-condo-black">
      {/* Header */}
      <header className="bg-condo-black border-b-4 border-condo-green p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-condo-green p-2 rounded-sm">
            <Bot className="text-condo-black" size={24} />
          </div>
          <div>
            <h1 className="text-condo-green font-black text-xl tracking-tighter uppercase leading-none">
              E/life Mandaqui
            </h1>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
              Portal do Morador • IA Assistente
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden text-condo-green p-2"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar / Info Panel */}
        <aside className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static absolute inset-y-0 left-0 w-72 bg-zinc-900 border-r-2 border-condo-green/20 p-6 transition-transform duration-300 z-40
        `}>
          <div className="space-y-8">
            <div>
              <h2 className="text-condo-green text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Info size={14} /> Informações Rápidas
              </h2>
              <div className="space-y-4">
                {quickLinks.map((link, i) => (
                  <div key={i} className="group cursor-default">
                    <div className="flex items-center gap-2 text-zinc-300 font-bold text-sm mb-1 group-hover:text-condo-green transition-colors">
                      {link.icon}
                      {link.label}
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed">
                      {link.info}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <h2 className="text-condo-green text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <MapPin size={14} /> Localização
              </h2>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Rua José Conhago Pomare, 107<br />
                Mandaqui, São Paulo - SP<br />
                CEP 02433-060
              </p>
            </div>

            <div className="bg-condo-green/10 border border-condo-green/30 p-4 rounded-sm">
              <p className="text-condo-green text-[10px] font-bold uppercase mb-1">Dica da IA</p>
              <p className="text-zinc-300 text-xs italic">
                "Pergunte sobre a senha do Wi-fi ou os dias de coleta de lixo!"
              </p>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden absolute inset-0 bg-black/80 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-condo-black relative">
          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-2 mb-2 px-1">
                    {msg.role === "bot" ? (
                      <>
                        <div className="w-6 h-6 bg-condo-green rounded-full flex items-center justify-center">
                          <Bot size={12} className="text-condo-black" />
                        </div>
                        <span className="text-[10px] font-black text-condo-green uppercase tracking-widest">E/life Bot</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Morador</span>
                        <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center">
                          <User size={12} className="text-white" />
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className={msg.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"}>
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                  
                  <span className="text-[9px] text-zinc-600 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <div className="w-6 h-6 bg-condo-green rounded-full flex items-center justify-center">
                      <Bot size={12} className="text-condo-black" />
                    </div>
                    <span className="text-[10px] font-black text-condo-green uppercase tracking-widest italic">Digitando...</span>
                  </div>
                  <div className="chat-bubble-bot opacity-50 flex gap-1 items-center h-10 px-4">
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-condo-black rounded-full" />
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-condo-black rounded-full" />
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-condo-black rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 lg:p-8 bg-gradient-to-t from-condo-black via-condo-black to-transparent">
            <div className="max-w-3xl mx-auto relative">
              <div className="flex items-center gap-2 bg-zinc-900 border-2 border-zinc-800 focus-within:border-condo-green transition-colors p-2 rounded-sm shadow-2xl">
                <div className="pl-3 text-zinc-500">
                  <MessageSquare size={20} />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Pergunte algo sobre o condomínio..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-white py-3 px-2 placeholder:text-zinc-600 font-medium"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={`
                    p-3 rounded-sm transition-all
                    ${input.trim() && !isLoading ? "bg-condo-green text-condo-black scale-100" : "bg-zinc-800 text-zinc-600 scale-95"}
                  `}
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-[9px] text-center text-zinc-600 mt-3 uppercase font-bold tracking-[0.3em]">
                Respostas baseadas nos manuais oficiais do condomínio
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
