import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { close, open, fetchSearchResults, setSearchText } from '../Redux/Slices/SearchSlice';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';

function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchText = useSelector(state => state.searchBox.searchText);
  const searchOpened = useSelector(state => state.searchBox.openned);
  const inputRef = useRef(null);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const search = debounce((e) => {
    const value = e.target.value;

    if (value.length > 3) {
      dispatch(open());

      if (searchOpened) {
        navigate(`/search/${value}`);
      }
      dispatch(setSearchText(value));
      dispatch(fetchSearchResults(value));
    } else {
      dispatch(close());
      navigate('/');
    }
  }, 100);

  useEffect(() => {
    if (searchOpened && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpened]);

  return (
    <div className="bg-zinc-800 rounded-md overflow-hidden flex-1 flex">
      <button className="px-3 py-3">
        <FiSearch size={20} />
      </button>
      <input
        aria-label="Search for music, artist, albums"
        ref={inputRef}
        onChange={search}
        defaultValue={searchText}
        className="bg-transparent w-full px-2 outline-none"
        type="search"
        placeholder="Search music, artist, albums..."
      />
    </div>
  );
}

export default SearchBar;
