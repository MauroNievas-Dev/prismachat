"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Download, Menu, Send, User, Bot, Palette, Type, Layout, Settings } from 'lucide-react';

const ChatFrontendGenerator = () => {
  const [config, setConfig] = useState({
    menuPosition: {
      type: 'fixed',
      position: 'left',
      coordinates: { x: 0, y: 0 }
    },
    textInput: {
      width: '100%',
      height: '50px'
    },
    themes: ['modern', 'classic', 'minimal'],
    defaultTheme: 'modern',
    themeConfigs: {
      modern: {
        colors: {
          background: '#0f0f23',
          chatBackground: '#1a1a2e',
          userMessage: '#2d4a88',
          aiMessage: '#333366',
          text: '#ffffff',
          textSecondary: '#b0b0b0',
          menuBackground: '#16213e',
          border: '#3d4a6b',
          accent: '#4f7cff'
        },
        typography: {
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '1.5'
        },
        spacing: {
          messagePadding: '12px 16px',
          messageMargin: '8px 0',
          containerPadding: '20px',
          borderRadius: '12px'
        }
      },
      classic: {
        colors: {
          background: '#f5f5f5',
          chatBackground: '#ffffff',
          userMessage: '#007bff',
          aiMessage: '#e9ecef',
          text: '#333333',
          textSecondary: '#666666',
          menuBackground: '#ffffff',
          border: '#dee2e6',
          accent: '#007bff'
        },
        typography: {
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '1.4'
        },
        spacing: {
          messagePadding: '10px 15px',
          messageMargin: '5px 0',
          containerPadding: '15px',
          borderRadius: '8px'
        }
      },
      minimal: {
        colors: {
          background: '#ffffff',
          chatBackground: '#ffffff',
          userMessage: '#000000',
          aiMessage: '#f8f9fa',
          text: '#000000',
          textSecondary: '#666666',
          menuBackground: '#ffffff',
          border: '#e0e0e0',
          accent: '#000000'
        },
        typography: {
          fontFamily: 'SF Pro Display, -apple-system, sans-serif',
          fontSize: '15px',
          fontWeight: '400',
          lineHeight: '1.6'
        },
        spacing: {
          messagePadding: '16px 20px',
          messageMargin: '12px 0',
          containerPadding: '24px',
          borderRadius: '20px'
        }
      }
    }
  });

  const [activeTheme, setActiveTheme] = useState('modern');
  const [isDraggingMenu, setIsDraggingMenu] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);
  const chatContainerRef = useRef(null);

  const [sampleMessages] = useState([
    { type: 'user', content: 'Hola, ¿cómo estás?' },
    { type: 'ai', content: '¡Hola! Estoy muy bien, gracias por preguntar. ¿En qué puedo ayudarte hoy?' },
    { type: 'user', content: 'Me gustaría saber más sobre inteligencia artificial' },
    { type: 'ai', content: 'La inteligencia artificial es un campo fascinante que abarca muchas áreas, desde el machine learning hasta el procesamiento de lenguaje natural. ¿Hay algún aspecto específico que te interese más?' }
  ]);

  const currentTheme = config.themeConfigs[activeTheme];

  const handleMenuDragStart = (e) => {
    if (config.menuPosition.type !== 'draggable') return;

    setIsDraggingMenu(true);
    const rect = menuRef.current.getBoundingClientRect();
    const containerRect = chatContainerRef.current.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - rect.left + containerRect.left,
      y: e.clientY - rect.top + containerRect.top
    });
  };

  const handleMenuDrag = (e) => {
    if (!isDraggingMenu || config.menuPosition.type !== 'draggable') return;

    const containerRect = chatContainerRef.current.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffset.x;
    const newY = e.clientY - containerRect.top - dragOffset.y;

    setConfig(prev => ({
      ...prev,
      menuPosition: {
        ...prev.menuPosition,
        coordinates: { x: Math.max(0, newX), y: Math.max(0, newY) }
      }
    }));
  };

  const handleMenuDragEnd = () => {
    setIsDraggingMenu(false);
  };

  useEffect(() => {
    if (isDraggingMenu) {
      document.addEventListener('mousemove', handleMenuDrag);
      document.addEventListener('mouseup', handleMenuDragEnd);

      return () => {
        document.removeEventListener('mousemove', handleMenuDrag);
        document.removeEventListener('mouseup', handleMenuDragEnd);
      };
    }
  }, [isDraggingMenu]);

  const updateThemeConfig = (themeName, path, value) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      const pathArray = path.split('.');
      let current = newConfig.themeConfigs[themeName];

      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]];
      }
      current[pathArray[pathArray.length - 1]] = value;

      return newConfig;
    });
  };

  const generateCSS = () => {
    const theme = config.themeConfigs[activeTheme];
    return `/* Generated Chat IA Styles */
.chat-container {
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.fontSize};
  font-weight: ${theme.typography.fontWeight};
  line-height: ${theme.typography.lineHeight};
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  padding: ${theme.spacing.containerPadding};
  height: 100vh;
  position: relative;
}

.chat-messages {
  background-color: ${theme.colors.chatBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.spacing.borderRadius};
  padding: ${theme.spacing.containerPadding};
  height: calc(100vh - 120px);
  overflow-y: auto;
  margin-bottom: 20px;
}

.message {
  margin: ${theme.spacing.messageMargin};
  padding: ${theme.spacing.messagePadding};
  border-radius: ${theme.spacing.borderRadius};
  max-width: 80%;
}

.message.user {
  background-color: ${theme.colors.userMessage};
  color: white;
  margin-left: auto;
}

.message.ai {
  background-color: ${theme.colors.aiMessage};
  color: ${theme.colors.text};
}

.chat-input {
  width: ${config.textInput.width};
  height: ${config.textInput.height};
  padding: 12px 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.spacing.borderRadius};
  background-color: ${theme.colors.chatBackground};
  color: ${theme.colors.text};
  font-family: inherit;
  font-size: inherit;
}

.chat-menu {
  background-color: ${theme.colors.menuBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.spacing.borderRadius};
  padding: 16px;
  ${config.menuPosition.type === 'draggable'
    ? `position: absolute; left: ${config.menuPosition.coordinates.x}px; top: ${config.menuPosition.coordinates.y}px;`
    : getMenuPositionCSS()
  }
}`;
  };

  const getMenuPositionCSS = () => {
    switch (config.menuPosition.position) {
      case 'left': return 'position: fixed; left: 20px; top: 20px; width: 200px;';
      case 'right': return 'position: fixed; right: 20px; top: 20px; width: 200px;';
      case 'top': return 'position: fixed; top: 20px; left: 50%; transform: translateX(-50%);';
      case 'bottom': return 'position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);';
      default: return 'position: fixed; left: 20px; top: 20px;';
    }
  };

  const exportConfig = () => {
    const configToExport = {
      ...config,
      generatedAt: new Date().toISOString(),
      version: '1.0.0'
    };

    const configBlob = new Blob([JSON.stringify(configToExport, null, 2)], { type: 'application/json' });
    const cssBlob = new Blob([generateCSS()], { type: 'text/css' });

    // Descargar JSON
    const configUrl = URL.createObjectURL(configBlob);
    const configLink = document.createElement('a');
    configLink.href = configUrl;
    configLink.download = 'chat-config.json';
    configLink.click();

    // Descargar CSS
    setTimeout(() => {
      const cssUrl = URL.createObjectURL(cssBlob);
      const cssLink = document.createElement('a');
      cssLink.href = cssUrl;
      cssLink.download = 'chat-styles.css';
      cssLink.click();
    }, 500);
  };

  const getMenuStyle = () => {
    const baseStyle = {
      backgroundColor: currentTheme.colors.menuBackground,
      border: `1px solid ${currentTheme.colors.border}`,
      borderRadius: currentTheme.spacing.borderRadius,
      padding: '16px',
      cursor: config.menuPosition.type === 'draggable' ? 'move' : 'default',
      userSelect: 'none',
      minWidth: '150px'
    };

    if (config.menuPosition.type === 'draggable') {
      return {
        ...baseStyle,
        position: 'absolute',
        left: `${config.menuPosition.coordinates.x}px`,
        top: `${config.menuPosition.coordinates.y}px`,
        zIndex: 10
      };
    }

    switch (config.menuPosition.position) {
      case 'left':
        return { ...baseStyle, position: 'absolute', left: '20px', top: '20px' };
      case 'right':
        return { ...baseStyle, position: 'absolute', right: '20px', top: '20px' };
      case 'top':
        return { ...baseStyle, position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom':
        return { ...baseStyle, position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)' };
      default:
        return { ...baseStyle, position: 'absolute', left: '20px', top: '20px' };
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Panel de Preview */}
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
              padding: currentTheme.spacing.containerPadding
            }}
          >
            {/* Menú */}
            <div
              ref={menuRef}
              style={getMenuStyle()}
              onMouseDown={handleMenuDragStart}
              className={config.menuPosition.type === 'draggable' ? 'cursor-move' : ''}
            >
              <div className="flex items-center gap-2 mb-2">
                <Menu size={16} style={{ color: currentTheme.colors.text }} />
                <span style={{ color: currentTheme.colors.text, fontSize: '14px' }}>Menú</span>
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
                height: 'calc(100% - 160px)',
                overflowY: 'auto',
                marginTop: config.menuPosition.position === 'top' ? '80px' : '20px',
                marginBottom: '20px'
              }}
            >
              {sampleMessages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                    margin: currentTheme.spacing.messageMargin
                  }}
                >
                  <div
                    style={{
                      backgroundColor: message.type === 'user'
                        ? currentTheme.colors.userMessage
                        : currentTheme.colors.aiMessage,
                      color: message.type === 'user' ? 'white' : currentTheme.colors.text,
                      padding: currentTheme.spacing.messagePadding,
                      borderRadius: currentTheme.spacing.borderRadius,
                      maxWidth: '80%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px'
                    }}
                  >
                    {message.type === 'ai' && <Bot size={16} />}
                    {message.type === 'user' && <User size={16} />}
                    <span>{message.content}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input de texto */}
            <div
              className="input-area flex gap-2"
              style={{
                position: 'absolute',
                bottom: '20px',
                left: currentTheme.spacing.containerPadding,
                right: currentTheme.spacing.containerPadding
              }}
            >
              <input
                type="text"
                placeholder="Escribe tu mensaje aquí..."
                style={{
                  width: config.textInput.width,
                  height: config.textInput.height,
                  padding: '12px 16px',
                  border: `1px solid ${currentTheme.colors.border}`,
                  borderRadius: currentTheme.spacing.borderRadius,
                  backgroundColor: currentTheme.colors.chatBackground,
                  color: currentTheme.colors.text,
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  outline: 'none'
                }}
              />
              <button
                style={{
                  backgroundColor: currentTheme.colors.accent,
                  color: 'white',
                  border: 'none',
                  borderRadius: currentTheme.spacing.borderRadius,
                  padding: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de Configuración */}
      <div className="w-80 bg-white border-l overflow-y-auto">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Settings size={20} />
            Configuración
          </h2>
        </div>

        <div className="p-4 space-y-6">
          {/* Selector de Tema */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tema Activo
            </label>
            <select
              value={activeTheme}
              onChange={(e) => setActiveTheme(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {config.themes.map(theme => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>

          {/* Configuración de Menú */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Layout size={16} />
              Posición del Menú
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Tipo</label>
                <select
                  value={config.menuPosition.type}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    menuPosition: { ...prev.menuPosition, type: e.target.value }
                  }))}
                  className="w-full p-2 text-sm border border-gray-300 rounded"
                >
                  <option value="fixed">Posición Fija</option>
                  <option value="draggable">Arrastrable</option>
                </select>
              </div>

              {config.menuPosition.type === 'fixed' && (
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Posición</label>
                  <select
                    value={config.menuPosition.position}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      menuPosition: { ...prev.menuPosition, position: e.target.value }
                    }))}
                    className="w-full p-2 text-sm border border-gray-300 rounded"
                  >
                    <option value="left">Izquierda</option>
                    <option value="right">Derecha</option>
                    <option value="top">Arriba</option>
                    <option value="bottom">Abajo</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Configuración del Input */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Campo de Texto</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Ancho</label>
                <input
                  type="text"
                  value={config.textInput.width}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    textInput: { ...prev.textInput, width: e.target.value }
                  }))}
                  className="w-full p-2 text-sm border border-gray-300 rounded"
                  placeholder="ej: 100%, 400px"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Alto</label>
                <input
                  type="text"
                  value={config.textInput.height}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    textInput: { ...prev.textInput, height: e.target.value }
                  }))}
                  className="w-full p-2 text-sm border border-gray-300 rounded"
                  placeholder="ej: 50px, 3rem"
                />
              </div>
            </div>
          </div>

          {/* Configuración de Colores */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Palette size={16} />
              Colores
            </h3>
            <div className="space-y-2">
              {Object.entries(currentTheme.colors).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => updateThemeConfig(activeTheme, `colors.${key}`, e.target.value)}
                    className="w-8 h-8 rounded border"
                  />
                  <label className="text-xs text-gray-600 flex-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Configuración de Tipografía */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Type size={16} />
              Tipografía
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Fuente</label>
                <input
                  type="text"
                  value={currentTheme.typography.fontFamily}
                  onChange={(e) => updateThemeConfig(activeTheme, 'typography.fontFamily', e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Tamaño</label>
                <input
                  type="text"
                  value={currentTheme.typography.fontSize}
                  onChange={(e) => updateThemeConfig(activeTheme, 'typography.fontSize', e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Configuración de Espaciado */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Espaciado</h3>
            <div className="space-y-2">
              {Object.entries(currentTheme.spacing).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-xs text-gray-600 mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateThemeConfig(activeTheme, `spacing.${key}`, e.target.value)}
                    className="w-full p-2 text-sm border border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Botón de Exportar */}
          <button
            onClick={exportConfig}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md flex items-center justify-center gap-2 font-medium"
          >
            <Download size={16} />
            Exportar Configuración
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatFrontendGenerator;