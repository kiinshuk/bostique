'use client';

import { useEffect, useState } from 'react';

export default function Nav({ cartCount, onCartClick, onUserClick, user }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <a className="nav-logo" href="#">BOSTIQUE</a>
      <ul className="nav-links">
        <li><a href="#categories">Collections</a></li>
        <li><a href="#shop">Shop</a></li>
        <li><a href="#feature">Featured</a></li>
        <li><a href="#philosophy">Story</a></li>
        <li><a href="#testimonials">Reviews</a></li>
      </ul>
      <div className="nav-actions">
        <button className="nav-btn" onClick={onUserClick}>
          {user ? `👤 ${user.name}` : '👤 Account'}
        </button>
        <button className="cart-pill" onClick={onCartClick}>
          Bag <span className="cart-pill-count">{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}