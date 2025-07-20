"use client";
import React, { useState } from "react";
import { Download, Palette, Type, Layout, Settings } from "lucide-react";
import Modal from "./Modal";
import defaultConfig from "../../config/chatConfig.json" assert { type: "json" };

const ConfigPanel = ({
  config,
  setConfig,
  activeTheme,
  setActiveTheme,
  currentTheme,
  updateThemeConfig,
  exportConfig,
}) => {
  const [showAddThemeModal, setShowAddThemeModal] = useState(false);
  const [newThemeName, setNewThemeName] = useState("");
  const [themeError, setThemeError] = useState("");
  const defaultThemes = defaultConfig.themes;
  const [showDeleteThemeModal, setShowDeleteThemeModal] = useState(false);

  const addTheme = () => {
    setThemeError("");
    setShowAddThemeModal(true);
  };

  const confirmAddTheme = () => {
    const name = newThemeName.trim();
    if (!name) {
      setThemeError("Debe ingresar un nombre");
      return;
    }
    if (config.themes.includes(name)) {
      setThemeError("El tema ya existe");
      return;
    }
    const baseTheme = config.themeConfigs[activeTheme];
    setConfig((prev) => ({
      ...prev,
      themes: [...prev.themes, name],
      themeConfigs: {
        ...prev.themeConfigs,
        [name]: JSON.parse(JSON.stringify(baseTheme)),
      },
    }));
    setActiveTheme(name);
    setNewThemeName("");
    setShowAddThemeModal(false);
  };

  const deleteTheme = () => {
    setShowDeleteThemeModal(true);
  };

  const confirmDeleteTheme = () => {
    const themeName = activeTheme;
    const remainingThemes = config.themes.filter((t) => t !== themeName);
    const { [themeName]: _removed, ...remainingConfigs } = config.themeConfigs;
    setConfig((prev) => ({
      ...prev,
      themes: remainingThemes,
      themeConfigs: remainingConfigs,
    }));
    setActiveTheme(remainingThemes[0] || defaultThemes[0]);
    setShowDeleteThemeModal(false);
  };
  return (
    <>
      <div
        className="w-80 border-l overflow-y-auto"
        style={{
          backgroundColor: currentTheme.colors.chatBackground,
          color: currentTheme.colors.text,
          borderColor: currentTheme.colors.border,
        }}
      >
        <div
          className="p-4 border-b"
          style={{
            backgroundColor: currentTheme.colors.background,
            color: currentTheme.colors.text,
            borderColor: currentTheme.colors.border,
          }}
        >
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Settings size={20} />
            Configuración
          </h2>
        </div>

      <div className="p-4 space-y-6">
        {/* Selector de Tema */}
        <div>
          <label className="block text-sm font-medium mb-2">Tema Activo</label>
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
        <button
          type="button"
          onClick={addTheme}
          className="mt-2 text-sm text-blue-600"
        >
          Nuevo Tema
        </button>
        {!defaultThemes.includes(activeTheme) && (
          <button
            type="button"
            onClick={deleteTheme}
            className="mt-2 ml-2 text-sm text-red-600"
          >
            Eliminar Tema
          </button>
        )}
      </div>

        {/* Configuración de Menú */}
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Layout size={16} />
            Posición del Menú
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs mb-1">Tipo</label>
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
                <label className="block text-xs mb-1">Posición</label>
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
          <h3 className="text-sm font-medium mb-3">Campo de Texto</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs mb-1">Ancho</label>
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
              <label className="block text-xs mb-1">Alto</label>
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
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
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
                  className="w-10 h-10 rounded"
                />
                <label className="text-xs flex-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Configuración de Tipografía */}
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Type size={16} />
            Tipografía
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs mb-1">Fuente</label>
              <input
                type="text"
                value={currentTheme.typography.fontFamily}
                onChange={(e) => updateThemeConfig(activeTheme, "typography.fontFamily", e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Tamaño</label>
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
          <h3 className="text-sm font-medium mb-3">Espaciado</h3>
          <div className="space-y-2">
            {Object.entries(currentTheme.spacing).map(([key, value]) => (
              <div key={key}>
                <label className="block text-xs mb-1 capitalize">
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
      <Modal
        isOpen={showAddThemeModal}
        title="Nuevo Tema"
        onClose={() => setShowAddThemeModal(false)}
        currentTheme={currentTheme}
      >
        <div className="space-y-4">
          <input
            type="text"
            value={newThemeName}
            onChange={(e) => setNewThemeName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Nombre del tema"
          />
          {themeError && <p className="text-sm text-red-600">{themeError}</p>}
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 text-sm border rounded"
              onClick={() => setShowAddThemeModal(false)}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
              onClick={confirmAddTheme}
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={showDeleteThemeModal}
        title={`Eliminar Tema`}
        onClose={() => setShowDeleteThemeModal(false)}
        currentTheme={currentTheme}
      >
        <div className="space-y-4">
          <p>¿Estás seguro de que deseas eliminar el tema &quot;{activeTheme}&quot;?</p>
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 text-sm border rounded"
              onClick={() => setShowDeleteThemeModal(false)}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 text-sm bg-red-600 text-white rounded"
              onClick={confirmDeleteTheme}
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfigPanel;
