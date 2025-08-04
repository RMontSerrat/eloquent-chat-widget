import React, { useEffect } from 'react';
import { MessageCircle, X, Send, Wifi, WifiOff, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../hooks/useChat';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { MaintenanceBanner } from './MaintenanceBanner';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from './ui/card';

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
    setInputValue,
    handleSendMessage,
    handleKeyDown,
    formatTimestamp,
    scrollToBottom,
  } = useChat();

  // Scroll to bottom when widget opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 300); // Espera a animação terminar
      return () => clearTimeout(timer);
    }
  }, [isOpen, scrollToBottom]);

  // Animation variants for widget
  const widgetVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  // Animation variants for button
  const buttonVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

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
    <div className="fixed z-[9999] font-secondary" style={{ ...getPositionStyles() }}>
      {/* Chat Window */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={widgetVariants}
            className="absolute z-[9998]"
            style={{ ...getWindowPositionStyles() }}
          >
            <Card className="w-80 h-96 shadow-2xl shadow-black/5 flex flex-col rounded-2xl border border-gray-100/50 overflow-hidden bg-gradient-to-b from-white to-gray-50/50 backdrop-blur-sm">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-[#faf7f2] via-white to-[#faf7f2] border-b border-gray-100/50 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-secondary text-lg font-bold text-gray-900 leading-tight">
                  {config.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 mb-0">
                  {config.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={isOnline ? 'online' : 'offline'} className="text-xs px-3 py-1 rounded-full shadow-sm">
                  {isOnline ? (
                    <>
                      <Wifi size={10} className="mr-1.5" />
                      Online
                    </>
                  ) : (
                    <>
                      <WifiOff size={10} className="mr-1.5" />
                      Offline
                    </>
                  )}
                </Badge>
              </div>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 p-6 overflow-y-auto flex flex-col bg-gradient-to-b from-transparent to-gray-50/30">
            {/* Error Message */}
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200 rounded-xl p-4 mb-4 shadow-sm">
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Maintenance Banner */}
            <MaintenanceBanner 
              isVisible={isMaintenanceMode} 
              message={config.maintenanceMessage}
            />

            {/* Messages */}
            <div className="flex-1 space-y-3 flex flex-col justify-end">
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
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-2xl mb-4">
                    <MessageCircle size={48} className="text-primary/60" />
                  </div>
                  <p className="text-gray-600 text-sm max-w-48 leading-relaxed">
                    {config.welcomeMessage || 'Start a conversation!'}
                  </p>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Input Area */}
          <CardFooter className="bg-gradient-to-r from-[#faf7f2] via-white to-[#faf7f2] border-t border-gray-100/50 p-6 rounded-b-2xl">
            <div className="flex gap-3 w-full">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={config.placeholder}
                disabled={!canSendMessage}
                rows={1}
                className="flex-1 min-h-[44px] max-h-[100px] resize-none border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white shadow-sm transition-all duration-200"
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${Math.min(target.scrollHeight, 100)}px`;
                }}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!canSendMessage || !inputValue.trim()}
                variant="primary"
                size="icon"
                className="h-11 w-11 shrink-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                aria-label="Send message"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </Button>
            </div>
          </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.div
        className="relative z-[9999]"
        variants={buttonVariants}
        animate={isOpen ? "open" : "idle"}
        whileHover="hover"
        whileTap="tap"
      >
        <Button
          onClick={toggleWidget}
          variant="primary"
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl"
          style={{
            backgroundColor: config.primaryColor
          }}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <div className="relative">
              <MessageCircle size={24} />
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25,
                    duration: 0.3
                  }}
                  className="absolute -top-2 -right-2"
                >
                  <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Badge>
                </motion.div>
              )}
            </div>
          )}
        </Button>
      </motion.div>
    </div>
  );
};