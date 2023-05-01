import missing from "../images/missing.jpeg"
import Popup from "reactjs-popup";
import axios from "axios"
import { useState, useEffect } from "react";


export default function MusicItem(props) {
    const [TradeMode, setTradeMode] = useState(false)
    const [userMusic, setUserMusic] = useState([])
    const [offers, setOffers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/usermusic', {
            params: {
                userID: props.id
            }
        })
            .then((response) => {
                // console.log(response)
                setUserMusic(response.data)
            })
            .catch((error) => {
                console.error(error);
            });

        axios.get(`http://localhost:8080/offers/${props.MusicID}`)
            .then((response) => {
                console.log(response.data); // display the retrieved offers in the console
                setOffers(response.data)
            })
            .catch((error) => {
                console.error(error); // display any errors in the console
            });
    }, [])


    function handleSubmit(event, musicID) {
        event.preventDefault();

        axios.post('http://localhost:8080/trade', {
            musicID_A: musicID,
            musicID_B: props.MusicID,
            userID_A: props.id,
            userID_B: props.userID,
            Trade_State: "active"
        })
            .then((response) => {
                console.log(response.data);
                setTradeMode(false)
            })
            .catch((error) => {
                console.log(error);
                // Handle error
            });
    }

    const updateTrade = (tradeID, status) => {
        axios.put(`http://localhost:8080/updateTrade/${tradeID}/${status}`)
            .then(response => {
                console.log(response.data); // "Trade state updated successfully"
                setOffers([])
                props.setChange(prev => !prev)
            })
            .catch(error => {
                console.error(error);
            });

    };

    const userCollection = userMusic.map(music => <div className="MusicItem" onClick={(e) => handleSubmit(e, music.MusicID)}>
        <img className="thumbnail" src={music.Thumbnail === "" ? missing : music.Thumbnail}></img>
        <p className="Title">{music.Name}</p>
        <p className="Artist">{music.Artist}</p>
    </div>)

    const offerCollection = offers.map(music => (
        <div className="MusicItem" onClick={() => updateTrade(music.Trade_ID, "completed")}>
            <img className="thumbnail" src={music.Thumbnail === "" ? missing : music.Thumbnail} alt="thumbnail"></img>
            <p className="Title">{music.Name}</p>
            <p className="Artist">{music.Artist}</p>
        </div>
    ));

    return (
        <Popup
            trigger={<button className="button-music"> <div className="MusicItem">
                <img className="thumbnail" src={props.Thumbnail === "" ? missing : props.Thumbnail}></img>
                <p className="Title">{props.Name}</p>
                <p className="Artist">{props.Artist}</p>
            </div> </button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="content">
                        <img className="album" src={props.Thumbnail === "" ? missing : props.Thumbnail}></img>
                        {' '}
                        <p style={{ fontSize: "20px", }}>{props.Name}</p>
                        <p style={{ fontSize: "15px", }}>{props.Artist}</p>
                        {/* <p style={{ fontSize: "15px", }}>{props.CDtype}</p> */}
                        <p style={{ fontSize: "10px", }}> Type:{props.Format}</p>
                        <p>Comments:</p>
                    </div>
                    <div className="actions">
                        {props.id != props.userID ?
                            <div>
                                {TradeMode ?
                                    <div className="collection-scroll">
                                        {userCollection}
                                    </div>
                                    :
                                    <button className="trade" onClick={() => setTradeMode(true)}> Trade </button>
                                }
                            </div>
                            :
                            <div>
                                {offers.length > 0 ?
                                    <div className="collection-scroll">
                                        {offerCollection}
                                    </div>
                                    :
                                    <p>No Offers Yet</p>
                                }
                            </div>
                        }

                    </div>
                </div>
            )}
        </Popup>
        //     <div className="MusicItem">
        //         <img className="thumbnail" src={props.Thumbnail === "" ? missing : props.Thumbnail}></img>
        //         <p className="Title">{props.Name}</p>
        //         <p className="Artist">{props.Artist}</p>
        //     </div>
        // );
    );
}