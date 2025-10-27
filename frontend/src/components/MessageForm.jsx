import { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, AlertCircle, CheckCircle, Clock, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MessageForm() {
  const [content, setContent] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [cleanVersion, setCleanVersion] = useState(null);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const maxLength = 150;
  const remainingChars = maxLength - content.length;
  const MAX_SUBMISSIONS = 2;
  const RATE_LIMIT_HOURS = 1;

  // Load submission data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('messageSubmissionData');
    if (savedData) {
      const { count, timestamp } = JSON.parse(savedData);
      setSubmissionCount(count);
      setLastSubmissionTime(new Date(timestamp));
      checkRateLimit(count, new Date(timestamp));
    }
  }, []);

  // Check rate limit and update timer
  const checkRateLimit = (count, timestamp) => {
    if (count >= MAX_SUBMISSIONS) {
      const now = new Date();
      const lastSubmission = new Date(timestamp);
      const timeDiff = now - lastSubmission;
      const hoursDiff = timeDiff / (1000 * 60 * 60);

      if (hoursDiff < RATE_LIMIT_HOURS) {
        const remainingMinutes = Math.ceil((RATE_LIMIT_HOURS - hoursDiff) * 60);
        setTimeRemaining(remainingMinutes);
        startCountdown(remainingMinutes * 60); // Convert to seconds
      } else {
        // Reset if more than 1 hour has passed
        resetRateLimit();
      }
    }
  };

  // Start countdown timer
  const startCountdown = (seconds) => {
    const endTime = Date.now() + seconds * 1000;

    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);

      if (remaining <= 0) {
        clearInterval(timer);
        resetRateLimit();
        return;
      }

      const minutes = Math.floor(remaining / 60000);
      const secondsRemaining = Math.ceil((remaining % 60000) / 1000);
      setTimeRemaining(secondsRemaining === 60 ? minutes + 1 : minutes);
    }, 1000);

    return () => clearInterval(timer);
  };

  // Reset rate limit
  const resetRateLimit = () => {
    localStorage.removeItem('messageSubmissionData');
    setSubmissionCount(0);
    setLastSubmissionTime(null);
    setTimeRemaining(null);
  };

  // Update submission data in localStorage
  const updateSubmissionData = () => {
    const now = new Date();
    const newCount = submissionCount + 1;
    const data = { count: newCount, timestamp: now.toISOString() };
    localStorage.setItem('messageSubmissionData', JSON.stringify(data));
    setSubmissionCount(newCount);
    setLastSubmissionTime(now);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check rate limit
    if (submissionCount >= MAX_SUBMISSIONS && timeRemaining) {
      setError(`You've reached the limit of ${MAX_SUBMISSIONS} messages per hour. Please try again in ${timeRemaining} minutes.`);
      return;
    }

    setError(null);
    setCleanVersion(null);
    setSuccess(false);

    // Validation
    if (!content.trim()) {
      setError('Message cannot be empty');
      return;
    }

    if (!recipient.trim()) {
      setError('Please specify who this message is for');
      return;
    }

    if (content.length > maxLength) {
      setError(`Message must be ${maxLength} characters or less`);
      return;
    }

    setLoading(true);

    try {
      await axios.post('/api/messages', {
        content: content.trim(),
        recipient: recipient.trim()
      });

      // Update submission data
      updateSubmissionData();

      // Start rate limit countdown if needed
      if (submissionCount + 1 >= MAX_SUBMISSIONS) {
        startCountdown(RATE_LIMIT_HOURS * 60 * 60);
      }

      // Success - reset form
      setContent('');
      setRecipient('');
      setSuccess(true);

      // Redirect to home after 1.5 seconds
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err) {
      console.error('Error submitting message:', err);
      if (err.response?.data) {
        setError(err.response.data.error || 'Failed to post message');
        if (err.response.data.cleanVersion) {
          setCleanVersion(err.response.data.cleanVersion);
        }
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const useCleanVersion = () => {
    if (cleanVersion) {
      setContent(cleanVersion);
      setCleanVersion(null);
      setError(null);
    }
  };

  // Disable form if rate limited
  const isRateLimited = submissionCount >= MAX_SUBMISSIONS && timeRemaining;

  return (
    <div className="min-h-screen bg-teal">
      {/* Navigation */}
      <nav className="fixed left-0 top-0 z-20 w-full h-[70px] border-b-4 border-black bg-gray-100 px-5">
        <div className="mx-auto flex h-full w-full max-w-[1300px] items-center justify-between">
          <div className="flex items-center gap-4 xl:gap-10">
            <a className="text-[22px] w-fit px-4 flex bg-orange-500 hover:bg-orange-400 text-black items-center justify-center font-bold" href="/">
              SayIt
            </a>
          </div>
        </div>
      </nav>
      <div className="max-w-2xl mx-auto p-6 bg-white border-2 border-black shadow-neo mt-28">
        <h2 className="text-3xl font-bold mb-6 text-black">Share Your Thoughts</h2>

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 flex items-center">
            <CheckCircle className="mr-2" />
            Message sent successfully! Redirecting...
          </div>
        )}

        {isRateLimited && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 flex items-center">
            <Clock className="mr-2" />
            You've reached the limit of {MAX_SUBMISSIONS} messages per hour. Please try again in {timeRemaining} minutes.
          </div>
        )}

        {error && !isRateLimited && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 flex items-center">
            <AlertCircle className="mr-2" />
            {error}
            {cleanVersion && (
              <button
                onClick={useCleanVersion}
                className="ml-2 text-sm underline hover:text-red-900"
              >
                Use suggested version
              </button>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="recipient" className="block text-lg font-bold mb-2 text-black">
              To: <span className="font-normal text-black/70">(Who is this message for?)</span>
            </label>
            <input
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g., Everyone, My future self, Someone special..."
              maxLength={50}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-300"
              disabled={loading || isRateLimited}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="content" className="block text-lg font-bold text-black">
                Your Message:
              </label>
              <span className={`text-sm ${remainingChars < 20 ? 'text-red-500' : 'text-gray-500'}`}>
                {remainingChars} characters remaining
              </span>
            </div>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your message here..."
              maxLength={maxLength}
              rows={4}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-300"
              disabled={loading || isRateLimited}
            />
          </div>

          {/* Terms and Conditions Checkbox */}
<div className="flex items-start mt-4 mb-6">
  <div className="flex items-center h-5">
    <input
      id="terms"
      type="checkbox"
      checked={acceptedTerms}
      onChange={(e) => setAcceptedTerms(e.target.checked)}
      className="w-4 h-4 border-2 border-black rounded focus:ring-pink-300"
      disabled={loading || isRateLimited}
    />
  </div>
  <div className="ml-3 text-sm">
    <label htmlFor="terms" className="font-medium text-gray-700">
      I agree to the{' '}
      <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
        Terms and Conditions
      </a>
    </label>
  </div>
</div>
{!acceptedTerms && (
  <p className="mt-1 text-sm text-red-600 -mt-4 mb-4">
    You must accept the terms and conditions to send a message
  </p>
)}

{/* Submit Button */}
<button
  type="submit"
  disabled={loading || isRateLimited || !content.trim() || !recipient.trim() || !acceptedTerms}
  className={`w-full flex items-center justify-center px-6 py-3 font-bold border-2 border-black transition-all ${
    isRateLimited 
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
      : !acceptedTerms
        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
        : 'bg-pink-300 hover:bg-pink-200 text-black shadow-neo hover:shadow-neo-hover'
  } ${loading ? 'opacity-70' : ''}`}
>
  {loading ? (
    <div className="flex items-center">
      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Submitting...
    </div>
  ) : isRateLimited ? (
    `Try again in ${timeRemaining} min`
  ) : (
    <>
      <Send className="mr-2" size={20} />
      Send Message
    </>
  )}
</button>
        </form>
      </div>
    </div>
  );
}

export default MessageForm;