import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("")

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

  // Function to send a new message
  async function handleSendMessage(e){
    e.preventdefault()

    if(newMessage.trim() === "") return; // Don't send any empty messages

    const user = supabase.auth.user() // get the currently logged-in user from supabase

    if(!user){
        alert("You must be logged in to send messages.")
        return;
    }

    const { error } = await supabase
        .from("messages")
        .insert([{message_text: newMessage, user_id: user.id}])

    if(error){
        console.error("Error sending message:", error)
    } else {
        setNewMessage("")
    }

  }

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
      <form onSubmit={handleSendMessage}>
        <input 
            type="text"
            placeholder="Type a message... "
            value={newMessage}
            onChange={(e) => {setNewMessage(e.target.value)}}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;
