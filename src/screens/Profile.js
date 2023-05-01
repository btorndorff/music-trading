import Navbar from "../components/NavBar";
import MusicItem from "../components/MusicItem";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";

export default function Profile(props) {
    const [userProfile, setUserProfile] = useState(null)
    const [userMusic, setUserMusic] = useState([])
    const [change, setChange] = useState(true)
    const [likes, setLikes] = useState([])
    const { userid } = useParams();
    const [follows, setFollows] = useState(false)
    const [followers, setFollowers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/user', {
            params: {
                userID: userid
            }
        })
            .then((response) => {
                console.log(response.data[0])
                setUserProfile(response.data[0])
            });

        axios.get('http://localhost:8080/usermusic', {
            params: {
                userID: userid
            }
        })
            .then((response) => {
                setUserMusic(response.data)
            })
            .catch((error) => {
                console.error(error);
            });

        axios.get('http://localhost:8080/userlikes', {
            params: {
                userID: userid
            }
        })
            .then(response => {
                console.log(response.data);
                setLikes(response.data)
            })
            .catch(error => {
                console.error(error);
            });
        axios.get('http://localhost:8080/followers', {
            params: {
                userID_B: userid
            }
        })
            .then(response => {
                console.log(response)
                const followIDs = response.data.map((item) => item.userID_A);
                setFollows(followIDs.includes(props.id));
                setFollowers(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8080/user', {
            params: {
                userID: userid
            }
        })
            .then((response) => {
                console.log(response.data[0])
                setUserProfile(response.data[0])
            });
        axios.get('http://localhost:8080/usermusic', {
            params: {
                userID: userid
            }
        })
            .then((response) => {
                setUserMusic(response.data)
            })
            .catch((error) => {
                console.error(error);
            });

        axios.get('http://localhost:8080/userlikes', {
            params: {
                userID: userid
            }
        })
            .then(response => {
                console.log(response.data);
                setLikes(response.data)
            })
            .catch(error => {
                console.error(error);
            });
        axios.get('http://localhost:8080/followers', {
            params: {
                userID_B: userid
            }
        })
            .then(response => {
                console.log(response)
                const followIDs = response.data.map((item) => item.userID_A);
                setFollows(followIDs.includes(props.id));
                setFollowers(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [change, userid])

    const handleFollow = () => {
        axios.post('http://localhost:8080/follow', {
            userID_A: props.id,
            userID_B: userid
        })
            .then((response) => {
                setFollows(true);
                setChange(prev => !prev)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleUnfollow = () => {
        axios.delete(`http://localhost:8080/deleteFollow/${props.id}/${userid}`)
            .then((response) => {
                setFollows(false);
                setChange(prev => !prev)
            })
            .catch((error) => {
                console.error(error);
            });
    };


    const musicElements = userMusic.map(music => <MusicItem {...music} id={props.id} setChange={setChange} />)

    const likeElements = likes.map(music => <MusicItem {...music} id={props.id} setChange={setChange} />)

    return (
        <div>
            <Navbar setChange={setChange} logOut={props.logOut} {...props} />

            {userProfile ?
                <div>
                    <div>
                        <img src={userProfile.ProfilePhoto} />
                        <p>{userProfile.Name}</p>
                        <p>{`${followers.length}`} Followers</p>
                        {props.id != userid &&
                            <div>
                                {follows ?
                                    <button onClick={handleUnfollow}>Unfollow</button>
                                    :
                                    <button onClick={handleFollow}>Follow</button>
                                }
                            </div>
                        }
                        {/* <div>
                            <p>0 Vinyls Traded</p>
                            <p>0 CDs Traded</p>
                            <p>0 cassettes Traded</p>
                        </div> */}
                    </div>

                    <div className="user-collection">
                        <p>Collection</p>
                        <div className="music-grid">
                            {musicElements}
                        </div>
                    </div>

                    <div className="user-collection">
                        <p>Likes</p>
                        <div className="music-grid">
                            {likeElements}
                        </div>
                    </div>
                </div>
                :
                <div></div>

            }




        </div>
    );
}