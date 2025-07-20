import React from "react";
import { User, Bot } from "lucide-react";

const ChatMessages = ({ sampleMessages, currentTheme, config }) => {
  return (
    <div
      className="messages-area"
      style={{
        backgroundColor: currentTheme.colors.chatBackground,
        border: `1px solid ${currentTheme.colors.border}`,
        borderRadius: currentTheme.spacing.borderRadius,
        padding: currentTheme.spacing.containerPadding,
        marginTop: config.menuPosition.position === "top" ? "80px" : "20px",
        marginBottom: "20px",
      }}
    >
      {sampleMessages.map((message, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: message.type === "user" ? "flex-end" : "flex-start",
            margin: currentTheme.spacing.messageMargin,
            alignItems: "flex-end",
            gap: "4px",
          }}
        >
          {message.type === "ai" && <Bot size={30} style={{ marginLeft: "4px" }} />}
          <div
            style={{
              backgroundColor:
                message.type === "user"
                  ? currentTheme.colors.userMessage
                  : currentTheme.colors.aiMessage,
              color: message.type === "user" ? "white" : currentTheme.colors.text,
              padding: currentTheme.spacing.messagePadding,
              borderRadius: currentTheme.spacing.borderRadius,
              maxWidth: "80%",
            }}
          >
            <span>{message.content}</span>
          </div>
          {message.type === "user" && <User size={30} style={{ marginRight: "4px" }} />}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
