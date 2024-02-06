import React, { useState, useRef, useEffect } from "react";
import { callApi } from "../../api/apiCaller";
import socketIO from "socket.io-client";
import { Image } from "antd";
import Loader from "../../components/loader/loader";
import "./chat.css"; // Import your CSS file
import routes from "../../api/routes";
import { useSelector } from "react-redux";

// const socket = socketIO("https://qekam3xzzg.eu-central-1.awsapprunner.com/");
const socket = socketIO("https://idzywuiiu2.ap-southeast-2.awsapprunner.com/");
var user = null;
var otherUser = null;

const Chat = () => {
  user = useSelector((e) => e.userDataSlice.userData);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatHeads, setChatHeads] = useState([]);
  const chatMessagesRef = useRef(null);

  const refreshChatHeads = () => {
    socket.emit("get-inboxes", { userId: user?._id });
    socket.on("inboxes", (data) => {
      const inboxes = data?.inboxes;
      console.log("Data=>", inboxes);
      setChatHeads(inboxes);
    });
  };

  const enterChat = (chat) => {
    setActiveChat(chat?._id);
    if (otherUser?._id) {
      console.log("INOTHERUSER=>", otherUser);
      socket.emit("leave-room", {
        userId: user?._id,
        inbox: otherUser?._id,
      });
    }
    // console.log("SETTING USER", otherUser);
    otherUser =
      chat?.users[0]?._id === user?._id ? chat?.users[1] : chat?.users[0];
    const joinRoomBody = {
      userId: user?._id,
      inbox:
        chat?.users[0]?._id === user._id
          ? chat?.users[1]?._id
          : chat?.users[0]?._id,
    };
    // console.log("JOINROOMBODY=>", joinRoomBody);
    socket.emit("join-room", joinRoomBody);
    socket.on("messages", (res) => {
      const messages = [...res?.messages];
      console.log("Messages=>", res?.messages);
      setChatHistory(messages.reverse());
    });
    refreshChatHeads();
    // Logic to fetch chat messages or initialize chat room data
    setChatHistory([]); // Resetting chat history when entering a new chat
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        userId: user?._id,
        to: otherUser?._id,
        message: message,
        messageType: "text",
        // id: chatHistory.length + 1,
        // text: message,
        // sender: "user", // Assume user sends the message
      };
      socket.emit("send-message", newMessage);
      // setChatHistory([...chatHistory, newMessage]);
      setMessage(""); // Clear the message input after sending
    }
  };

  useEffect(() => {
    // getUser();
    socket.emit("user-enter", { userId: user?._id });
    socket.emit("get-inboxes", { userId: user?._id, once: true });
    socket.on("inboxes", (data) => {
      const inboxes = data?.inboxes;
      console.log("Data=>", inboxes);
      setChatHeads(inboxes);
    });

    return () => {
      console.log("LEAVING CURRENT ROOM");
      console.log("OUTERINOTHERUSER=>", otherUser, "user 1", user);
      if (otherUser) {
        console.log("INOTHERUSER=>", otherUser, "user 1", user);
        socket.emit("leave-room", {
          userId: user?._id,
          inbox: otherUser?._id,
        });
      }
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatHistory]);
  return (
    <div className="chat-container">
      {/* <Loader loading={isloading} /> */}
      <div className="chat-headers-container">
        <div className="chat-headers">
          {chatHeads?.map((chat) => (
            <div
              key={chat?._id}
              className={`chat-head ${
                activeChat === chat?._id ? "active" : ""
              }`}
              onClick={() => enterChat(chat)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "none",
                }}
              >
                {chat?.users[0]?._id === user?._id ? (
                  <>
                    <img
                      src={chat.users[1]?.image}
                      style={{
                        maxWidth: "50px",
                        borderRadius: "50%",
                        marginRight: "8px",
                      }}
                    />
                    <span>{chat.users[1]?.name}</span>
                  </>
                ) : (
                  <>
                    <img
                      src={chat.users[0]?.image}
                      style={{
                        maxWidth: "50px",
                        borderRadius: "50%",
                        marginRight: "8px",
                      }}
                    />
                    <span>{chat.users[0]?.name}</span>
                  </>
                )}
              </div>{" "}
              {chat?.newMessages ? `(${chat?.newMessages})` : ""}
            </div>
          ))}
        </div>
      </div>
      <div
        className="chat-room"
        style={{ backgroundColor: "white", border: "none" }}
      >
        {activeChat !== null && (
          <>
            <h2>
              Chat with {otherUser?.name ? otherUser?.name : "not-available"}
              {/* Chat with {chatHeads.find((chat) => chat.id === activeChat).name} */}
            </h2>
            <div
              className="message-container"
              ref={chatMessagesRef}
              style={{ backgroundColor: "white", border: "none" }}
            >
              {chatHistory.map((msg) =>
                msg.type === "text" ? (
                  <div
                    key={msg._id}
                    className={`message ${
                      msg.sender._id === user?._id
                        ? "user-message"
                        : "other-message"
                    }`}
                  >
                    {msg.message}
                  </div>
                ) : (
                  <div
                    style={{ border: "none" }}
                    key={msg._id}
                    className={`message ${
                      msg.sender._id === user?._id
                        ? "user-message"
                        : "other-message"
                    }`}
                  >
                    <Image
                      style={{ marginBottom: "4%" }}
                      width={200}
                      src={msg.message}
                      alt="image-unavailable"
                    />
                  </div>
                )
              )}
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        )}
        {activeChat === null && <p>Select a chat to start</p>}
      </div>
    </div>
  );
};

export default Chat;
