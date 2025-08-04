import React from 'react'
import { ChatWidget, ChatWidgetProvider } from 'eloquent-chat-widget'

const App: React.FC = () => {
  const config = {
    apiKey: 'demo-key',
    position: 'bottom-right' as const,
    theme: 'light' as const,
    primaryColor: '#6f33b7',
    welcomeMessage: 'Olá! Como posso ajudar você hoje?',
    placeholder: 'Digite sua mensagem...'
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        color: '#333'
      }}>
        <h1>Teste do Eloquent Chat Widget</h1>
        <p>Este é um exemplo de como usar a biblioteca localmente</p>
      </header>
      
      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2>Recursos demonstrados:</h2>
        <ul>
          <li>Widget de chat embarcado</li>
          <li>Configuração personalizada</li>
          <li>Tema customizado</li>
          <li>Mensagens em português</li>
        </ul>
        
        <p>
          O widget de chat aparecerá no canto inferior direito da tela.
          Clique no ícone para abrir o chat e testar a funcionalidade.
        </p>
      </main>

      <ChatWidgetProvider config={config}>
        <ChatWidget />
      </ChatWidgetProvider>
    </div>
  )
}

export default App