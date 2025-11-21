import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home/Home';
import Library from './pages/Library/Library';
import Recommendations from './pages/Recommendations/Recommendations';
import Statistics from './pages/Statistics/Statistics';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('libraryBooks')) || [];
    const savedReadingList = JSON.parse(localStorage.getItem('readingList')) || [];
    
    if (savedBooks.length === 0) {
      const initialBooks = [
        {
          id: 1,
          title: "1984",
          author: "Джордж Оруэлл",
          genre: "Антиутопия",
          rating: 4.7,
          pages: 328,
          read: false,
          description: "Классика антиутопической литературы"
        },
        {
          id: 2,
          title: "Преступление и наказание",
          author: "Фёдор Достоевский",
          genre: "Классика",
          rating: 4.8,
          pages: 551,
          read: true,
          description: "Глубокое психологическое исследование"
        }
      ];
      setBooks(initialBooks);
      localStorage.setItem('libraryBooks', JSON.stringify(initialBooks));
    } else {
      setBooks(savedBooks);
    }
    
    setReadingList(savedReadingList);
  }, []);

  const addBook = (book) => {
    const newBook = { 
      ...book, 
      id: Date.now(),
      rating: 4.0,
      read: false
    };
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem('libraryBooks', JSON.stringify(updatedBooks));
  };

  const toggleReadStatus = (bookId) => {
    const updatedBooks = books.map(book =>
      book.id === bookId ? { ...book, read: !book.read } : book
    );
    setBooks(updatedBooks);
    localStorage.setItem('libraryBooks', JSON.stringify(updatedBooks));
  };

  const addToReadingList = (book) => {
    if (!readingList.find(item => item.id === book.id)) {
      const updatedList = [...readingList, book];
      setReadingList(updatedList);
      localStorage.setItem('readingList', JSON.stringify(updatedList));
    }
  };

  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home books={books} />} />
            <Route 
              path="/library" 
              element={
                <Library 
                  books={books}
                  onAddBook={addBook}
                  onToggleRead={toggleReadStatus}
                  onAddToReadingList={addToReadingList}
                />
              } 
            />
            <Route 
              path="/recommendations" 
              element={<Recommendations books={books} readingList={readingList} />} 
            />
            <Route 
              path="/statistics" 
              element={<Statistics books={books} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;