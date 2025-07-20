import React from "react";
import { Send } from "lucide-react";

const ChatInput = ({ config, currentTheme, isCompact }) => {
  return (
    <div
      className="input-area flex gap-2"
      style={{
        bottom:
          config.menuPosition.position === "bottom" && !isCompact ? "85px" : "40px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <input
        type="text"
        placeholder="Escribe tu mensaje aquí..."
        style={{
          width: config.textInput.width,
          height: config.textInput.height,
          padding: "12px 16px",
          border: `1px solid ${currentTheme.colors.border}`,
          borderRadius: currentTheme.spacing.borderRadius,
          backgroundColor: currentTheme.colors.chatBackground,
          color: currentTheme.colors.text,
          fontFamily: "inherit",
          fontSize: "inherit",
          outline: "none",
        }}
      />
      <button
        style={{
          backgroundColor: currentTheme.colors.accent,
          color: "white",
          border: "none",
          borderRadius: currentTheme.spacing.borderRadius,
          padding: "12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Send size={16} />
      </button>
    </div>
  );
};

export default ChatInput;
