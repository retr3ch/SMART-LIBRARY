import React, { useState } from 'react';
import BookCard from '../../components/BookCard/BookCard';
import './Library.css';

const Library = ({ books, onAddBook, onToggleRead, onAddToReadingList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    pages: '',
    description: ''
  });

  const genres = [...new Set(books.map(book => book.genre))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !filterGenre || book.genre === filterGenre;
    return matchesSearch && matchesGenre;
  });

  const handleAddBook = (e) => {
    e.preventDefault();
    if (newBook.title && newBook.author) {
      onAddBook({
        ...newBook,
        pages: parseInt(newBook.pages) || 0,
        rating: 4.0,
        read: false
      });
      setNewBook({ title: '', author: '', genre: '', pages: '', description: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="library-page">
      <div className="library-header">
        <h1>Моя Библиотека</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '✕ Отмена' : '➕ Добавить книгу'}
        </button>
      </div>

      {showAddForm && (
        <form className="add-book-form" onSubmit={handleAddBook}>
          <h3>Добавить новую книгу</h3>
          <input
            type="text"
            placeholder="Название книги"
            value={newBook.title}
            onChange={(e) => setNewBook({...newBook, title: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Автор"
            value={newBook.author}
            onChange={(e) => setNewBook({...newBook, author: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Жанр"
            value={newBook.genre}
            onChange={(e) => setNewBook({...newBook, genre: e.target.value})}
          />
          <input
            type="number"
            placeholder="Количество страниц"
            value={newBook.pages}
            onChange={(e) => setNewBook({...newBook, pages: e.target.value})}
          />
          <textarea
            placeholder="Описание"
            value={newBook.description}
            onChange={(e) => setNewBook({...newBook, description: e.target.value})}
          />
          <button type="submit" className="btn btn-success">Добавить книгу</button>
        </form>
      )}

      <div className="search-filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск по названию или автору..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-section">
          <select 
            value={filterGenre} 
            onChange={(e) => setFilterGenre(e.target.value)}
            className="genre-filter"
          >
            <option value="">Все жанры</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="books-grid">
        {filteredBooks.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onToggleRead={onToggleRead}
            onAddToReadingList={onAddToReadingList}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="no-books">
          <p>Книги не найдены. Попробуйте изменить критерии поиска.</p>
        </div>
      )}
    </div>
);
};

export default Library;