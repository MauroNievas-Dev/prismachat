import React from "react";
import { Menu } from "lucide-react";

const ChatMenu = ({
  menuRef,
  style,
  onMouseDown,
  config,
  currentTheme,
}) => {
  return (
    <div
      ref={menuRef}
      style={style}
      onMouseDown={onMouseDown}
      className={config.menuPosition.type === "draggable" ? "cursor-move" : ""}
    >
      <div className="flex items-center gap-2 mb-2">
        <Menu size={16} style={{ color: currentTheme.colors.text }} />
        <span style={{ color: currentTheme.colors.text, fontSize: "14px" }}>Menú</span>
      </div>
      <div
        className={
          config.menuPosition.position === "top" || config.menuPosition.position === "bottom"
            ? "flex gap-2"
            : "space-y-1"
        }
      >
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
  );
};

export default ChatMenu;
