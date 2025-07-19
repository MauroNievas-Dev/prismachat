"use client";
import React, { useState } from 'react';
import ChatPreview from './components/ChatPreview';
import ConfigPanel from './components/ConfigPanel';
import initialConfig from '../config/chatConfig.json' assert { type: 'json' };

const ChatFrontendGenerator = () => {
  const [config, setConfig] = useState(initialConfig);

  const [activeTheme, setActiveTheme] = useState(initialConfig.defaultTheme);
  const [sampleMessages] = useState([
    { type: 'user', content: 'Hola, ¿cómo estás?' },
    { type: 'ai', content: '¡Hola! Estoy muy bien, gracias por preguntar. ¿En qué puedo ayudarte hoy?' },
    { type: 'user', content: 'Me gustaría saber más sobre inteligencia artificial' },
    { type: 'ai', content: 'La inteligencia artificial es un campo fascinante que abarca muchas áreas, desde el machine learning hasta el procesamiento de lenguaje natural. ¿Hay algún aspecto específico que te interese más?' }
  ]);

  const currentTheme = config.themeConfigs[activeTheme];

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

    const configUrl = URL.createObjectURL(configBlob);
    const configLink = document.createElement('a');
    configLink.href = configUrl;
    configLink.download = 'chat-config.json';
    configLink.click();

    setTimeout(() => {
      const cssUrl = URL.createObjectURL(cssBlob);
      const cssLink = document.createElement('a');
      cssLink.href = cssUrl;
      cssLink.download = 'chat-styles.css';
      cssLink.click();
    }, 500);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatPreview
        config={config}
        setConfig={setConfig}
        currentTheme={currentTheme}
        activeTheme={activeTheme}
        sampleMessages={sampleMessages}
      />
      <ConfigPanel
        config={config}
        setConfig={setConfig}
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
        currentTheme={currentTheme}
        updateThemeConfig={updateThemeConfig}
        exportConfig={exportConfig}
      />
    </div>
  );
};

export default ChatFrontendGenerator;
