import React from 'react';
import { MessageCircle, X, Send, Wifi, WifiOff } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { MaintenanceBanner } from './MaintenanceBanner';

export const ChatWidget: React.FC = () => {
  const {
    isOpen,
    isOnline,
    isMaintenanceMode,
    messages,
    isTyping,
    inputValue,
    isSubmitting,
    config,
    error,
    messagesEndRef,
    unreadCount,
    canSendMessage,
    toggleWidget,
    closeWidget,
    setInputValue,
    handleSendMessage,
    handleKeyDown,
    formatTimestamp,
  } = useChat();

  const getPositionStyles = () => {
    switch (config.position) {
      case 'bottom-left':
        return { bottom: '20px', left: '20px' };
      case 'top-right':
        return { top: '20px', right: '20px' };
      case 'top-left':
        return { top: '20px', left: '20px' };
      default:
        return { bottom: '20px', right: '20px' };
    }
  };

  const getWindowPositionStyles = () => {
    switch (config.position) {
      case 'bottom-left':
        return { bottom: '64px', left: '0' };
      case 'top-right':
        return { top: '64px', right: '0' };
      case 'top-left':
        return { top: '64px', left: '0' };
      default:
        return { bottom: '64px', right: '0' };
    }
  };

  return (
    <div className="chat-widget-container" style={{ ...getPositionStyles() }}>
      {/* Chat Window */}
      {isOpen && (
        <div className="chat-widget-window"
             style={{
               ...getWindowPositionStyles()
             }}>
          {/* Header */}
          <div className="chat-widget-header">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <h3 className="chat-widget-title">{config.title}</h3>
                <p className="chat-widget-subtitle">{config.subtitle}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className={`chat-widget-status ${isOnline ? 'online' : 'offline'}`}>
                  {isOnline ? (
                    <>
                      <Wifi size={12} style={{ marginRight: '4px' }} />
                      Online
                    </>
                  ) : (
                    <>
                      <WifiOff size={12} style={{ marginRight: '4px' }} />
                      Offline
                    </>
                  )}
                </div>
                <button
                  onClick={closeWidget}
                  style={{ 
                    padding: '4px', 
                    background: 'none', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  aria-label="Close chat"
                >
                  <X size={16} color="#6b7280" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="chat-widget-messages">
            {/* Error Message */}
            {error && (
              <div className="error-banner">
                <p className="error-banner-text">{error}</p>
              </div>
            )}

            {/* Maintenance Banner */}
            <MaintenanceBanner 
              isVisible={isMaintenanceMode} 
              message={config.maintenanceMessage}
            />

            {/* Messages */}
            <div className="flex-1 space-y-2">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  formatTimestamp={formatTimestamp}
                />
              ))}
              
              {/* Typing Indicator */}
              <TypingIndicator isVisible={isTyping} />
              
              {/* Empty State */}
              {messages.length === 0 && !isTyping && (
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '100%', 
                  textAlign: 'center', 
                  padding: '32px 0' 
                }}>
                  <MessageCircle size={48} color="#d1d5db" style={{ marginBottom: '12px' }} />
                  <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                    {config.welcomeMessage || 'Start a conversation!'}
                  </p>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="chat-widget-input-container">
            <div style={{ display: 'flex', gap: '8px' }}>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={config.placeholder}
                disabled={!canSendMessage}
                rows={1}
                className="chat-widget-input"
                style={{ minHeight: '40px', maxHeight: '100px', flex: 1 }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${Math.min(target.scrollHeight, 100)}px`;
                }}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!canSendMessage || !inputValue.trim()}
                className="chat-widget-send-button"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
            
            {/* Loading indicator */}
            {isSubmitting && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
                <div className="loading-spinner"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={toggleWidget}
        className="chat-widget-trigger"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <div style={{ position: 'relative' }}>
            <MessageCircle size={24} />
            {unreadCount > 0 && (
              <span className="notification-badge">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
        )}
      </button>
    </div>
  );
};