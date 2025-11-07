'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface Message {
  id: number
  text: string
  time: string
  sender: 'me' | 'other'
}

interface Chat {
  id: number
  name: string
  lastMessage: string
  time: string
  avatar: string
  unread?: number
}

export default function Home() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [messageText, setMessageText] = useState('')

  const [chats] = useState<Chat[]>([
    { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', time: '12:30 PM', avatar: '👨', unread: 2 },
    { id: 2, name: 'Sarah Wilson', lastMessage: 'See you tomorrow!', time: '11:45 AM', avatar: '👩' },
    { id: 3, name: 'Mike Johnson', lastMessage: 'Thanks for your help', time: 'Yesterday', avatar: '👨‍💼' },
    { id: 4, name: 'Emma Davis', lastMessage: 'That sounds great!', time: 'Yesterday', avatar: '👩‍💻' },
    { id: 5, name: 'Team Group', lastMessage: 'Meeting at 3 PM', time: 'Tuesday', avatar: '👥', unread: 5 },
  ])

  const [messages, setMessages] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, text: 'Hey there!', time: '12:15 PM', sender: 'other' },
      { id: 2, text: 'Hi! How are you doing?', time: '12:20 PM', sender: 'me' },
      { id: 3, text: 'Hey, how are you?', time: '12:30 PM', sender: 'other' },
    ],
    2: [
      { id: 1, text: 'See you tomorrow!', time: '11:45 AM', sender: 'other' },
    ],
    3: [
      { id: 1, text: 'Thanks for your help', time: 'Yesterday', sender: 'other' },
    ],
  })

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim() || !selectedChat) return

    const newMessage: Message = {
      id: Date.now(),
      text: messageText,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      sender: 'me'
    }

    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }))
    setMessageText('')
  }

  const currentChat = chats.find(c => c.id === selectedChat)
  const currentMessages = selectedChat ? messages[selectedChat] || [] : []

  return (
    <main className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.logo}>Mustafizur Chat</h1>
          <div className={styles.headerIcons}>
            <button className={styles.iconButton}>💬</button>
            <button className={styles.iconButton}>⋮</button>
          </div>
        </div>

        <div className={styles.searchBar}>
          <input type="text" placeholder="Search or start new chat" />
        </div>

        <div className={styles.chatList}>
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`${styles.chatItem} ${selectedChat === chat.id ? styles.active : ''}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className={styles.avatar}>{chat.avatar}</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatHeader}>
                  <h3>{chat.name}</h3>
                  <span className={styles.time}>{chat.time}</span>
                </div>
                <div className={styles.chatPreview}>
                  <p>{chat.lastMessage}</p>
                  {chat.unread && (
                    <span className={styles.unreadBadge}>{chat.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.chatArea}>
        {selectedChat ? (
          <>
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderLeft}>
                <div className={styles.avatar}>{currentChat?.avatar}</div>
                <div>
                  <h2>{currentChat?.name}</h2>
                  <span className={styles.status}>online</span>
                </div>
              </div>
              <div className={styles.chatHeaderRight}>
                <button className={styles.iconButton}>🔍</button>
                <button className={styles.iconButton}>⋮</button>
              </div>
            </div>

            <div className={styles.messagesContainer}>
              <div className={styles.messagesWrapper}>
                {currentMessages.map(message => (
                  <div
                    key={message.id}
                    className={`${styles.message} ${message.sender === 'me' ? styles.sent : styles.received}`}
                  >
                    <div className={styles.messageContent}>
                      {message.text}
                    </div>
                    <div className={styles.messageTime}>{message.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <form className={styles.inputArea} onSubmit={handleSendMessage}>
              <button type="button" className={styles.iconButton}>😊</button>
              <button type="button" className={styles.iconButton}>📎</button>
              <input
                type="text"
                placeholder="Type a message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button type="submit" className={styles.sendButton}>
                ➤
              </button>
            </form>
          </>
        ) : (
          <div className={styles.emptyState}>
            <h2>Welcome to Mustafizur Chat</h2>
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </main>
  )
}
