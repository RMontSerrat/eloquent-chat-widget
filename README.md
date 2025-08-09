# Eloquent Chat Widget

A modern, embeddable chat widget with AI integration for React applications. Built with TypeScript, Zustand for state management, and responsive design following frontend best practices.

## 🚀 Live Demo

**[DEMO](https://rmontserrat.github.io/eloquent-chat-widget/demo.html)** - Experience the widget in action!

## ✨ Features

- 🚀 **Easy to integrate**: One line of code to add to your website
- 🎨 **Fully customizable**: Colors, texts, positioning, and appearance
- 🤖 **AI/LLM integration**: Smart automatic responses
- 💾 **Local persistence**: Chat history saved in localStorage
- 📱 **Responsive design**: Works perfectly on desktop and mobile
- 🔧 **TypeScript**: Full typing for better developer experience
- ⚡ **Optimized performance**: Small bundle and fast loading
- 🎯 **Custom hooks**: Clean separation of business logic
- 🔄 **Reactive state**: Efficient management with Zustand

## 🎨 Design

- **Primary color**: `#f9f7f1`
- **Primary font**: Geist
- Clean and modern interface
- Smooth animations
- Clear visual indicators (online/offline, maintenance)

## 📦 Installation

### Via NPM

```bash
npm install eloquent-chat-widget
```

### Via Script Tag (CDN)

```html
<script src="https://unpkg.com/eloquent-chat-widget/dist/eloquent-chat-widget.umd.js"></script>
```

## 🚀 Quick Start

### Manual Initialization

```html
<script src="https://unpkg.com/eloquent-chat-widget/dist/eloquent-chat-widget.umd.js"></script>

<script>
EloquentChatWidget.init({
  config: {
    primaryColor: '#0ea5e9',
    position: 'bottom-right',
    welcomeMessage: 'Hello! How can I help you today?'
  },
  onReady: () => {
    console.log('Chat widget ready!');
  }
});
</script>
```


### React Integration

```tsx
import React from 'react';
import { EloquentChat } from 'eloquent-chat-widget';


const MyPage = () => {
  EloquentChat({
    title: 'Customer Support',
    subtitle: 'We\'re here to help',
    primaryColor: '#0ea5e9',
    position: 'bottom-right',
    welcomeMessage: 'Hello! How can I help you today?'
  });

  return (
    <div>
      <h1>My Application</h1>
      {/* Your app content */}
    </div>
  );
};

export default MyPage;
```

## ⚙️ Configuration

### Available Options

```typescript
interface ChatWidgetConfig {
  // Appearance
  primaryColor?: string;             // Primary color
  secondaryColor?: string;           // Secondary color
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  mode?: 'light' | 'dark';
  
  // Text content
  placeholder?: string;              // Input placeholder
  welcomeMessage?: string;           // Welcome message
  offlineMessage?: string;           // Offline message
  maintenanceMessage?: string;       // Maintenance message
  
  // Features
  enablePersistence?: boolean;       // Save history (default: true)
  maxMessages?: number;              // Maximum messages (default: 100)
  typingIndicatorDelay?: number;     // Typing indicator delay (ms)
  
  // API (for real LLM integration)
  apiKey?: string;                   // API key
  customStyles?: Record<string, string>; // Custom styles
}
```

### Complete Demo

```javascript
EloquentChatWidget.init({
  containerId: 'my-chat-widget',
  config: {
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    position: 'bottom-left',
    mode: 'light',
    placeholder: 'Type your message...',
    welcomeMessage: 'Welcome! How can I help you?',
    offlineMessage: 'We\'re offline right now. Leave us a message!',
    maintenanceMessage: 'System under maintenance. Please try again in a few minutes.',
    enablePersistence: true,
    maxMessages: 50,
    typingIndicatorDelay: 1500
  },
  onReady: () => console.log('Widget ready!'),
  onError: (error) => console.error('Widget error:', error)
});
```

## 🎯 Technical Features

### Architecture

- **Global State**: Zustand for efficient management
- **Custom Hooks**: Business logic separated from components
- **TypeScript**: Complete typing for safety and productivity
- **Modular CSS**: Isolated styles that don't interfere with host site

### Performance

- **Bundle Size**: 366KB (UMD) / 599KB (ES) - including all dependencies
- **Gzipped**: 119KB (UMD) / 146KB (ES) - optimized for production
- **CSS**: 24KB (~4.4KB gzipped) - comprehensive styling
- **Tree Shaking**: Supported for ES6 imports
- **Lazy Loading**: On-demand loading
- **Build Tool**: Vite for fast development and optimized builds

## 🔧 Development

### Local Setup

```bash
# Clone repository
git clone https://github.com/RMontSerrat/eloquent-chat-widget.git
cd eloquent-chat-widget

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env file with your OpenAI API key

# Development
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Test package locally
npm pack
```

### Project Structure

```
src/
  ├── components/          # React components
  │   ├── ChatWidget.tsx
  │   ├── ChatMessage.tsx
  │   └── ...
  ├── hooks/              # Custom hooks
  │   └── useChat.ts
  ├── store/              # Global state (Zustand)
  │   └── chatStore.ts
  ├── types/              # TypeScript definitions
  │   └── index.ts
  ├── utils/              # Utilities
  │   ├── storage.ts
  │   └── llm.ts
  └── styles/             # CSS styles
      └── index.css
```

## 🤖 AI Integration

The widget comes with a simulated auto-response system, but can be easily integrated with real APIs:

```typescript
// Demo OpenAI integration
import { generateLLMResponseWithAPI } from 'eloquent-chat-widget';

const response = await generateLLMResponseWithAPI(
  userMessage,
  'sk-your-api-key',
  'https://api.openai.com/v1/chat/completions'
);
```

## 📱 Responsiveness

The widget is fully responsive and adapts to different screen sizes:

- **Desktop**: Full widget with all features
- **Tablet**: Touch-optimized layout
- **Mobile**: Compact and user-friendly interface

## 🛠️ Advanced Customization

### Custom CSS

```css
/* Customize the widget with CSS */
.chat-widget-container {
  /* Your styles here */
}

.chat-widget-trigger {
  /* Customize the button */
}

.chat-message-bubble.user {
  /* Customize user messages */
}
```

### Custom Events

```javascript
EloquentChatWidget.init({
  config: { /* configuration */ },
  onReady: () => {
    console.log('Widget started');
  },
  onMessage: (message) => {
    console.log('New message:', message);
    // Integrate with analytics, webhooks, etc.
  },
  onToggle: (isOpen) => {
    console.log('Widget', isOpen ? 'opened' : 'closed');
  },
  onError: (error) => {
    console.error('Error:', error);
    // Custom error handling
  }
});
```

## 📊 Analytics and Monitoring

The widget can be easily integrated with analytics tools:

```javascript
// Demo with Google Analytics
EloquentChatWidget.init({
  onMessage: (message) => {
    gtag('event', 'chat_message', {
      event_category: 'engagement',
      event_label: message.sender
    });
  }
});
```

## 🚀 Deployment

### NPM Registry

#### Publishing Requirements

- NPM account (register at [npmjs.com](https://www.npmjs.com/))
- Node.js >=22.18.0 and npm >=8.0.0
- Working build (`npm run build`)
- Passing tests (`npm run test`)

#### Pre-publishing Setup

1. **Check if you're logged in to npm:**
```bash
npm whoami
```

2. **Login if needed:**
```bash
npm login
```

3. **Verify package configuration:**
```bash
npm run publish:check
```

#### Publishing

```bash
# 1. Verify build is working
npm run build

# 2. Run tests
npm run test

# 3. Check what will be included in the package
npm run publish:check

# 4. Publish (prepublishOnly will run build automatically)
npm run publish:npm
```

#### Useful Commands

```bash
# Check current version
npm version

# Update patch version (1.0.0 -> 1.0.1)
npm version patch

# Update minor version (1.0.0 -> 1.1.0)
npm version minor

# Update major version (1.0.0 -> 2.0.0)
npm version major

# Check published package info
npm info eloquent-chat-widget

# Test local installation
npm pack
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️