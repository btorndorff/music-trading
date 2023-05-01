import Navbar from "../components/NavBar";
import MusicItem from "../components/MusicItem";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Profile(props) {
    const [userProfile, setUserProfile] = useState(null)
    const [userMusic, setUserMusic] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/user', {
            params: {
                userID: props.id
            }
        })
            .then((response) => {
                console.log(response.data[0])
                setUserProfile(response.data[0])
            });

        axios.get('http://localhost:8080/usermusic', {
            params: {
                userID: props.id
            }
        })
            .then((response) => {
                setUserMusic(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    const musicElements = userMusic.map(music => <MusicItem {...music} />)

    return (
        <div>
            <Navbar logOut={props.logOut} {...props} />


            {userProfile ?
                <div>
                    <div>
                        <img src={userProfile.ProfilePhoto} />
                        <p>{userProfile.Name}</p>
                        <div>
                            <p>0 Vinyls Traded</p>
                            <p>0 CDs Traded</p>
                            <p>0 cassettes Traded</p>
                        </div>
                    </div>

                    <div className="user-collection">
                        <p>Your Collection</p>
                        <div className="music-grid">
                            {musicElements}
                        </div>
                    </div>
                </div>
                :
                <div></div>

            }




        </div>
    );
}