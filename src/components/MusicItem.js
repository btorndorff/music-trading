import missing from "../images/missing.jpeg"
import Popup from "reactjs-popup";

export default function MusicItem(props) {
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
            <p style={{fontSize:"20px",}}>{props.Name}</p>
            <p style={{fontSize:"15px",}}>{props.Artist}</p>
            <p style={{fontSize:"15px",}}>{props.CDtype}</p>
            <p style={{fontSize:"10px",}}> Type:{props.Format}</p>
            <p>Comments:</p>
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="trade"> Trade </button>}
            position="top center"
            nested
          >
            <span>
              please work
            </span>
          </Popup>
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