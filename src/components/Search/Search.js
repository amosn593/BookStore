import { useState } from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const post = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
    setQuery('');
  };

  return (
    <form
      className="d-flex"
      onSubmit={(e) => {
        post(e);
      }}
    >
      <input
        className="form-control me-2"
        type="search"
        required
        placeholder="Search"
        aria-label="Search"
        style={{
          height: '40px',
          alignItems: 'center',
        }}
        width={40}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <button
        className="btn btn-danger"
        type="submit"
        style={{
          height: '40px',
          alignItems: 'center',
        }}
      >
        Search
      </button>
    </form>
  );
}

export default Search;
