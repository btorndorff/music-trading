import Navbar from "../components/NavBar";
import MusicItem from "../components/MusicItem";
import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios';

export default function Home(props) {
    const [tradeData, setTradeData] = useState([])
    const [filter, setFilter] = useState("all")
    const [change, setChange] = useState(true)
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/${filter}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setTradeData(data)
            });
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8080/${filter}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setTradeData(data)
            });
    }, [filter, change])

    const handleSearch = async () => {
        try {
            if (query === '') {
                setChange(prev => !prev)
            } else {
                const response = await axios.get(`http://localhost:8080/getAlbum?Name=${query}`);
                console.log(response.data)
                setTradeData(response.data)
                setQuery('')
            }

        } catch (error) {
            console.error(error); // log any errors to the console
        }
    };

    const tradeElements = tradeData.map(trade => <MusicItem {...trade} id={props.id} />)

    return (

        <div>
            <Navbar logOut={props.logOut} {...props} addMusicItem={props.addMusicItem} setChange={setChange} />
            <div className="home-feed">
                <div className="search-album">
                    <select className="filter"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="vinyls">Vinyls</option>
                        <option value="cds">CDs</option>
                        <option value="cassettes">Cassettes</option>
                    </select>

                    <div className="search-album">
                        <input style={{ margin: "10px" }} type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>




                <div id="popup-root" />

                <div className="music-grid">
                    {tradeElements}
                </div>
            </div>
        </div>
    );
}