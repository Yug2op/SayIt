/**
 * Messages Routes
 * API endpoints for creating and retrieving messages
 */

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { profanityFilterMiddleware } = require('../middleware/profanityFilter');

// Array of random colors for message cards
const cardColors = [
  '#FF2E88', // Neon Pink
  '#FF6FB5', // Soft Magenta
  '#FF4081', // Pink
  '#E91E63', // Deep Pink
  '#FF1744', // Hot Pink
  '#F50057', // Bright Pink
  '#C51162', // Dark Pink
];

/**
 * GET /api/messages
 * Retrieve all messages, sorted by newest first
 */
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 }) // Newest first
      .limit(100); // Limit to last 100 messages

    res.json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ 
      error: 'Failed to fetch messages',
      message: error.message 
    });
  }
});

/**
 * POST /api/messages
 * Create a new message (with profanity check)
 */
router.post('/', profanityFilterMiddleware, async (req, res) => {
  try {
    const { content, recipient } = req.body;

    // Validation
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Message cannot be empty' 
      });
    }

    if (content.length > 150) {
      return res.status(400).json({ 
        error: 'Message must be 150 characters or less' 
      });
    }

    if (!recipient || recipient.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Recipient field cannot be empty' 
      });
    }

    if (recipient.length > 50) {
      return res.status(400).json({ 
        error: 'Recipient name must be 50 characters or less' 
      });
    }

    // Assign random color to message card
    const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];

    // Create new message
    const newMessage = new Message({
      content: content.trim(),
      recipient: recipient.trim(),
      cardColor: randomColor
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message posted successfully!',
      data: newMessage
    });

  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ 
      error: 'Failed to post message',
      message: error.message 
    });
  }
});

/**
 * DELETE /api/messages/:id
 * Optional: Delete a message (admin functionality)
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedMessage = await Message.findByIdAndDelete(id);
    
    if (!deletedMessage) {
      return res.status(404).json({ 
        error: 'Message not found' 
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ 
      error: 'Failed to delete message',
      message: error.message 
    });
  }
});

module.exports = router;