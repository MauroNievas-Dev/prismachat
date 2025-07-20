import { render, screen } from '@testing-library/react'
import ChatMessages from '../app/components/ChatMessages'
import config from '../config/chatConfig.json' assert { type: 'json' }

describe('ChatMessages', () => {
  const theme = config.themeConfigs[config.defaultTheme]
  const sample = [
    { type: 'user', content: 'hola' },
    { type: 'ai', content: 'respuesta' },
  ]

  it('shows provided messages', () => {
    render(<ChatMessages sampleMessages={sample} currentTheme={theme} config={config} />)
    expect(screen.getByText('hola')).toBeInTheDocument()
    expect(screen.getByText('respuesta')).toBeInTheDocument()
  })
})
