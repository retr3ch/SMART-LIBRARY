import React, { useMemo } from 'react';
import BookCard from '../../components/BookCard/BookCard';
import './Recommendations.css';

const Recommendations = ({ books, readingList }) => {
  const recommendations = useMemo(() => {
    if (books.length === 0) return [];
    
    const readBooks = books.filter(book => book.read);
    const unreadBooks = books.filter(book => !book.read);
    
    if (readBooks.length === 0) {
      return unreadBooks.sort((a, b) => b.rating - a.rating).slice(0, 5);
    }

    const genreCount = {};
    readBooks.forEach(book => {
      genreCount[book.genre] = (genreCount[book.genre] || 0) + 1;
    });

    const favoriteGenre = Object.keys(genreCount).reduce((a, b) => 
      genreCount[a] > genreCount[b] ? a : b
    , '');

    return unreadBooks
      .filter(book => book.genre === favoriteGenre)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, [books]);

  const popularBooks = useMemo(() => {
    return books
      .filter(book => !book.read)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }, [books]);

  return (
    <div className="recommendations-page">
      <h1>Персональные рекомендации</h1>
      
      <section className="recommendation-section">
        <h2>📊 На основе ваших предпочтений</h2>
        <div className="books-grid">
          {recommendations.map(book => (
            <BookCard key={book.id} book={book} showActions={false} />
          ))}
        </div>
        {recommendations.length === 0 && (
          <p className="empty-message">Прочитайте несколько книг, чтобы получить рекомендации</p>
        )}
      </section>

      <section className="recommendation-section">
        <h2>🔥 Популярные книги</h2>
        <div className="books-grid">
          {popularBooks.map(book => (
            <BookCard key={book.id} book={book} showActions={false} />
          ))}
        </div>
      </section>

      <section className="reading-list-section">
        <h2>📖 Мой список для чтения ({readingList.length})</h2>
        <div className="books-grid">
          {readingList.map(book => (
            <BookCard key={book.id} book={book} showActions={false} />
          ))}
        </div>
        {readingList.length === 0 && (
          <p className="empty-message">Список для чтения пуст</p>
        )}
      </section>
    </div>
  );
};

export default Recommendations;