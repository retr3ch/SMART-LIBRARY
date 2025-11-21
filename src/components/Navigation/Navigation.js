import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h2>📚 Умная Библиотека</h2>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            🏠 Главная
          </Link>
        </li>
        <li>
          <Link to="/library" className={location.pathname === '/library' ? 'active' : ''}>
            📖 Библиотека
          </Link>
        </li>
        <li>
          <Link to="/recommendations" className={location.pathname === '/recommendations' ? 'active' : ''}>
            💡 Рекомендации
          </Link>
        </li>
        <li>
          <Link to="/statistics" className={location.pathname === '/statistics' ? 'active' : ''}>
            📊 Статистика
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;