import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss';

import Navbar from './Components/Navbar/Navbar';
import Welcome from './Pages/Welcome/Welcome';
import Dashboard from './Pages/Dashboard/Dashboard';
import UpcomingSessions from './Components/UpcomingSessions/UpcomingSessions';
import { useAppSelector } from './reduxSetup/hooks';
import { RootState } from './reduxSetup/store';

function App() {
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const scheduledSessions = useAppSelector(
    (state: RootState) => state.scheduledSessions.scheduledSessions
  );

  const getContent = async () => {
    const data = await fetch('/Assets/Content/en.json');
    const fetchedContent = await data.json();
    setContent(fetchedContent.content);
  };

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    if (content) {
      setIsLoading(false);
    }
  }, [content]);

  if (isLoading) return null;

  const navLinks = {
    home: '/dashboard',
    about: '/about',
    contact: '/contact',
    upcomingSessions: '/upcoming-sessions',
  };

  return (
    <div className='App'>
      <Router>
        <Navbar content={content.navbar} links={navLinks} />
        <div className='custom-container'>
          <Routes>
            <Route path='/' element={<Welcome content={content.welcome} />} />
            <Route
              path='/dashboard'
              element={
                <Dashboard
                  content={{ ...content.dashboard, learningTechniques: content.learningTechniques }}
                />
              }
            />
            <Route
              path='/upcoming-sessions'
              element={
                <UpcomingSessions
                  content={{
                    ...content.dashboard.upcomingSessions,
                    learningTechniques: content.learningTechniques,
                  }}
                  upcomingSessions={scheduledSessions}
                />
              }
            />
            <Route path='/topics' element={<></>}>
              <Route path='/topics/:topicId' element={<></>} />
            </Route>
            <Route path='/about' element={<></>} />
            <Route path='/contact' element={<></>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
