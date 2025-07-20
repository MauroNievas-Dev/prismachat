import { render, screen, fireEvent } from '@testing-library/react'
import Modal from '../app/components/Modal'
import config from '../config/chatConfig.json' assert { type: 'json' }

describe('Modal', () => {
  const theme = config.themeConfigs[config.defaultTheme]

  it('does not render when closed', () => {
    const { container } = render(
      <Modal isOpen={false} title="Test" onClose={() => {}} currentTheme={theme}>
        <p>content</p>
      </Modal>
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders content and close button', () => {
    const handleClose = jest.fn()
    render(
      <Modal isOpen={true} title="Test" onClose={handleClose} currentTheme={theme}>
        <p>content</p>
      </Modal>
    )
    expect(screen.getByText('content')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))
    expect(handleClose).toHaveBeenCalled()
  })
})
