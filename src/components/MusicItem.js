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
            {props.Artist}
            <br />
            {props.CDtype}
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
    //     <div className="MusicItem">
    //         <img className="thumbnail" src={props.Thumbnail === "" ? missing : props.Thumbnail}></img>
    //         <p className="Title">{props.Name}</p>
    //         <p className="Artist">{props.Artist}</p>
    //     </div>
    // );
    );
}