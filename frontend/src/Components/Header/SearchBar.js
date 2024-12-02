import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { close, open } from '../Redux/Slices/SearchSlice';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';

function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchText = useSelector(state => state.searchBox.data);
  const searchOpened = useSelector(state => state.searchBox.openned);
  const inputRef = useRef(null);

  const search = (e) => {
    const value = e.target.value;

    if (value.length > 0) {
      dispatch(open(value));

      if (!searchOpened) {
        navigate(`/search/${value}`);
      }
    } else {
      dispatch(close());
      navigate('/search');
    }
  };

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
        ref={inputRef} // Attach ref to input
        onChange={search}
        value={searchText}
        className="bg-transparent w-full px-2 outline-none"
        type="search"
        placeholder="Search music, artist, albums..."
      />
    </div>
  );
}

export default SearchBar;
