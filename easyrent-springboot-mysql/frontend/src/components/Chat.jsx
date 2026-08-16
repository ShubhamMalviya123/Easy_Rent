import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import axios from "axios";
import { getSocket } from "../services/socket.service";

const Chat = ({ relationId, senderId, onClose, recipientName }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    const socket = getSocket();

    useEffect(() => {
        // Join the chat room
        if (socket && relationId) {
            console.log("Joining chat room:", relationId);
            socket.emit("join_chat", relationId);

            const handleReceiveMessage = (message) => {
                console.log("Received message:", message);
                setMessages((prev) => [...prev, message]);
            };

            // Remove any existing listener to avoid duplicates
            socket.off("receive_message");
            // Listen for incoming messages
            socket.on("receive_message", handleReceiveMessage);

            return () => {
                socket.off("receive_message", handleReceiveMessage);
            };
        } else {
            console.log("Socket or relationId missing:", { socket: !!socket, relationId });
        }
    }, [socket, relationId]);

    useEffect(() => {
        // Fetch chat history
        const fetchMessages = async () => {
            try {
                console.log("Fetching messages for relationId:", relationId);
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/chat/${relationId}`,
                    { withCredentials: true }
                );
                console.log("Fetched messages:", response.data.messages);
                setMessages(response.data.messages);

                // Mark messages as read
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/chat/read`,
                    { relationId, userId: senderId },
                    { withCredentials: true }
                );
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        if (relationId) {
            fetchMessages();
        }
    }, [relationId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !socket) return;

        const messageData = {
            relationId,
            senderId,
            message: newMessage,
        };

        socket.emit("send_message", messageData);
        setNewMessage("");
    };

    return (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 z-50 overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-indigo-600 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-bold text-lg">
                            {recipientName ? recipientName.charAt(0).toUpperCase() : "C"}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">{recipientName || "Chat"}</h3>
                        <p className="text-blue-100 text-xs flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                            Online
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
                >
                    <FaTimes className="w-5 h-5" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg, index) => {
                    const isMyMessage = msg.senderId === senderId;
                    return (
                        <div
                            key={index}
                            className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-2xl ${isMyMessage
                                    ? "bg-primary-600 text-white rounded-br-none"
                                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                                    }`}
                            >
                                <p className="text-sm">{msg.message}</p>
                                <p
                                    className={`text-[10px] mt-1 text-right ${isMyMessage ? "text-blue-100" : "text-gray-400"
                                        }`}
                                >
                                    {new Date(msg.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
                <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-700 placeholder-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                    >
                        <FaPaperPlane className="w-4 h-4" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chat;
