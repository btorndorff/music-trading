import React, { useState, useEffect } from 'react';
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
        console.log(selected)
        if (selected) {
            

            // const addMusicItem = async (selected) => {
            //     const title = selected.title;
            //     const [artist, track] = title.split(" - ")

            //     // console.log(props)
            //     try {
            //         const response = await axios.post(`http://localhost:8080/add-music-item`, {
            //             userId: props.id,
            //             name: track,
            //             artist: artist,
            //             genre: selected.genre[0],
            //             thumb: selected.thumb,
            //             format: selected.format[0].toLowerCase()
            //         });
            //         console.log(response.data); // handle success response
            //     } catch (error) {
            //         console.error(error); // handle error response
            //     }
            // };

            props.addMusicItem(selected);
            setSelected(null);
            setResults([]);
            setQuery('');
        }
    }, [selected]);


    return (
        <>
            <input style={{ margin: "10px" }} type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
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
            <button className="close" onClick={props.close}>
                &times;
            </button>
        </>
    );
}

