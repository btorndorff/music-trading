import Navbar from "../components/NavBar";
import MusicItem from "../components/MusicItem";
import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios';

export default function Home(props) {
    const [tradeData, setTradeData] = useState([])
    const [filter, setFilter] = useState("all")
    const [change, setChange] = useState(true)

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

    const addMusicItem = async (selected) => {
        const title = selected.title;
        const [artist, track] = title.split(" - ")

        // console.log(props)
        try {
            const response = await axios.post(`http://localhost:8080/add-music-item`, {
                userId: props.id,
                name: track,
                artist: artist,
                genre: selected.genre[0],
                thumb: selected.thumb,
                format: selected.format[0].toLowerCase()
            });
            console.log(response.data); // handle success response
            setChange(prev => !prev)
        } catch (error) {
            console.error(error); // handle error response
        }
    };


    const tradeElements = tradeData.map(trade => <MusicItem {...trade} id={props.id}/>)


    return (

        <div>
            <Navbar logOut={props.logOut} {...props} addMusicItem={addMusicItem}/>
            <div className="home-feed">
                <select className="filter"
                    value={filter} 
                    onChange={e => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="vinyls">Vinyls</option>
                    <option value="cds">CDs</option>
                    <option value="cassettes">Cassettes</option>
                </select>

                
                <div id="popup-root" />

                <div className="music-grid">
                    {tradeElements} 
                </div>
            </div>
        </div>
    );
}