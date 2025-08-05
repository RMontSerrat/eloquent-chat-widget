# Eloquent Chat Widget

A modern, embeddable chat widget with AI integration for React applications. Built with TypeScript, Zustand for state management, and responsive design following frontend best practices.

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

The widget follows [Eloquent AI](https://www.eloquentai.co/) design system with:
- **Primary color**: `#f9f7f1`
- **Primary font**: Erode (serif)
- **Secondary font**: Geist (sans-serif)
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
<link rel="stylesheet" href="https://unpkg.com/eloquent-chat-widget/dist/eloquent-chat-widget.css">
```

## 🚀 Quick Start

### Manual Initialization

```html
<script src="https://unpkg.com/eloquent-chat-widget/dist/eloquent-chat-widget.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/eloquent-chat-widget/dist/eloquent-chat-widget.css">

<script>
EloquentChatWidget.init({
  config: {
    title: 'Customer Support',
    subtitle: 'We\'re here to help',
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


### React Integration (Intercom-style)

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
  title?: string;                    // Chat title
  subtitle?: string;                 // Chat subtitle
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

### Complete Example

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
// Example OpenAI integration
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

## 🔐 Security

- **Sanitization**: All inputs are sanitized
- **CORS**: Configured for secure requests
- **Storage**: Sensitive data is not stored
- **CSP**: Compatible with Content Security Policy

## 📊 Analytics and Monitoring

The widget can be easily integrated with analytics tools:

```javascript
// Example with Google Analytics
EloquentChatWidget.init({
  onMessage: (message) => {
    gtag('event', 'chat_message', {
      event_category: 'engagement',
      event_label: message.sender
    });
  }
});
```

## 🌐 Internationalization

```javascript
EloquentChatWidget.init({
  config: {
    title: 'Customer Support',           // EN
    // title: 'Atendimento ao Cliente',  // PT
    // title: 'Soporte al Cliente',      // ES
    // title: 'Support Client',          // FR
    
    welcomeMessage: 'Hello! How can I help you today?',
    placeholder: 'Type your message...',
    offlineMessage: 'We are currently offline. Leave us a message!'
  }
});
```

## 🚀 Deployment

### NPM Registry

```bash
# Build
npm run build

# Publish
npm publish
```

### CDN

Files are automatically available via:
- unpkg: `https://unpkg.com/eloquent-chat-widget/`
- jsDelivr: `https://cdn.jsdelivr.net/npm/eloquent-chat-widget/`

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © [Eloquent AI](https://www.eloquentai.co/)

## 🆘 Support

- 📧 Email: support@eloquentai.co
- 🐛 Issues: [GitHub Issues](https://github.com/RMontSerrat/eloquent-chat-widget/issues)
- 📖 Docs: [Complete Documentation](https://docs.eloquentai.co/chat-widget)
- 💬 Discord: [Eloquent Community](https://discord.gg/eloquentai)

## 🎯 Roadmap

- [ ] Media message support (images, files)
- [ ] Pre-defined conversation templates
- [ ] Native integration with more LLMs (Claude, Gemini, etc.)
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Native dark mode
- [ ] CRM/Helpdesk integrations

---

Built with ❤️ by the [Eloquent AI](https://www.eloquentai.co/) team