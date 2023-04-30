import Navbar from "../components/NavBar";
import MusicItem from "../components/MusicItem";
import { useState, useEffect } from "react";
import React from "react";
import Popup from "reactjs-popup";

export default function Home(props) {
    const [tradeData, setTradeData] = useState([])
    const [filter, setFilter] = useState("all")

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
    }, [filter])


    const PopupExample = () => (
        <Popup
            trigger={<button className="button"> Open Modal </button>}
            modal
            nested
        >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Modal Title </div>
        <div className="content">
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
          Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
          delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
          commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
          explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            nested
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
    </Popup>
    );


    const tradeElements = tradeData.map(trade => <MusicItem {...trade} />)

    return (

        <div>
            <Navbar logOut={props.logOut} {...props.profile}/>
            <PopupExample/>
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