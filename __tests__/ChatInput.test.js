import { render, screen } from '@testing-library/react'
import ChatInput from '../app/components/ChatInput'
import config from '../config/chatConfig.json' assert { type: 'json' }

describe('ChatInput', () => {
  const theme = config.themeConfigs[config.defaultTheme]

  it('renders input placeholder', () => {
    render(<ChatInput config={config} currentTheme={theme} />)
    expect(screen.getByPlaceholderText('Escribe tu mensaje aquí...')).toBeInTheDocument()
  })
})
