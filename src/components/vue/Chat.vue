<!-- src/components/vue/Chat.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { isAuthenticated as checkIsAuthenticated, authenticate } from '../../utils/microsoftAuth';
import { startConversation, sendMessage as sendChatMessage, getLatestBotMessage, endConversation } from '../../utils/chatService';

// Chat state management
const isChatOpen = ref(false);
const messages = ref([]);
const userInput = ref('');
const isLoading = ref(false);
const conversationId = ref(null);

// Track authentication and connection status
const isAuthenticatedState = ref(false);
const isConnected = ref(false);

// Element references
const chatContainer = ref(null);
const messagesContainer = ref(null);

// Toggle chat open/closed
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
  
  // If chat is opened for the first time, initialize
  if (isChatOpen.value && messages.value.length === 0) {
    addBotMessage("Hello! I'm your Prostate Hub assistant. How can I help you today?");
    
    // Try to connect to the service
    initializeChatService();
  }
  
  // Scroll to bottom when opening
  if (isChatOpen.value) {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }
};

// Add a message from the bot
const addBotMessage = (text) => {
  messages.value.push({
    sender: 'bot',
    text,
    timestamp: new Date()
  });
  
  // Scroll to bottom
  setTimeout(() => {
    scrollToBottom();
  }, 100);
};

// Add a message from the user
const addUserMessage = (text) => {
  messages.value.push({
    sender: 'user',
    text,
    timestamp: new Date()
  });
  
  // Scroll to bottom
  setTimeout(() => {
    scrollToBottom();
  }, 100);
};

// Initialize the chat service
const initializeChatService = async () => {
  try {
    // Check if we're authenticated
    if (!isAuthenticatedState.value) {
      await authenticate();
      isAuthenticatedState.value = true;
    }
    
    // Initialize a new conversation if needed
    if (!conversationId.value) {
      conversationId.value = await startConversation();
    }
    
    isConnected.value = true;
  } catch (error) {
    console.error('Failed to initialize chat service:', error);
    isConnected.value = false;
    
    // Add a message about the connection issue
    addBotMessage("I'm having trouble connecting to my services. I'll do my best to assist you, but some features may be limited.");
  }
};

// Send message to the bot
const sendMessage = async () => {
  if (!userInput.value.trim()) return;
  
  // Add user message to chat
  const messageText = userInput.value;
  addUserMessage(messageText);
  userInput.value = ''; // Clear input field
  
  isLoading.value = true;
  
  try {
    if (isConnected.value) {
      // Send to Microsoft 365 Agents SDK
      await sendToMicrosoftAgent(messageText);
    } else {
      // Try to initialize again
      await initializeChatService();
      
      if (isConnected.value) {
        // If we're now connected, send the message
        await sendToMicrosoftAgent(messageText);
      } else {
        // Fallback response if still not connected
        setTimeout(() => {
          addBotMessage("I'm still having trouble connecting to my knowledge base. Here's some general information: The Prostate Hub provides evidence-based information about prostate cancer stages, treatment options, and support resources for patients in New Zealand. For specific questions, please try again later when I'm able to connect to my services.");
          isLoading.value = false;
        }, 1000);
      }
    }
  } catch (error) {
    console.error('Error sending message:', error);
    addBotMessage("I'm sorry, I encountered an error. Please try again.");
    isLoading.value = false;
  }
};

// Send message to Microsoft 365 Agents
const sendToMicrosoftAgent = async (text) => {
  try {
    // Send the message to the agent
    await sendChatMessage(conversationId.value, text);
    
    // Wait briefly for the agent to process the message
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get the bot's response
    const botResponse = await getLatestBotMessage(conversationId.value);
    
    if (botResponse) {
      addBotMessage(botResponse);
    } else {
      addBotMessage("I'm processing your request. This might take a moment. Please feel free to ask another question.");
    }
  } catch (error) {
    console.error('Error communicating with agent:', error);
    addBotMessage("I'm having trouble connecting to my knowledge base. Please try again later.");
  } finally {
    isLoading.value = false;
  }
};

// Scroll messages container to bottom
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Handle pressing Enter to send message
const handleKeyPress = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
};

// Lifecycle hooks
onMounted(() => {
  loadMicrosoftAgentsSDK();
  
  // Add event listener for keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Alt+C to toggle chat
    if (e.altKey && e.key === 'c') {
      toggleChat();
    }
  });
});

onUnmounted(() => {
  // Clean up
  document.removeEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'c') {
      toggleChat();
    }
  });
});
</script>

<template>
  <div>
    <!-- Chat toggle button -->
    <button 
      aria-label="Chat with Prostate Hub Assistant" 
      title="Chat with Prostate Hub Assistant (Alt+C)"
      @click="toggleChat" 
      class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue shadow-lg flex items-center justify-center hover:bg-green transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <svg v-if="!isChatOpen" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Chat window -->
    <div 
      v-show="isChatOpen" 
      ref="chatContainer"
      class="fixed bottom-24 right-6 w-full sm:w-96 h-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col"
      aria-live="polite"
    >
      <!-- Chat header -->
      <div class="px-4 py-3 bg-blue rounded-t-lg flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 class="text-white font-medium text-base">Prostate Hub Assistant</h2>
            <p class="text-blue-100 text-xs">Here to answer your questions</p>
          </div>
        </div>
        <button @click="toggleChat" class="text-white hover:text-gray-300" aria-label="Close chat">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Chat messages -->
      <div 
        ref="messagesContainer"
        class="flex-1 p-4 overflow-y-auto"
      >
        <div 
          v-for="(message, index) in messages" 
          :key="index" 
          :class="[
            'mb-4 max-w-[80%] p-3 rounded-lg', 
            message.sender === 'user' 
              ? 'ml-auto bg-blue-100 text-blue-800' 
              : 'mr-auto bg-gray-100 text-gray-800'
          ]"
        >
          <p>{{ message.text }}</p>
          <span class="text-xs opacity-70 mt-1 block">
            {{ message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
          </span>
        </div>
        
        <!-- Loading indicator -->
        <div v-if="isLoading" class="flex items-center space-x-2 text-gray-500 mb-4">
          <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0s;"></div>
          <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.2s;"></div>
          <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.4s;"></div>
        </div>
      </div>
      
      <!-- Chat input -->
      <div class="p-3 border-t border-gray-200">
        <div class="flex items-center space-x-2">
          <textarea
            v-model="userInput"
            @keydown="handleKeyPress"
            placeholder="Type your message..."
            class="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-24 resize-y"
            rows="1"
          ></textarea>
          <button 
            @click="sendMessage" 
            class="bg-blue hover:bg-green text-white p-2 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="!userInput.trim() || isLoading"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p class="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Chat animations */
@keyframes slideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.fixed {
  animation: slideIn 0.3s ease-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>