import React, {useState, useEffect} from 'react';
import './MovieFinder.css'



function MovieFinder() {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch (`https://www.omdbapi.com/?s=${query}&apikey=3899f430`);
                const json = await response.json();
                setMovies(
                    json.Search.map(item => {
                        return item;
                    })
                );
                console.log({json})
            } catch (error) {} 
        }
        fetchData();
    }, [query])


    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                setQuery(search)
            }}>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="movies"
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {
                    movies.map(item => ( <div style={{
                        display: 'flex',
                        border: 'solid 2px white',
                        margin: '4px'
                    }}><img src={item.Poster} alt="poster"/></div>))
                }
            </ul>
            <ul>
                {
                        movies.map(item => (<h3>{item.title}</h3>))
                    }
            </ul>

        </div>
    )
}

export default MovieFinder;
