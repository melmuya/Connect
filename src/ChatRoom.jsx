import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function ChatRoom() {
  const [messages, setMessages] = useState([]);

  // Fetch messages from the messages table when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          id, message_text, created_at, 
          user_id,
          users ( username )
        `)
        .order('created_at', { ascending: true });  // Fetch messages in chronological order

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Chat Room</h2>
      <div className="message-list">
        {messages.map((message) => (
          <div key={message.id} className="message-item">
            <strong>{message.users?.username || 'Unknown User'}:</strong> {message.message_text}
            <span> ({new Date(message.created_at).toLocaleTimeString()})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatRoom;
