import React, { useState, useEffect } from 'react';
import { Search, User, Heart, Menu, X, BrainCircuit } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className={`fixed top-0 w-full z-30 transition-all duration-300 ${scrolled || !isHomePage ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <BrainCircuit className={`h-8 w-8 ${scrolled || !isHomePage ? 'text-blue-600' : 'text-white'} transition-colors duration-300`} />
                <span className={`ml-2 text-xl font-bold ${scrolled || !isHomePage ? 'text-gray-900' : 'text-white'} transition-colors duration-300`}>
                  AgentFinder
                </span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${scrolled || !isHomePage ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' : 'text-white hover:text-white hover:bg-white/10'} transition-colors duration-300`}
              >
                Home
              </Link>
              <Link 
                to="/categories" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${scrolled || !isHomePage ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' : 'text-white hover:text-white hover:bg-white/10'} transition-colors duration-300`}
              >
                Categories
              </Link>
              <Link 
                to="/favorites" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${scrolled || !isHomePage ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' : 'text-white hover:text-white hover:bg-white/10'} transition-colors duration-300`}
              >
                <Heart className="h-5 w-5" />
              </Link>
              <Link 
                to="/profile" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${scrolled || !isHomePage ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' : 'text-white hover:text-white hover:bg-white/10'} transition-colors duration-300`}
              >
                <User className="h-5 w-5" />
              </Link>
            </div>
            
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${scrolled || !isHomePage ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' : 'text-white hover:text-white hover:bg-white/10'} transition-colors duration-300`}
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/categories" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/favorites" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </Link>
              <Link 
                to="/profile" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </header>
      
      <main className="pt-16">
        {children}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <Link to="/" className="flex items-center">
                <BrainCircuit className="h-6 w-6 text-blue-600" />
                <span className="ml-2 text-lg font-bold text-gray-900">AgentFinder</span>
              </Link>
            </div>
            <div className="mt-8 md:mt-0 flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 items-center">
              <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col items-center">
            <p className="text-sm text-gray-500">
              &copy; 2025 AgentFinder. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;