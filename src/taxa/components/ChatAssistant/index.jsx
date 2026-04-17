import { Robot } from "@boxicons/react";
import { useEffect, useRef, useState } from "react";

export const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: "bot", text: "¡Hola! Puedes usar la cámara desde el menú lateral 📸" }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMessage = { type: "user", text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        setTimeout(() => {
            const botMessage = { type: "bot", text: "Gracias por tu mensaje. Estoy aprendiendo para ayudarte mejor." };
            setMessages(prev => [...prev, botMessage]);
        }, 500);
    };

    return (
        <div className="chat-assistant">
            <div className="chat-bubble" onClick={() => setIsOpen(!isOpen)}>
                <Robot />
            </div>
            
            <div className={`chat-window ${!isOpen ? "closed" : ""}`}>
                <div className="chat-header">
                    <span><i className="fas fa-comment-dots"></i> Asistente IA</span>
                    <button className="close-chat" onClick={() => setIsOpen(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`msg msg-${msg.type}`}>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                
                <div className="chat-input-area">
                    <input 
                        type="text" 
                        placeholder="Escribe tu mensaje..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button onClick={sendMessage}>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};