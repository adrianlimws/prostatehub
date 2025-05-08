// src/utils/chatService.js
import { getAuthHeaders } from './microsoftAuth';

// Base URL for the Microsoft 365 Agents SDK
const BASE_URL = 'https://defaultef475ff37cd14fa3ba77f63824f7c3.7c.environment.api.powerplatform.com/copilotstudio/dataverse-backed/authenticated/bots/cr4d1_agent/conversations';
const API_VERSION = '2022-03-01-preview';

/**
 * Start a new conversation with the agent
 * @returns {Promise<string>} Conversation ID
 */
export const startConversation = async () => {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${BASE_URL}?api-version=${API_VERSION}`, {
      method: 'POST',
      headers,
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`Error starting conversation: ${response.status}`);
    }
    
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error starting conversation:', error);
    throw error;
  }
};

/**
 * Send a message to the agent
 * @param {string} conversationId - The conversation ID
 * @param {string} message - Message text to send
 * @returns {Promise<void>}
 */
export const sendMessage = async (conversationId, message) => {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${BASE_URL}/${conversationId}/activities?api-version=${API_VERSION}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        type: 'message',
        text: message
      }),
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`Error sending message: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Get all activities in a conversation
 * @param {string} conversationId - The conversation ID
 * @returns {Promise<Array>} Activities in the conversation
 */
export const getActivities = async (conversationId) => {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${BASE_URL}/${conversationId}/activities?api-version=${API_VERSION}`, {
      method: 'GET',
      headers,
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`Error getting activities: ${response.status}`);
    }
    
    const data = await response.json();
    return data.activities || [];
  } catch (error) {
    console.error('Error getting activities:', error);
    throw error;
  }
};

/**
 * Get latest bot message
 * @param {string} conversationId - The conversation ID
 * @returns {Promise<string>} Latest bot message
 */
export const getLatestBotMessage = async (conversationId) => {
  try {
    const activities = await getActivities(conversationId);
    
    // Filter for bot messages
    const botMessages = activities.filter(activity => 
      activity.from.role === 'bot' && 
      activity.type === 'message'
    );
    
    if (botMessages.length > 0) {
      // Return the most recent message
      return botMessages[botMessages.length - 1].text;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting latest bot message:', error);
    throw error;
  }
};

/**
 * End a conversation
 * @param {string} conversationId - The conversation ID
 * @returns {Promise<void>}
 */
export const endConversation = async (conversationId) => {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${BASE_URL}/${conversationId}/activities?api-version=${API_VERSION}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        type: 'endOfConversation'
      }),
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`Error ending conversation: ${response.status}`);
    }
  } catch (error) {
    console.error('Error ending conversation:', error);
    throw error;
  }
};