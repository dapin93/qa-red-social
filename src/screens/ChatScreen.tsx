import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { ChatMessage } from '../types';
import { MOCK_MESSAGES, MOCK_USERS } from '../data/mockData';
import { Colors } from '../theme/colors';

export const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const interlocutor = MOCK_USERS[0]; // Sofía Martínez

  useEffect(() => {
    // Autoscroll al recibir o enviar mensajes
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: 'u_me',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    // Simulación de respuesta en tiempo real (Socket / Webhook)
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botReply: ChatMessage = {
        id: `reply_${Date.now()}`,
        senderId: interlocutor.id,
        text: '¡Quedó impecable! La arquitectura modular en TypeScript hace que el código sea muy fácil de mantener. 🔥',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: false,
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1400);
  };

  const renderMessageItem = ({ item }: { item: ChatMessage }) => {
    return (
      <View
        style={[
          styles.messageRow,
          item.isMine ? styles.messageRowMine : styles.messageRowOther,
        ]}
      >
        {!item.isMine && (
          <Image source={{ uri: interlocutor.avatarUrl }} style={styles.chatAvatar} />
        )}
        <View
          style={[
            styles.bubble,
            item.isMine ? styles.bubbleMine : styles.bubbleOther,
          ]}
        >
          <Text style={[styles.messageText, item.isMine ? styles.textMine : styles.textOther]}>
            {item.text}
          </Text>
          <Text
            style={[
              styles.timestampText,
              item.isMine ? styles.timestampMine : styles.timestampOther,
            ]}
          >
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header del Chat */}
      <View style={styles.header}>
        <Image source={{ uri: interlocutor.avatarUrl }} style={styles.headerAvatar} />
        <View style={styles.headerTextCol}>
          <Text style={styles.headerName}>{interlocutor.fullName}</Text>
          <Text style={styles.headerStatus}>
            {isTyping ? '✍️ Escribiendo...' : '🟢 En línea'}
          </Text>
        </View>
        <TouchableOpacity style={styles.headerActionBtn}>
          <Text style={styles.headerActionIcon}>📞</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Mensajes */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

      {/* Indicador de escritura simulado */}
      {isTyping && (
        <View style={styles.typingIndicatorContainer}>
          <Text style={styles.typingIndicatorText}>
            {interlocutor.fullName.split(' ')[0]} está respondiendo...
          </Text>
        </View>
      )}

      {/* Barra inferior de Envío */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          placeholderTextColor={Colors.textMuted}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!inputText.trim()}
          activeOpacity={0.8}
        >
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    backgroundColor: Colors.cardBackground,
  },
  headerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  headerTextCol: {
    flex: 1,
    marginLeft: 12,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  headerStatus: {
    fontSize: 12,
    color: Colors.success,
    marginTop: 2,
  },
  headerActionBtn: {
    padding: 8,
  },
  headerActionIcon: {
    fontSize: 18,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'flex-end',
  },
  messageRowMine: {
    justifyContent: 'flex-end',
  },
  messageRowOther: {
    justifyContent: 'flex-start',
  },
  chatAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    marginBottom: 4,
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  bubbleMine: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: Colors.cardBackground,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 21,
  },
  textMine: {
    color: '#FFFFFF',
  },
  textOther: {
    color: Colors.text,
  },
  timestampText: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  timestampMine: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  timestampOther: {
    color: Colors.textMuted,
  },
  typingIndicatorContainer: {
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  typingIndicatorText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: Colors.textMuted,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: Colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.inputBackground,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: Colors.text,
    fontSize: 15,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  sendIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 2,
  },
});
