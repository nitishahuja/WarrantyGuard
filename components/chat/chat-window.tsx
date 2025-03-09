"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, MinusCircle, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  content: string
  sender: "user" | "support"
  timestamp: Date
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Mock WebSocket connection
  useEffect(() => {
    // Simulate connecting to WebSocket
    console.log("Connecting to WebSocket...")
    const connectTimer = setTimeout(() => {
      setIsConnected(true)

      // Add initial support message
      const initialMessage: Message = {
        id: Date.now().toString(),
        content: "Hello! Welcome to WarrantyGuard support. How can I help you today?",
        sender: "support",
        timestamp: new Date(),
      }

      setMessages([initialMessage])
    }, 1500)

    return () => {
      clearTimeout(connectTimer)
      console.log("Disconnecting from WebSocket...")
    }
  }, [])

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !isConnected) return

    setIsLoading(true)

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    try {
      // Simulate WebSocket message processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Random support responses
      const responses = [
        "Thank you for your message. Let me check on that for you.",
        "I understand your concern. Let me help resolve this issue for you.",
        "I'm looking into this right now. Can you provide more details?",
        "That's a good question. Let me find the right information for you.",
        "I'll need to check with our warranty team. Could you hold for a moment?",
        "I see the issue. Let me guide you through the next steps.",
      ]

      // Add support response
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "support",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, supportMessage])
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-auto shadow-lg">
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium flex items-center">
              <div className="relative mr-2">
                <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500" />
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24&text=S" alt="Support" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              Live Support
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsMinimized(false)}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg fixed bottom-4 right-4 z-50">
      <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <div className="relative">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32&text=S" alt="Support" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" />
          </div>
          <div className="flex flex-col">
            <span>Support Chat</span>
            <span className="text-xs font-normal text-muted-foreground flex items-center gap-1">
              {isConnected ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block"></span>
                  Connected
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 inline-block"></span>
                  Connecting...
                </>
              )}
            </span>
          </div>
        </CardTitle>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimized(true)}>
            <MinusCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <ScrollArea className="h-[350px] px-4 pt-4" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4">
              {messages.length === 0 && !isConnected && (
                <div className="flex justify-center py-8">
                  <div className="animate-pulse flex flex-col items-center gap-2">
                    <div className="h-2.5 bg-muted rounded-full w-48 mb-2.5"></div>
                    <div className="h-2 bg-muted rounded-full w-32 mb-2.5"></div>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {message.sender === "support" && (
                    <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                      <AvatarImage src="/placeholder.svg?height=32&width=32&text=S" alt="Support" />
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 inline-block">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                    <AvatarImage src="/placeholder.svg?height=32&width=32&text=S" alt="Support" />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg flex items-center space-x-2 max-w-[80%]">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-background">
              Beta
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex w-full gap-2"
        >
          <Button type="button" size="icon" variant="ghost" className="shrink-0 h-9 w-9" disabled={!isConnected}>
            <Paperclip className="h-4 w-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            placeholder={isConnected ? "Type your message..." : "Connecting..."}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 h-9"
            disabled={!isConnected}
          />
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9"
            disabled={isLoading || !newMessage.trim() || !isConnected}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

