/**
 * Message Card Component
 * Individual message display card with animations
 */

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

// Default colors for messages
const defaultColors = [
  '#20B2AA', // Teal
  '#FF8000', // Orange
  '#9370DB', // Purple
  '#0000FF', // Blue
  '#00BFFF', // Deep Sky Blue
  '#800080', // Purple
  '#FFD700', // Gold
  '#FF0000', // Red
  '#87CEEB', // Sky Blue
  '#000000', // Black
  '#FF69B4',  // Hot Pink
  '#008080', // Dark Teal
  '#008000', // Green
  '#32CD32', // Lime Green
  '#2ECC71', // Emerald
  '#006400', // Dark Green
  '#228B22', // Forest Green
  '#7FFF00', // Chartreuse

];

function MessageCard({ message }) {
  // Generate a consistent color based on message content
  const getMessageColor = (content) => {
    if (!content) return '#FFFFFF';

    // Simple hash function to get a consistent index
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      hash = content.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % defaultColors.length;
    return defaultColors[index];
  };

  // Get message color and text color
  const messageColor = message.color || getMessageColor(message.content);
  const textColor = getContrastYIQ(messageColor);

  // Format timestamp
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Helper function to determine text color based on background color
  function getContrastYIQ(hexcolor) {
    // If color is not in hex format, default to black
    if (!hexcolor || typeof hexcolor !== 'string' || !hexcolor.startsWith('#')) return '#000000';

    // Handle 3-digit hex
    let hex = hexcolor.substring(1);
    if (hex.length === 3) {
      hex = hex.split('').map(x => x + x).join('');
    }

    // Convert hex to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate YIQ (luminance)
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    // Return black for light colors, white for dark colors
    return (yiq >= 128) ? '#000000' : '#FFFFFF';
  }

  return (
    <motion.div
      className="w-full border-2 border-black p-4 bg-white cursor-pointer shadow-md hover:shadow-lg transition-shadow"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header with recipient and mail icon */}
      <div className="w-full flex justify-between items-center text-base font-semibold text-black pb-1">
        <div className="flex justify-start items-center gap-2">
          <p>To:</p>
          <p>{message.recipient || 'Anonymous'}</p>
        </div>
        <Mail className="h-5 w-5" />
      </div>

      {/* Message content with dynamic background color */}
      <div
        className="w-full p-4 min-h-[200px] max-h-[200px] overflow-hidden flex items-center justify-center text-center rounded"
        style={{
          backgroundColor: messageColor,
          color: textColor,
          border: '2px solid #000'
        }}
      >
        <p className="text-lg font-medium break-words w-full">
          {message.content || 'No message content'}
        </p>
      </div>

      {/* Date at bottom */}
      <div className="text-xs text-center w-full pt-2">
        {formatDate(message.createdAt || new Date())}
      </div>
    </motion.div>
  );
};

export default MessageCard;