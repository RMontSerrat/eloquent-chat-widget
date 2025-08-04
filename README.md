# Eloquent Chat Widget

Uma widget de chat moderno e embeddable com integração de IA para aplicações React. Desenvolvido com TypeScript, Zustand para gerenciamento de estado, e design responsivo seguindo as melhores práticas de frontend.

## ✨ Características

- 🚀 **Fácil de integrar**: Uma linha de código para adicionar ao seu site
- 🎨 **Totalmente customizável**: Cores, textos, posicionamento e aparência
- 🤖 **Integração com IA/LLM**: Respostas inteligentes automáticas
- 💾 **Persistência local**: Histórico de conversas salvo no localStorage
- 📱 **Design responsivo**: Funciona perfeitamente em desktop e mobile
- 🔧 **TypeScript**: Tipagem completa para melhor experiência de desenvolvimento
- ⚡ **Performance otimizada**: Bundle pequeno e carregamento rápido
- 🎯 **Hooks personalizados**: Separação clara de lógica de negócio
- 🔄 **Estado reativo**: Gerenciamento eficiente com Zustand

## 🎨 Design

O widget segue o design system da [Eloquent AI](https://www.eloquentai.co/) com:
- **Cor predominante**: `#faf7f2`
- **Fonte primária**: Erode (serif)
- **Fonte secundária**: Geist (sans-serif)
- Interface limpa e moderna
- Animações suaves
- Indicadores visuais claros (online/offline, manutenção)

## 📦 Instalação

### Via NPM

```bash
npm install eloquent-chat-widget
```

### Via Script Tag (CDN)

```html
<script src="https://unpkg.com/eloquent-chat-widget/dist/eloquent-chat-widget.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/eloquent-chat-widget/dist/eloquent-chat-widget.css">
```

## 🚀 Uso Rápido

### Método 1: Script Tag (Mais Simples)

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://unpkg.com/eloquent-chat-widget/dist/eloquent-chat-widget.css">
</head>
<body>
    <!-- Seu conteúdo aqui -->
    
    <script 
        src="https://unpkg.com/eloquent-chat-widget/dist/eloquent-chat-widget.umd.js"
        data-eloquent-chat
        data-title="Suporte ao Cliente"
        data-subtitle="Estamos aqui para ajudar"
        data-primary-color="#0ea5e9"
        data-position="bottom-right">
    </script>
</body>
</html>
```

### Método 2: Inicialização Manual

```html
<script src="https://unpkg.com/eloquent-chat-widget/dist/eloquent-chat-widget.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/eloquent-chat-widget/dist/eloquent-chat-widget.css">

<script>
EloquentChatWidget.init({
  config: {
    title: 'Suporte ao Cliente',
    subtitle: 'Estamos aqui para ajudar',
    primaryColor: '#0ea5e9',
    position: 'bottom-right',
    welcomeMessage: 'Olá! Como posso ajudá-lo hoje?'
  },
  onReady: () => {
    console.log('Chat widget pronto!');
  }
});
</script>
```

### Método 3: Integração React

```tsx
import React from 'react';
import { ChatWidgetProvider } from 'eloquent-chat-widget';

function App() {
  return (
    <ChatWidgetProvider
      config={{
        title: 'Suporte ao Cliente',
        subtitle: 'Estamos aqui para ajudar',
        primaryColor: '#0ea5e9',
        position: 'bottom-right',
        welcomeMessage: 'Olá! Como posso ajudá-lo hoje?'
      }}
    >
      {/* Seu app aqui */}
      <div>
        <h1>Minha Aplicação</h1>
        {/* O widget aparecerá automaticamente */}
      </div>
    </ChatWidgetProvider>
  );
}

export default App;
```

## ⚙️ Configuração

### Opções Disponíveis

```typescript
interface ChatWidgetConfig {
  // Aparência
  title?: string;                    // Título do chat
  subtitle?: string;                 // Subtítulo do chat
  primaryColor?: string;             // Cor principal
  secondaryColor?: string;           // Cor secundária
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
  
  // Textos
  placeholder?: string;              // Placeholder do input
  welcomeMessage?: string;           // Mensagem de boas-vindas
  offlineMessage?: string;           // Mensagem quando offline
  maintenanceMessage?: string;       // Mensagem de manutenção
  
  // Funcionalidades
  enablePersistence?: boolean;       // Salvar histórico (padrão: true)
  maxMessages?: number;              // Máximo de mensagens (padrão: 100)
  typingIndicatorDelay?: number;     // Delay do indicador de digitação (ms)
  
  // API (para integração real com LLM)
  apiKey?: string;                   // Chave da API
  customStyles?: Record<string, string>; // Estilos customizados
}
```

### Exemplo Completo

```javascript
EloquentChatWidget.init({
  containerId: 'meu-chat-widget',
  config: {
    title: 'Atendimento Virtual',
    subtitle: 'Resposta em tempo real',
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    position: 'bottom-left',
    theme: 'light',
    placeholder: 'Digite sua mensagem...',
    welcomeMessage: 'Bem-vindo! Como posso ajudá-lo?',
    offlineMessage: 'Estamos offline no momento. Deixe sua mensagem!',
    maintenanceMessage: 'Sistema em manutenção. Tente novamente em alguns minutos.',
    enablePersistence: true,
    maxMessages: 50,
    typingIndicatorDelay: 1500
  },
  onReady: () => console.log('Widget pronto!'),
  onError: (error) => console.error('Erro no widget:', error)
});
```

## 🎯 Características Técnicas

### Arquitetura

- **Estado Global**: Zustand para gerenciamento eficiente
- **Hooks Personalizados**: Lógica de negócio separada dos componentes
- **TypeScript**: Tipagem completa para segurança e produtividade
- **CSS Modular**: Estilos isolados que não interferem no site hospedeiro

### Hooks Disponíveis

```typescript
import { useChat, useChatConfig, useChatPersistence } from 'eloquent-chat-widget';

// Hook principal com toda funcionalidade do chat
const {
  messages,
  isOpen,
  isOnline,
  sendMessage,
  toggleWidget,
  // ... mais propriedades
} = useChat();

// Hook para configuração
const {
  config,
  updateTheme,
  updateColors,
  updateTexts
} = useChatConfig();

// Hook para persistência
const {
  save,
  load,
  clear,
  isLoading
} = useChatPersistence();
```

### Performance

- **Bundle Size**: ~530KB (UMD) / ~865KB (ES) - incluindo todas as dependências
- **CSS**: ~5KB comprimido
- **Tree Shaking**: Suportado para importações ES6
- **Lazy Loading**: Carregamento sob demanda

## 🔧 Desenvolvimento

### Setup Local

```bash
# Clonar repositório
git clone https://github.com/eloquentai/chat-widget.git
cd chat-widget

# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Testar package localmente
npm pack
```

### Estrutura do Projeto

```
src/
  ├── components/          # Componentes React
  │   ├── ChatWidget.tsx
  │   ├── ChatMessage.tsx
  │   └── ...
  ├── hooks/              # Hooks personalizados
  │   └── useChat.ts
  ├── store/              # Estado global (Zustand)
  │   └── chatStore.ts
  ├── types/              # Definições TypeScript
  │   └── index.ts
  ├── utils/              # Utilitários
  │   ├── storage.ts
  │   └── llm.ts
  └── styles/             # Estilos CSS
      └── index.css
```

## 🤖 Integração com IA

O widget vem com um sistema de resposta automática simulado, mas pode ser facilmente integrado com APIs reais:

```typescript
// Exemplo de integração com OpenAI
import { generateLLMResponseWithAPI } from 'eloquent-chat-widget';

const response = await generateLLMResponseWithAPI(
  userMessage,
  'sk-your-api-key',
  'https://api.openai.com/v1/chat/completions'
);
```

## 📱 Responsividade

O widget é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop**: Widget completo com todas as funcionalidades
- **Tablet**: Layout otimizado para toque
- **Mobile**: Interface compacta e amigável

## 🛠️ Personalização Avançada

### CSS Customizado

```css
/* Personalize o widget com CSS */
.chat-widget-container {
  /* Seus estilos aqui */
}

.chat-widget-trigger {
  /* Personalize o botão */
}

.chat-message-bubble.user {
  /* Personalize mensagens do usuário */
}
```

### Eventos Personalizados

```javascript
EloquentChatWidget.init({
  config: { /* configuração */ },
  onReady: () => {
    console.log('Widget iniciado');
  },
  onMessage: (message) => {
    console.log('Nova mensagem:', message);
    // Integre com analytics, webhooks, etc.
  },
  onToggle: (isOpen) => {
    console.log('Widget', isOpen ? 'aberto' : 'fechado');
  },
  onError: (error) => {
    console.error('Erro:', error);
    // Tratamento de erro customizado
  }
});
```

## 🔐 Segurança

- **Sanitização**: Todas as entradas são sanitizadas
- **CORS**: Configurado para requisições seguras
- **Storage**: Dados sensíveis não são armazenados
- **CSP**: Compatível com Content Security Policy

## 📊 Analytics e Monitoramento

O widget pode ser facilmente integrado com ferramentas de analytics:

```javascript
// Exemplo com Google Analytics
EloquentChatWidget.init({
  onMessage: (message) => {
    gtag('event', 'chat_message', {
      event_category: 'engagement',
      event_label: message.sender
    });
  }
});
```

## 🌐 Internacionalização

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

## 🚀 Deploy

### NPM Registry

```bash
# Build
npm run build

# Publicar
npm publish
```

### CDN

Os arquivos são automaticamente disponibilizados via:
- unpkg: `https://unpkg.com/eloquent-chat-widget/`
- jsDelivr: `https://cdn.jsdelivr.net/npm/eloquent-chat-widget/`

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

MIT © [Eloquent AI](https://www.eloquentai.co/)

## 🆘 Suporte

- 📧 Email: support@eloquentai.co
- 🐛 Issues: [GitHub Issues](https://github.com/eloquentai/chat-widget/issues)
- 📖 Docs: [Documentação Completa](https://docs.eloquentai.co/chat-widget)
- 💬 Discord: [Comunidade Eloquent](https://discord.gg/eloquentai)

## 🎯 Roadmap

- [ ] Suporte a mensagens de mídia (imagens, arquivos)
- [ ] Templates de conversa pré-definidos
- [ ] Integração nativa com mais LLMs (Claude, Gemini, etc.)
- [ ] Dashboard de analytics
- [ ] Suporte a múltiplos idiomas
- [ ] Tema escuro nativo
- [ ] Integração com CRM/Helpdesk

---

Desenvolvido com ❤️ pela equipe [Eloquent AI](https://www.eloquentai.co/)