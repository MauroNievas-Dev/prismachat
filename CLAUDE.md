# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

### Testing
- `npm test` - Run all tests
- `npm test -- --watch` - Run tests in watch mode
- `npm test -- ChatInput.test.js` - Run specific test file

## Application Architecture

This is a **Next.js 15 chat interface generator** with the App Router that allows users to create and customize chat UI themes in real-time.

### Core Structure
- **Main App**: `app/page.js` - Main application component (`ChatFrontendGenerator`)
- **Components**: Located in `app/components/` 
  - `ChatPreview.js` - Live preview with draggable menu system
  - `ConfigPanel.js` - Theme and layout configuration
  - `ChatMessages.js`, `ChatInput.js`, `ChatMenu.js` - UI components
- **Configuration**: `config/chatConfig.json` - Theme definitions and settings

### Key Features
1. **Theme System**: Three built-in themes (modern, classic, minimal) with full customization
2. **Menu Positioning**: Supports fixed (left/right/top/bottom) and draggable positioning
3. **Responsive Design**: Automatic compact mode detection using ResizeObserver
4. **Live Preview**: Real-time updates as configuration changes
5. **Export Functionality**: Generates CSS and JSON config files

### State Management
- React useState for local state
- localStorage persistence for configuration
- Theme switching with nested configuration updates via `updateThemeConfig`

### Styling
- Tailwind CSS for component styling
- Dynamic CSS generation for chat themes
- Custom CSS file: `app/components/ChatPreview.css`

## Configuration Structure

The `chatConfig.json` contains:
- `menuPosition`: Menu placement settings
- `textInput`: Input field dimensions
- `themeConfigs`: Complete theme definitions (colors, typography, spacing)
- `themes` and `defaultTheme`: Available theme list and default

## Testing

Tests are located in `__tests__/` using:
- Jest with jsdom environment
- React Testing Library
- Test setup in `jest.setup.js`