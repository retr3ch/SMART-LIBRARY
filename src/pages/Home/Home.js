import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ books }) => {
  const readBooks = books.filter(book => book.read).length;
  const totalBooks = books.length;

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Добро пожаловать в Умную Библиотеку! 📚</h1>
        <p className="hero-subtitle">
          Управляйте своей коллекцией книг, получайте рекомендации и отслеживайте прогресс чтения
        </p>
      </div>

      <div className="stats-overview">
        <div className="stat-item">
          <h3>Всего книг</h3>
          <div className="stat-number">{totalBooks}</div>
        </div>
        <div className="stat-item">
          <h3>Прочитано</h3>
          <div className="stat-number">{readBooks}</div>
        </div>
        <div className="stat-item">
          <h3>В процессе</h3>
          <div className="stat-number">{totalBooks - readBooks}</div>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📖</div>
          <h3>Ваша библиотека</h3>
          <p>Добавляйте, редактируйте и организуйте свои книги</p>
          <Link to="/library" className="feature-link">
            Перейти в библиотеку →
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💡</div>
          <h3>Умные рекомендации</h3>
          <p>Получайте персональные рекомендации на основе ваших предпочтений</p>
          <Link to="/recommendations" className="feature-link">
            Посмотреть рекомендации →
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Детальная статистика</h3>
          <p>Анализируйте свои привычки чтения и прогресс</p>
          <Link to="/statistics" className="feature-link">
            Посмотреть статистику →
          </Link>
        </div>
      </div>

      {books.length > 0 && (
        <div className="recent-books">
          <h2>Недавно добавленные книги</h2>
          <div className="books-preview">
            {books.slice(-3).map(book => (
              <div key={book.id} className="book-preview-card">
                <h4>{book.title}</h4>
                <p className="book-author">{book.author}</p>
                <span className={`status-badge ${book.read ? 'read' : 'unread'}`}>
                  {book.read ? 'Прочитано' : 'Не прочитано'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;