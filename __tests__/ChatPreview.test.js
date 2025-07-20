import { render, screen } from '@testing-library/react'
import React from 'react'
import ChatPreview from '../app/components/ChatPreview'
import config from '../config/chatConfig.json' assert { type: 'json' }

describe('ChatPreview', () => {
  const theme = config.themeConfigs[config.defaultTheme]
  const sampleMessages = [
    { type: 'user', content: 'hola' },
    { type: 'ai', content: 'respuesta' },
  ]

  it('renders menu, messages and input', () => {
    render(
      <ChatPreview
        config={config}
        setConfig={() => {}}
        currentTheme={theme}
        activeTheme={config.defaultTheme}
        sampleMessages={sampleMessages}
      />
    )
    expect(screen.getByText('Nueva conversación')).toBeInTheDocument()
    expect(screen.getByText('hola')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Escribe tu mensaje aquí...')).toBeInTheDocument()
  })
})
