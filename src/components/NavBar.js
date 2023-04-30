import logo from '../images/logo.png'
import add from '../images/add.png'

export default function Navbar(props) {
    return (
        <nav className="nav">
            <div className='nav-buttons'>
                <img className="logo" src={logo} alt="logo" />
                <div class="nav-right">
                    {/* <img className="add" src={add} alt="add" /> */}
                    <img className="add" src={add} alt="add" />
                    <button onClick={props.logOut}>Log out</button>
                    <img />
                </div>
                
            </div>
        </nav>
    );
}