"use client";
import React, { useRef, useState, useEffect } from "react";
import ChatMenu from "./ChatMenu";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import "./ChatPreview.css";

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
  const [isCompact, setIsCompact] = useState(false);

  const MENU_WIDTH = 200;
  const COMPACT_WIDTH = 400;

  const isFixedLeftRight =
    config.menuPosition.type === "fixed" &&
    (config.menuPosition.position === "left" ||
      config.menuPosition.position === "right");

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

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      const usableWidth = width - (isFixedLeftRight ? MENU_WIDTH : 0);
      setIsCompact(usableWidth < COMPACT_WIDTH);
    });
    if (chatContainerRef.current) {
      observer.observe(chatContainerRef.current);
    }
    return () => observer.disconnect();
  }, [isFixedLeftRight]);

  const getMenuStyle = () => {
    const baseStyle = {
      backgroundColor: (config.menuPosition.position === "top" || config.menuPosition.position === "bottom" || isCompact) ? "" : currentTheme.colors.menuBackground,
      border: (config.menuPosition.position === "top" || config.menuPosition.position === "bottom" || isCompact) ? "" :`1px solid ${currentTheme.colors.border}`,
      borderRadius: currentTheme.spacing.borderRadius,
      padding: "16px",
      cursor: config.menuPosition.type === "draggable" ? "move" : "default",
      userSelect: "none",
      minWidth: "150px",
      ...((config.menuPosition.position === "top" || config.menuPosition.position === "bottom" || isCompact) && {
        display: "flex",
        gap: "8px",
        alignItems: "center",
        justifyContent: "center",
      }),
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
        return {
          ...baseStyle,
          position: isCompact ? "absolute" : "absolute",
          left: isCompact ? "50%" : 0,
          top: isCompact ? "10px" : 0,
          bottom: isCompact ? undefined : 0,
          height: isCompact ? undefined : "100%",
          width: isCompact ? undefined : `${MENU_WIDTH}px`,
          transform: isCompact ? "translateX(-50%)" : undefined,
        };
      case "right":
        return {
          ...baseStyle,
          position: isCompact ? "absolute" : "absolute",
          right: isCompact ? undefined : 0,
          left: isCompact ? "50%" : undefined,
          top: isCompact ? "10px" : 0,
          bottom: isCompact ? undefined : 0,
          height: isCompact ? undefined : "100%",
          width: isCompact ? undefined : `${MENU_WIDTH}px`,
          transform: isCompact ? "translateX(-50%)" : undefined,
        };
      case "top":
        return {
          ...baseStyle,
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "bottom":
        return {
          ...baseStyle,
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        };
      default:
        return { ...baseStyle, position: "absolute", left: "20px", top: "20px" };
    }
  };

  return (
    <div className="flex-1 p-0"   style={{
          backgroundColor: currentTheme.colors.chatBackground,
          borderColor: currentTheme.colors.border,
        }}

        >
      <div
        className="h-full border rounded-lg shadow-lg overflow-hidden"
          ref={chatContainerRef}

        style={{
          backgroundColor: currentTheme.colors.chatBackground,
          borderColor: currentTheme.colors.border,
        }}
      >
        <div
          className="h-8 flex items-center px-4 text-sm border-b"
          style={{
            backgroundColor: currentTheme.colors.background,
            color: currentTheme.colors.text,
            borderColor: currentTheme.colors.border,
          }}
        >
          Preview - Tema: {activeTheme}
        </div>
        <div
          className="relative h-full"
          style={{
            backgroundColor: currentTheme.colors.background,
            fontFamily: currentTheme.typography.fontFamily,
            fontSize: currentTheme.typography.fontSize,
            color: currentTheme.colors.text,
            paddingTop: currentTheme.spacing.containerPadding,
            paddingBottom: currentTheme.spacing.containerPadding,
            paddingLeft: currentTheme.spacing.containerPadding,
            paddingRight: currentTheme.spacing.containerPadding,
            ...(isFixedLeftRight &&
              !isCompact &&
              config.menuPosition.position === "left" && {
                paddingLeft: `calc(${currentTheme.spacing.containerPadding} + ${MENU_WIDTH}px)`,
              }),
            ...(isFixedLeftRight &&
              !isCompact &&
              config.menuPosition.position === "right" && {
                paddingRight: `calc(${currentTheme.spacing.containerPadding} + ${MENU_WIDTH}px)`,
              }),
          }}
        >
          <ChatMenu
            menuRef={menuRef}
            style={getMenuStyle()}
            onMouseDown={handleMenuDragStart}
            config={config}
            currentTheme={currentTheme}
            isCompact={isCompact}
          />

          <ChatMessages
            sampleMessages={sampleMessages}
            currentTheme={currentTheme}
            config={config}
            isCompact={isCompact}
          />

          <ChatInput config={config} currentTheme={currentTheme} isCompact={isCompact} />
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;
