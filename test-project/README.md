# Projeto de Teste - Eloquent Chat Widget

Este é um projeto de exemplo que demonstra como usar a biblioteca `eloquent-chat-widget` como dependência local. A biblioteca agora utiliza **shadcn/ui** para componentes modernos e estilizados.

## Estrutura

```
test-project/
├── package.json          # Configuração com dependência local
├── vite.config.ts        # Configuração do Vite
├── tsconfig.json         # Configuração do TypeScript
├── public/
│   └── index.html        # HTML principal
└── src/
    ├── main.tsx          # Ponto de entrada
    └── App.tsx           # Componente principal com o widget

```

## Como Usar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em: http://localhost:3001

### 3. Testar o Widget

- O widget de chat aparecerá no canto inferior direito da página
- **Design moderno** com componentes shadcn/ui
- **Animações suaves** de entrada e saída
- **Interface responsiva** com melhor UX
- Clique no ícone para abrir/fechar o chat
- Digite mensagens para testar a funcionalidade

## Configuração da Dependência Local

No `package.json`, a biblioteca é referenciada como dependência local:

```json
{
  "dependencies": {
    "eloquent-chat-widget": "file:../"
  }
}
```

Isso permite usar a versão local da biblioteca diretamente do diretório pai.

## Personalização

O widget pode ser personalizado através das props do `ChatWidgetProvider`:

```tsx
const config = {
  apiKey: 'demo-key',
  baseUrl: 'https://api.example.com',
  position: 'bottom-right',
  theme: {
    primaryColor: '#0066cc',
    backgroundColor: '#ffffff',
    textColor: '#333333'
  },
  messages: {
    welcome: 'Olá! Como posso ajudar você hoje?',
    placeholder: 'Digite sua mensagem...'
  }
}
```

## Comandos Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção

## ✨ Melhorias Implementadas

### 🎨 **Design System com shadcn/ui**
- **Componentes modernos** - Button, Textarea, Badge, Card
- **Tailwind CSS integrado** - Sistema de design consistente
- **Animações fluidas** - Transições suaves e feedback visual
- **Tipografia customizada** - Fontes Geist e Erode

### 💬 **Interface Aprimorada**
- **Layout responsivo** - Cards com header, content e footer
- **Estados visuais melhorados** - Badges para status online/offline
- **Mensagens redesenhadas** - Bolhas com melhor hierarquia visual
- **Input inteligente** - Textarea que expande automaticamente

### 🔧 **Arquitetura**
- **Componentes exportáveis** - Reutilize Button, Badge, etc.
- **Utility functions** - cn() para merge de classes
- **Type safety** - TypeScript completo
- **Performance otimizada** - Bundle com Tree Shaking

## Desenvolvimento

Para fazer alterações na biblioteca e testá-las:

1. Faça as alterações no código da biblioteca (diretório pai)
2. Execute `npm run build` na biblioteca
3. O projeto de teste automaticamente usará a versão atualizada

### Usando Componentes shadcn/ui

```tsx
import { Button, Badge, Card, cn } from 'eloquent-chat-widget';

// Botão com variantes
<Button variant="primary" size="icon">
  <Send size={16} />
</Button>

// Badge de status
<Badge variant="online">Online</Badge>

// Utility para classes
<div className={cn("base-class", "conditional-class")} />
```