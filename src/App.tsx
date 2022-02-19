import React, { useState } from 'react';
import discogsClient from './lib/discogs';
import Type from './types/enums';
import { Result, DiscogsSearchParams, DiscogsPaginationParams } from './types/types';
import './App.css';

function App() {
  const [data, setData] = useState<Result[]>();
  const [search, setSearch] = useState<string>('');
  const [selector, setSelector] = useState<keyof DiscogsSearchParams>('q');

  const masterResults = (results: Result[]) => (
    results
      .filter((r) => r.type === Type.Master)
      .map((r) => (
        <div>
          <a href={r.master_url ? r.master_url : ''}>
            <img src={r.cover_image} alt="" width="150" height="150" />
          </a>
        </div>
      ))
  );

  const artistResults = (results: Result[]) => (
    results
      .filter((r) => r.type === Type.Artist)
      .map((r) => (
        <div>
          <a href={r.master_url ? r.master_url : ''}>
            <img src={r.cover_image} alt="" width="150" height="150" />
          </a>
        </div>
      ))
  );

  const releaseResults = (results: Result[]) => (
    results
      .filter((r) => r.type === Type.Release)
      .map((r) => (
        <div>
          <a href={r.master_url ? r.master_url : ''}>
            <img src={r.cover_image} alt="" width="150" height="150" />
          </a>
        </div>
      ))
  );

  const labelResults = (results: Result[]) => (
    results
      .filter((r) => r.type === Type.Label)
      .map((r) => (
        <div>
          <a href={r.master_url ? r.master_url : ''}>
            <img src={r.cover_image} alt="" width="150" height="150" />
          </a>
        </div>
      ))
  );
  /* eslint-disable max-len */
  const searchDiscogsDatabase = async (searchQuery: string) => {
    const queryParams: Partial<Record<keyof DiscogsSearchParams | keyof DiscogsPaginationParams, string>> = {
      per_page: '100',
    };

    queryParams[selector] = searchQuery;

    const response = await discogsClient.search(queryParams);
    setData(response.results);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    searchDiscogsDatabase(search);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.currentTarget.value);
  };

  const handleSelector: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelector(event.currentTarget.value as keyof DiscogsSearchParams);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Discogs
        </p>
        <form onSubmit={handleSubmit}>
          <button type="submit">Search</button>
          <input type="text" value={search} onChange={handleChange} />
          <select name="searchOptions" id="searchOptions-select" onChange={handleSelector}>
            <option value="q">all</option>
            <option value="title">title</option>
            <option value="release_title">release title</option>
            <option value="credit">credit</option>
            <option value="artist">artist</option>
            <option value="label">label</option>
            <option value="genre">genre</option>
            <option value="style">style</option>
            <option value="country">country</option>
            <option value="year">year</option>
            <option value="format">format</option>
            <option value="catno">catalogue no</option>
            <option value="barcode">barcode</option>
            <option value="track">track</option>
            <option value="submitter">submitter</option>
            <option value="contributor">contributor</option>
          </select>
        </form>
        <div>
          <h3>Artist</h3>
          <div className="results">
            {data ? artistResults(data) : null}
          </div>
        </div>
        <div>
          <h3>Master</h3>
          <div className="results">
            {data ? masterResults(data) : null}
          </div>
        </div>
        <div>
          <h3>Release</h3>
          <div className="results">
            {data ? releaseResults(data) : null}
          </div>
        </div>
        <div>
          <h3>Label</h3>
          <div className="results">
            {data ? labelResults(data) : null}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
