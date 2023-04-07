import Navbar from "../components/NavBar";
import MusicItem from "../components/MusicItem";
import { useState, useEffect } from "react";



export default function Home() {
    const [tradeData, setTradeData] = useState([])
    const [filter, setFilter] = useState("all")

    useEffect(() => {
        fetch(`http://localhost:3000/${filter}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setTradeData(data)
            });
    }, [])

    useEffect(() => {
        fetch(`http://localhost:3000/${filter}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setTradeData(data)
            });
    }, [filter])

    const tradeElements = tradeData.map(trade => <MusicItem {...trade} />)

    return (
        <div>
            <Navbar />

            <div className="home-feed">
                <select className="filter"
                    value={filter} 
                    onChange={e => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="vinyls">Vinyls</option>
                    <option value="cds">CDs</option>
                    <option value="cassettes">Cassettes</option>
                </select>

                <div className="music-grid">
                    {tradeElements}
                </div>
            </div>
        </div>
    );
}