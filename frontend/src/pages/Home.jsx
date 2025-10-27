/**
 * Home Page Component
 * Main page displaying message form and feed
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import MessageCard from '../components/MessageCard';
import Footer from '../components/Footer';
import TextType from '../components/TextType';
import { Link } from 'react-router-dom';

// Backend API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://sayit-65tz.onrender.com';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/messages`);
      setMessages(response.data.messages)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  // Filter messages based on search query
  const filteredMessages = messages.filter(message => {
    if (!searchQuery) return true; // Return all messages if no search query

    const searchLower = searchQuery.toLowerCase();
    return (
      (message.recipient && message.recipient.toLowerCase().includes(searchLower)) ||
      (message.content && message.content.toLowerCase().includes(searchLower))
    );
  });



  return (
    <div className="min-h-screen bg-purple-100">
      {/* Navigation */}
      <nav className="fixed left-0 top-0 z-20 w-full h-[70px] border-b-4 border-black bg-gray-100 px-5">
        <div className="mx-auto flex h-full w-full max-w-[1300px] items-center justify-between">
          <div className="flex items-center gap-4 xl:gap-10">
            <a className="text-[22px] w-fit px-4 flex bg-orange-500 hover:bg-orange-400 text-black items-center justify-center font-bold" href="/">
              SayIt
            </a>
          </div>
          <Link to="/post"
            className="px-4 py-2 bg-pink-300 hover:bg-pink-200 font-medium"
          >
            + New Message
          </Link>
        </div>
      </nav>

      <main className="bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] pt-24 pb-24">
        <section className="relative flex min-h-[40dvh] flex-col overflow-hidden pt-32 pb-24  sm:py-12 items-center  px-5 md:pt-[100px] md:pb-[50px] ">
          <div className="mx-auto w-full max-w-[800px]">
            <h1 className="text-center text-3xl md:text-6xl font-bold mb-8">
              A Place for the Messages
            </h1>
            <h2 className='text-center text-3xl md:text-6xl font-bold mb-12'>
              <TextType
                text={["That never delivered.", "The ones you never send.", "Say What Was Left Unsaid."]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
            </h2>

            {/* Search Input */}
            <div className="mb-12 w-full max-w-2xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages by recipient or content..."
                  className="w-full px-6 py-4 border-2 border-black rounded-none focus:outline-none focus:ring-2 focus:ring-pink-300 pr-10"  // Added pr-10 for the clear button
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                    aria-label="Clear search"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Message Grid */}
        <div className="w-full max-w-[1300px] mx-auto px-5 pb-12">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin h-12 w-12 border-4 border-t-black border-r-black border-b-transparent border-l-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <MessageCard key={message._id} message={message} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg">No messages found. Be the first to share something!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div >
  );
}

export default Home;