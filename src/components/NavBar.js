import logo from '../images/logo.png'
import add from '../images/add.png'
import Popup from "reactjs-popup";
import AddMusic from './AddMusic';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
    // console.log(props)
    return (
        <nav className="nav">
            <div className='nav-buttons'>
                <Link to="/" >
                    <img className='logo' src={logo} alt="logo" />
                </Link>
                
                <div class="nav-right">
                    <Link style={{textDecoration: "none", color:'white'}} to={`/profile/${props.id}`}>
                        <img className="profile-img" src={props.picture}/>
                    </Link>

                    <Popup
                        trigger={<button className="button-music"> <div className="MusicItem">
                        <img className="add" src={add} alt="add" />
                        </div> </button>}
                        modal
                        nested
                    >
                        {close => (
                            <div className="modal">
                                <AddMusic {...props} close={close} addMusicItem={props.addMusicItem}/>
                            </div>
                        )}
                    </Popup>


                    
                    <button style={{width: "50%"}} onClick={props.logOut}>Log out</button>
                </div>

            </div>
        </nav>
    );
}