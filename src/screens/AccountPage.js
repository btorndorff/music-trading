import Navbar from "../components/NavBar";
import MusicItem from "../components/MusicItem";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useState, useEffect } from "react";
import React from "react";

export default function AccountPage(props) {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [filter, setFilter] = useState("all");

    const usercollection = profile.collection.map(trade => <MusicItem {...trade} />)

    return (

        <div>
            <Navbar logOut={props.logOut} {...props.profile}/>
            <div className="account-info">
                {user ? (
                    <div>
                        <h1>Welcome, {user.displayName}!</h1>
                        <p>Your user ID: {user.uid}</p>
                        <p>Followers: {profile.followerCount}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <h1>Login with Google</h1>
                        <button onClick={handleLogin}>Login</button>
                    </div>
                )}
            </div>

            <div className="user-collection">
                <div>
                    <select className="filter"
                    value={filter} 
                    onChange={e => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="vinyls">Vinyls</option>
                    <option value="cds">CDs</option>
                    <option value="cassettes">Cassettes</option>
                    </select>
                </div>

                <p>Your Collection</p>
                <div className="music-grid">
                    {usercollection}
                </div>
            </div>
        </div>
    )
}