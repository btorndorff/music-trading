import Navbar from "../components/NavBar";
import MusicItem from "../components/MusicItem";
import { useState, useEffect } from "react";

export default function Profile(props) {
    console.log(props)

    return (
        <div>
            <Navbar logOut={props.logOut} {...props.profile} />

            <div>
                <img src={props.picture}/>
                <p>{props.name}</p>
                <div>
                    <p>0 Vinyls Traded</p>
                    <p>0 CDs Traded</p>
                    <p>0 cassettes Traded</p>
                </div>
            </div>

            <div>
                <p>Marketplace</p>
            </div>

            

            {/* <div className="home-feed">
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
            </div> */}
        </div>
    );
}