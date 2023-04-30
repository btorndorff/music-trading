import React, { useState,useEffect } from 'react';
import axios from 'axios';

export default function AddMusic(props) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState(null);

    const handleSearch = async () => {
        const response = await axios.get(`http://localhost:8080/search?q=${query}`);
        console.log(response)
        setResults(response.data.results.slice(0, 10));
    };

    useEffect(() => {
        if (selected) {
            const title = selected.title;
            const [artist, track] = title.split(" - ");

            let additionalDetail = ""
            if (selected.format[0] == 'Vinyl') {
                additionalDetail = "45"
            } else if (selected.format[0] == "CD") {
                additionalDetail = "Deluxe"
            } else {
                additionalDetail = "Type I"
            }

            const addMusicItem = async () => {
                try {
                    const response = await axios.post(`http://localhost:8080/add-music-item`, {
                        userId: 0,
                        name: track,
                        artist: artist,
                        genre: selected.genre[0],
                        format: additionalDetail,
                        image: selected.thumb,
                        itemType: selected.format[0]
                    });
                    console.log(response.data); // handle success response
                } catch (error) {
                    console.error(error); // handle error response
                }
            };
            addMusicItem();
        }
    }, [selected]);


    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <div className='search'>
                {results.map((result) => (
                    //   <li key={result.id}>{result.title}</li>
                    <div className="search-card" key={result.id} onClick={() => setSelected(result)}>
                        <img src={result.cover_image} />
                        <div className='search-info'>
                            <p>{result.title}</p>
                            <p>{result.format[0]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

