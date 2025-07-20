import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import ConfigPanel from '../app/components/ConfigPanel'
import configData from '../config/chatConfig.json' assert { type: 'json' }

describe('ConfigPanel', () => {
  const theme = configData.themeConfigs[configData.defaultTheme]
  let config
  beforeEach(() => {
    config = JSON.parse(JSON.stringify(configData))
  })

  it('opens add theme modal', () => {
    render(
      <ConfigPanel
        config={config}
        setConfig={() => {}}
        activeTheme={config.defaultTheme}
        setActiveTheme={() => {}}
        currentTheme={theme}
        updateThemeConfig={() => {}}
        exportConfig={() => {}}
      />
    )
    fireEvent.click(screen.getByText('Crear Tema'))
    expect(screen.getByText('Nuevo Tema')).toBeInTheDocument()
  })
})
