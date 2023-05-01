import logo from '../images/logo.png'
import add from '../images/add.png'
import Popup from "reactjs-popup";
import AddMusic from './AddMusic';

export default function Navbar(props) {
    // console.log(props)
    return (
        <nav className="nav">
            <div className='nav-buttons'>
                <img className="logo" src={logo} alt="logo" />
                <div class="nav-right">
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


                    
                    <button onClick={props.logOut}>Log out</button>
                    <img />
                </div>

            </div>
        </nav>
    );
}