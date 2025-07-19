"use client";
import React, { useRef, useState, useEffect } from "react";
import { Menu, Send, User, Bot } from "lucide-react";

const ChatPreview = ({
  config,
  setConfig,
  currentTheme,
  activeTheme,
  sampleMessages,
}) => {
  const [isDraggingMenu, setIsDraggingMenu] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);
  const chatContainerRef = useRef(null);

  const handleMenuDragStart = (e) => {
    if (config.menuPosition.type !== "draggable") return;

    setIsDraggingMenu(true);
    const rect = menuRef.current.getBoundingClientRect();
    const containerRect = chatContainerRef.current.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - rect.left + containerRect.left,
      y: e.clientY - rect.top + containerRect.top,
    });
  };

  const handleMenuDrag = (e) => {
    if (!isDraggingMenu || config.menuPosition.type !== "draggable") return;

    const containerRect = chatContainerRef.current.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffset.x;
    const newY = e.clientY - containerRect.top - dragOffset.y;

    setConfig((prev) => ({
      ...prev,
      menuPosition: {
        ...prev.menuPosition,
        coordinates: { x: Math.max(0, newX), y: Math.max(0, newY) },
      },
    }));
  };

  const handleMenuDragEnd = () => {
    setIsDraggingMenu(false);
  };

  useEffect(() => {
    if (isDraggingMenu) {
      document.addEventListener("mousemove", handleMenuDrag);
      document.addEventListener("mouseup", handleMenuDragEnd);

      return () => {
        document.removeEventListener("mousemove", handleMenuDrag);
        document.removeEventListener("mouseup", handleMenuDragEnd);
      };
    }
  }, [isDraggingMenu]);

  const getMenuStyle = () => {
    const baseStyle = {
      backgroundColor: currentTheme.colors.menuBackground,
      border: `1px solid ${currentTheme.colors.border}`,
      borderRadius: currentTheme.spacing.borderRadius,
      padding: "16px",
      cursor: config.menuPosition.type === "draggable" ? "move" : "default",
      userSelect: "none",
      minWidth: "150px",
    };

    if (config.menuPosition.type === "draggable") {
      return {
        ...baseStyle,
        position: "absolute",
        left: `${config.menuPosition.coordinates.x}px`,
        top: `${config.menuPosition.coordinates.y}px`,
        zIndex: 10,
      };
    }

    switch (config.menuPosition.position) {
      case "left":
        return { ...baseStyle, position: "absolute", left: "20px", top: "20px" };
      case "right":
        return { ...baseStyle, position: "absolute", right: "20px", top: "20px" };
      case "top":
        return {
          ...baseStyle,
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "bottom":
        return {
          ...baseStyle,
          position: "absolute",
          bottom: "80px",
          left: "50%",
          transform: "translateX(-50%)",
        };
      default:
        return { ...baseStyle, position: "absolute", left: "20px", top: "20px" };
    }
  };

  return (
    <div className="flex-1 p-4">
      <div className="h-full border rounded-lg bg-white shadow-lg overflow-hidden">
        <div className="h-8 bg-gray-200 flex items-center px-4 text-sm text-gray-600 border-b">
          Preview - Tema: {activeTheme}
        </div>
        <div
          ref={chatContainerRef}
          className="relative h-full"
          style={{
            backgroundColor: currentTheme.colors.background,
            fontFamily: currentTheme.typography.fontFamily,
            fontSize: currentTheme.typography.fontSize,
            color: currentTheme.colors.text,
            padding: currentTheme.spacing.containerPadding,
          }}
        >
          {/* Menú */}
          <div
            ref={menuRef}
            style={getMenuStyle()}
            onMouseDown={handleMenuDragStart}
            className={config.menuPosition.type === "draggable" ? "cursor-move" : ""}
          >
            <div className="flex items-center gap-2 mb-2">
              <Menu size={16} style={{ color: currentTheme.colors.text }} />
              <span style={{ color: currentTheme.colors.text, fontSize: "14px" }}>Menú</span>
            </div>
            <div className="space-y-1">
              <div className="px-2 py-1 text-sm rounded" style={{ color: currentTheme.colors.textSecondary }}>
                Nueva conversación
              </div>
              <div className="px-2 py-1 text-sm rounded" style={{ color: currentTheme.colors.textSecondary }}>
                Historial
              </div>
              <div className="px-2 py-1 text-sm rounded" style={{ color: currentTheme.colors.textSecondary }}>
                Configuración
              </div>
            </div>
          </div>

          {/* Área de mensajes */}
          <div
            className="messages-area"
            style={{
              backgroundColor: currentTheme.colors.chatBackground,
              border: `1px solid ${currentTheme.colors.border}`,
              borderRadius: currentTheme.spacing.borderRadius,
              padding: currentTheme.spacing.containerPadding,
              height: "calc(100% - 160px)",
              overflowY: "auto",
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
                }}
              >
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
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                  }}
                >
                  {message.type === "ai" && <Bot size={16} />}
                  {message.type === "user" && <User size={16} />}
                  <span>{message.content}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input de texto */}
          <div
            className="input-area flex gap-2"
            style={{
              position: "absolute",
              bottom: "20px",
              left: currentTheme.spacing.containerPadding,
              right: currentTheme.spacing.containerPadding,
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
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;
