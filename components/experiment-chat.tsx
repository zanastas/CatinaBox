'use client';

import { useState, useEffect } from 'react';
import { PushAPI } from '@pushprotocol/restapi';
import { initializePushUser, sendChatMessage } from '@/utils/push';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { ethers } from 'ethers';

interface ExperimentChatProps {
  experimentId: string;
  chatId: string;
}

export default function ExperimentChat({ experimentId, chatId }: ExperimentChatProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [pushUser, setPushUser] = useState<PushAPI | null>(null);
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    const initPush = async () => {
      if (primaryWallet?.connector) {
        const provider = new ethers.providers.Web3Provider(primaryWallet.connector as any);
        const signer = provider.getSigner();
        const user = await initializePushUser(signer);
        setPushUser(user);
        
        // Subscribe to messages
        const history = await user.chat.group.getMessages(chatId);
        setMessages(history);
      }
    };

    initPush();
  }, [primaryWallet, chatId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pushUser || !newMessage.trim()) return;

    try {
      await sendChatMessage(pushUser, chatId, newMessage);
      setNewMessage('');
      // Refresh messages
      const history = await pushUser.chat.group.getMessages(chatId);
      setMessages(history);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!primaryWallet) {
    return (
      <div className="card">
        <h2 className="text-xl font-medium mb-4">Experiment Chat</h2>
        <p className="text-gray-600">Please connect your wallet to participate in the chat.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl font-medium mb-4">Experiment Chat</h2>
      <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-xl">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.fromDID === primaryWallet.address
                ? 'bg-green-100 ml-auto'
                : 'bg-white'
            }`}
          >
            <p className="text-sm text-gray-600">
              {msg.fromDID.slice(0, 6)}...{msg.fromDID.slice(-4)}
            </p>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-xl"
        />
        <button
          type="submit"
          className="btn-primary px-4 py-2"
          disabled={!pushUser}
        >
          Send
        </button>
      </form>
    </div>
  );
} 