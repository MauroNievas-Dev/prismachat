import { render, screen } from '@testing-library/react'
import ChatMenu from '../app/components/ChatMenu'
import React from 'react'
import config from '../config/chatConfig.json' assert { type: 'json' }

describe('ChatMenu', () => {
  const theme = config.themeConfigs[config.defaultTheme]

  it('renders menu options', () => {
    render(<ChatMenu menuRef={React.createRef()} style={{}} onMouseDown={()=>{}} config={config} currentTheme={theme} />)
    expect(screen.getByText('Menú')).toBeInTheDocument()
    expect(screen.getByText('Nueva conversación')).toBeInTheDocument()
  })
})
