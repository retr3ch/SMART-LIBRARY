import React from 'react';
import './Statistics.css';

const Statistics = ({ books }) => {
  const totalBooks = books.length;
  const readBooks = books.filter(function(book) {
    return book.read;
  }).length;
  
  let totalPages = 0;
  for (let i = 0; i < books.length; i++) {
    if (books[i].read) {
      totalPages += books[i].pages;
    }
  }

  let readingProgress = 0;
  if (totalBooks > 0) {
    readingProgress = ((readBooks / totalBooks) * 100).toFixed(1);
  }

  let totalRating = 0;
  for (let i = 0; i < books.length; i++) {
    totalRating += books[i].rating;
  }
  let averageRating = 0;
  if (totalBooks > 0) {
    averageRating = (totalRating / totalBooks).toFixed(1);
  }

  const genreCount = {};
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    if (book.genre) {
      if (genreCount[book.genre]) {
        genreCount[book.genre] += 1;
      } else {
        genreCount[book.genre] = 1;
      }
    }
  }

  let mostReadGenre = 'Нет данных';
  let maxCount = 0;
  for (const genre in genreCount) {
    if (genreCount[genre] > maxCount) {
      maxCount = genreCount[genre];
      mostReadGenre = genre;
    }
  }

  let stars = '';
  const starCount = Math.round(parseFloat(averageRating));
  for (let i = 0; i < starCount; i++) {
    stars += '⭐';
  }

  return (
    <div className="statistics-page">
      <h1>📈 Статистика чтения</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Всего книг</h3>
          <div className="stat-number">{totalBooks}</div>
        </div>
        
        <div className="stat-card">
          <h3>Прочитано</h3>
          <div className="stat-number">{readBooks}</div>
        </div>
        
        <div className="stat-card">
          <h3>Всего страниц</h3>
          <div className="stat-number">{totalPages}</div>
        </div>
        
        <div className="stat-card">
          <h3>Прогресс</h3>
          <div className="stat-number">{readingProgress}%</div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Прогресс чтения</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: readingProgress + '%' }}
            >
              {readingProgress}%
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Любимый жанр</h3>
          <div className="genre-badge">{mostReadGenre}</div>
        </div>

        <div className="chart-card">
          <h3>Средний рейтинг</h3>
          <div className="rating-display">
            {stars}
            <span className="rating-text">({averageRating})</span>
          </div>
        </div>
      </div>

      {books.length === 0 && (
        <div className="no-data">
          <p>Добавьте книги в библиотеку, чтобы увидеть статистику</p>
        </div>
      )}
    </div>
  );
};

export default Statistics;