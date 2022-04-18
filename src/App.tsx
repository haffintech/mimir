import React from 'react';
import { useState, useEffect } from 'react';
import './App.scss';

import Navbar from './Components/Navbar/Navbar';

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

  return <div className='App'>{!isLoading && <Navbar content={content.navbar} />}</div>;
}

export default App;
