import React, { useEffect, useState } from "react";
import Header from "./Header";
import Search from "./Search";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";

// A test user object for simulating the current user
const testUser = { username: "Duane" };

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);  // State for dark mode toggle
  const [messages, setMessages] = useState([]);       // State for storing messages
  const [search, setSearch] = useState("");            // State for search query

  // Fetch messages from the server when the component mounts
  useEffect(() => {
    fetch("http://127.0.0.1:5555/messages")
      .then((r) => r.json())
      .then((messages) => setMessages(messages));
  }, []);

  // Function to add a new message
  function handleAddMessage(newMessage) {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }

  // Function to delete a message by its ID
  function handleDeleteMessage(id) {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  }

  // Function to update an existing message
  function handleUpdateMessage(updatedMessageObj) {
    const updatedMessages = messages.map((message) =>
      message.id === updatedMessageObj.id ? updatedMessageObj : message
    );
    setMessages(updatedMessages);
  }

  // Filter messages based on the search query
  const displayedMessages = messages.filter((message) =>
    message.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className={isDarkMode ? "dark-mode" : ""}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={setIsDarkMode} />
      <Search search={search} onSearchChange={setSearch} />
      <MessageList
        messages={displayedMessages}
        currentUser={testUser}
        onMessageDelete={handleDeleteMessage}
        onUpdateMessage={handleUpdateMessage}
      />
      <NewMessage currentUser={testUser} onAddMessage={handleAddMessage} />
    </main>
  );
}

export default App;
