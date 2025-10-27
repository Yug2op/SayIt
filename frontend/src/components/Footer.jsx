/**
 * Footer Component
 * Site footer with links and copyright
 */

import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg border-t border-dark-border dark:border-dark-border py-4 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
          {/* Left side - Copyright */}
          <div className="flex items-center gap-2 text-light-muted dark:text-dark-muted">
            <span>© {currentYear} SayIt</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with <Heart size={14} className="text-primary" fill="currentColor" />
            </span>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center gap-4">
            <Link 
              to="/terms" 
              className="border-none text-light-muted dark:text-dark-muted hover:text-primary transition-colors duration-200"
            >
              Terms & Conditions
            </Link>
            <span className="text-light-muted dark:text-dark-muted">•</span>
            <span className="text-light-muted dark:text-dark-muted">
              No data collected
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;