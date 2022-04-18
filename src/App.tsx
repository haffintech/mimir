import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss';

import Navbar from './Components/Navbar/Navbar';
import Welcome from './Pages/Welcome/Welcome';

function App() {
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const getContent = async () => {
    const data = await fetch('/Assets/Content/en.json');
    const fetchedContent = await data.json();
    return fetchedContent;
  };

  useEffect(() => {
    getContent().then((data) => setContent(data.content));
  }, []);

  useEffect(() => {
    if (content) {
      setIsLoading(false);
    }
  }, [content]);

  if (isLoading) return null;

  return (
    <div className='App'>
      <Navbar content={content.navbar} />
      <Router>
        <Routes>
          <Route path='/welcome' element={<Welcome content={content.welcome} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
