import React from 'react';
import './BookCard.css';

const BookCard = ({ book, onToggleRead, onAddToReadingList, showActions = true }) => {
  return (
    <div className={`book-card ${book.read ? 'read' : ''}`}>
      <div className="book-header">
        <h3 className="book-title">{book.title}</h3>
        <span className="book-rating">⭐ {book.rating}</span>
      </div>
      <p className="book-author">Автор: {book.author}</p>
      <p className="book-genre">Жанр: {book.genre}</p>
      <p className="book-pages">Страниц: {book.pages}</p>
      <p className="book-description">{book.description}</p>
      
      {showActions && (
        <div className="book-actions">
          <button 
            className={`btn ${book.read ? 'btn-read' : 'btn-unread'}`}
            onClick={() => onToggleRead(book.id)}
          >
            {book.read ? '✓ Прочитано' : 'Не прочитано'}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => onAddToReadingList(book)}
          >
            ➕ В список чтения
          </button>
        </div>
      )}
      
      {book.read && <div className="read-badge">Прочитано</div>}
    </div>
  );
};

export default BookCard;