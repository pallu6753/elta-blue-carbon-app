'use client';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext, AppContextType } from '@/context/AppProvider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { aiExpertAssistance } from '@/ai/flows/ai-expert-assistance';

interface ChatMessage {
  type: 'user' | 'ai' | 'error';
  text: string;
  sources?: { uri?: string; title?: string }[];
}

export default function AIAssistantModal() {
  const { role, isAssistantModalOpen, setAssistantModalOpen } = useContext(AppContext) as AppContextType;
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAssistantModalOpen) {
      const welcomeMessage = getRoleWelcomeMessage(role);
      setChatHistory([{ type: 'ai', text: welcomeMessage }]);
    }
  }, [isAssistantModalOpen, role]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const getRoleWelcomeMessage = (role: string | null) => {
    switch (role) {
      case 'Project Developer':
        return `Welcome back, Developer! Ask me how to accelerate your project's MRV process or what data standards are required.`;
      case 'Verifier':
        return `Welcome, Verifier! I can provide guidance on complex MRV validation rules, risk detection, and best practices.`;
      case 'Investor':
        return `Welcome, Investor! Ask me about current blue carbon market trends, price volatility, or portfolio diversification.`;
      default:
        return `Welcome! I can provide insights into emerging carbon market policies and compliance enforcement strategies.`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage: ChatMessage = { type: 'user', text: query };
    setChatHistory(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);

    try {
      const response = await aiExpertAssistance({ query, role: role || undefined });
      const aiMessage: ChatMessage = { type: 'ai', text: response.answer, sources: response.sources };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Expert Assistance Error:', error);
      const errorMessage: ChatMessage = { type: 'error', text: 'The AI assistant service encountered an issue. Please try again later.' };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isAssistantModalOpen} onOpenChange={setAssistantModalOpen}>
      <DialogContent className="sm:max-w-lg h-3/4 flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex items-center text-indigo-700">
            <Sparkles className="h-6 w-6 mr-2 text-indigo-500" />
            AI Expert Assistant
          </DialogTitle>
        </DialogHeader>
        <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50">
          {chatHistory.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`p-3 rounded-lg max-w-xs shadow-md ${
                  message.type === 'user' ? 'bg-indigo-600 text-white' : 
                  message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-indigo-100 text-indigo-800'
                }`}
              >
                <p dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br>') }} />
                 {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-indigo-200">
                         <p className="text-xs font-semibold mb-1">Sources:</p>
                         {message.sources.slice(0, 2).map((source, i) => (
                             <a key={i} href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs block truncate hover:underline">
                                 {source.title}
                             </a>
                         ))}
                    </div>
                 )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            </div>
          )}
        </div>
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              id="user-query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about MRV, offsets, or blue carbon..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" className="bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
