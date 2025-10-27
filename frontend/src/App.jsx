/**
 * Main App Component
 * Handles routing and theme management
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TermsAndConditions from './pages/TermsAndConditions';
import MessageForm from './components/MessageForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<MessageForm />} />
          <Route path="/terms" element={<TermsAndConditions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;