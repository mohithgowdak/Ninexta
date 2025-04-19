import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AgentDetailPage from './pages/AgentDetailPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/agent/:id" element={<AgentDetailPage />} />
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
              <p className="text-xl text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
              <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                Go Back Home
              </a>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;