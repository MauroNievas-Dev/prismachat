"use client";
import React from "react";
import { Download, Palette, Type, Layout, Settings } from "lucide-react";

const ConfigPanel = ({
  config,
  setConfig,
  activeTheme,
  setActiveTheme,
  currentTheme,
  updateThemeConfig,
  exportConfig,
}) => {
  return (
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Tema Activo</label>
          <select
            value={activeTheme}
            onChange={(e) => setActiveTheme(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {config.themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
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
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    menuPosition: { ...prev.menuPosition, type: e.target.value },
                  }))
                }
                className="w-full p-2 text-sm border border-gray-300 rounded"
              >
                <option value="fixed">Posición Fija</option>
                <option value="draggable">Arrastrable</option>
              </select>
            </div>

            {config.menuPosition.type === "fixed" && (
              <div>
                <label className="block text-xs text-gray-600 mb-1">Posición</label>
                <select
                  value={config.menuPosition.position}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      menuPosition: { ...prev.menuPosition, position: e.target.value },
                    }))
                  }
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
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    textInput: { ...prev.textInput, width: e.target.value },
                  }))
                }
                className="w-full p-2 text-sm border border-gray-300 rounded"
                placeholder="ej: 100%, 400px"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Alto</label>
              <input
                type="text"
                value={config.textInput.height}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    textInput: { ...prev.textInput, height: e.target.value },
                  }))
                }
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
                  {key.replace(/([A-Z])/g, " $1").trim()}
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
                onChange={(e) => updateThemeConfig(activeTheme, "typography.fontFamily", e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Tamaño</label>
              <input
                type="text"
                value={currentTheme.typography.fontSize}
                onChange={(e) => updateThemeConfig(activeTheme, "typography.fontSize", e.target.value)}
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
                  {key.replace(/([A-Z])/g, " $1").trim()}
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
  );
};

export default ConfigPanel;
