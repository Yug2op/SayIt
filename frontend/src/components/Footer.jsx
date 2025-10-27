/**
 * Footer Component
 * Site footer with links and copyright
 */

import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-8 sm:mt-12 bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg border-t border-dark-border dark:border-dark-border py-3 sm:py-4 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs sm:text-sm">
          {/* Left side - Copyright */}
          <div className="flex items-center gap-1 sm:gap-2 text-light-muted dark:text-dark-muted">
            <span>© {currentYear} SayIt</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-light-muted dark:text-dark-muted text-xs sm:text-sm">
              No data collected
            </span>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              to="/terms" 
              className="border-none text-light-muted dark:text-dark-muted hover:text-primary transition-colors duration-200 text-xs sm:text-sm"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;