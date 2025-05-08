<!-- src/components/vue/Chat.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Chat state management
const isChatOpen = ref(false);
const messages = ref([]);
const userInput = ref('');
const isLoading = ref(false);
const chatConnection = ref(null);
const conversationId = ref(null);

// Track if the SDK has been loaded
const sdkLoaded = ref(false);

// Element references
const chatContainer = ref(null);
const messagesContainer = ref(null);

// Toggle chat open/closed
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
  
  // If chat is opened for the first time, initialize
  if (isChatOpen.value && messages.value.length === 0) {
    addBotMessage("Hello! I'm your Prostate Hub assistant. How can I help you today?");
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

// Send message to the bot
const sendMessage = async () => {
  if (!userInput.value.trim()) return;
  
  // Add user message to chat
  const messageText = userInput.value;
  addUserMessage(messageText);
  userInput.value = ''; // Clear input field
  
  isLoading.value = true;
  
  try {
    if (sdkLoaded.value) {
      // Send to Microsoft 365 Agents SDK
      await sendToMicrosoftAgent(messageText);
    } else {
      // Fallback if SDK not loaded
      setTimeout(() => {
        addBotMessage("I'm sorry, I'm having trouble connecting to my services. Please try again later.");
        isLoading.value = false;
      }, 1000);
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
    // If we don't have a conversation ID yet, start a new conversation
    if (!conversationId.value) {
      await startNewConversation();
    }
    
    // Send the message to the agent
    const response = await fetch(`https://defaultef475ff37cd14fa3ba77f63824f7c3.7c.environment.api.powerplatform.com/copilotstudio/dataverse-backed/authenticated/bots/cr4d1_agent/conversations/${conversationId.value}/activities?api-version=2022-03-01-preview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'message',
        text: text
      }),
      credentials: 'include' // Include cookies for authentication
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    // Get the bot's response
    const botResponse = await readBotResponse();
    addBotMessage(botResponse);
  } catch (error) {
    console.error('Error communicating with agent:', error);
    addBotMessage("I'm having trouble connecting to my knowledge base. Please try again later.");
  } finally {
    isLoading.value = false;
  }
};

// Start a new conversation with the agent
const startNewConversation = async () => {
  try {
    const response = await fetch('https://defaultef475ff37cd14fa3ba77f63824f7c3.7c.environment.api.powerplatform.com/copilotstudio/dataverse-backed/authenticated/bots/cr4d1_agent/conversations?api-version=2022-03-01-preview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Include cookies for authentication
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    conversationId.value = data.id;
  } catch (error) {
    console.error('Error starting conversation:', error);
    throw error;
  }
};

// Read bot's response
const readBotResponse = async () => {
  try {
    const response = await fetch(`https://defaultef475ff37cd14fa3ba77f63824f7c3.7c.environment.api.powerplatform.com/copilotstudio/dataverse-backed/authenticated/bots/cr4d1_agent/conversations/${conversationId.value}/activities?api-version=2022-03-01-preview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Find the latest bot message
    const botMessages = data.activities.filter(activity => 
      activity.from.role === 'bot' && activity.type === 'message'
    );
    
    if (botMessages.length > 0) {
      // Return the latest bot message
      return botMessages[botMessages.length - 1].text;
    } else {
      return "I'm sorry, I didn't receive a proper response. Can you try asking again?";
    }
  } catch (error) {
    console.error('Error reading bot response:', error);
    throw error;
  }
};

// Load Microsoft 365 Agents SDK
const loadMicrosoftAgentsSDK = () => {
  // setting a flag to simulate SDK loading
  setTimeout(() => {
    sdkLoaded.value = true;
    console.log("Microsoft 365 Agents SDK loaded");
  }, 1000);
};

// Scroll messages container to bottom
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Enter to send message
const handleKeyPress = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
};

onMounted(() => {
  loadMicrosoftAgentsSDK();
  
  // event listener for keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Alt+C to toggle chat
    if (e.altKey && e.key === 'c') {
      toggleChat();
    }
  });
});

onUnmounted(() => {
  document.removeEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'c') {
      toggleChat();
    }
  });
});
</script>

<template>
  <div>
    <!-- Chat button toggle -->
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

    <div 
      v-show="isChatOpen" 
      ref="chatContainer"
      class="fixed bottom-24 right-6 w-full sm:w-96 h-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col"
      aria-live="polite"
    >
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
        
        <div v-if="isLoading" class="flex items-center space-x-2 text-gray-500 mb-4">
          <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0s;"></div>
          <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.2s;"></div>
          <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.4s;"></div>
        </div>
      </div>
      
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