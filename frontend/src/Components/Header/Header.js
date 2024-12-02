import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import Profile from './Profile';

function Header({ bg, title, showName }) {
  return (
    <header
      className={`w-full z-50 sticky top-0 px-12 py-4 flex justify-between items-center transition-colors duration-300 ${
        showName ? 'bg-zinc-900' : 'bg-opacity-0'
      }`}
    >
      <h1
        className={`text-3xl font-bold transition-opacity duration-300 ${
          showName ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {title}
      </h1>
      <div className="flex items-center w-2/5">
        <SearchBar />
        <Profile />
      </div>
    </header>
  );
}

export default Header;
