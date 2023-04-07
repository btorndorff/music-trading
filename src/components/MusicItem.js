import missing from "../images/missing.jpeg"

export default function MusicItem(props) {
    return (
        <div className="MusicItem">
            <img className="thumbnail" src={props.Thumbnail === "" ? missing : props.Thumbnail}></img>
            <p className="Title">{props.Name}</p>
            <p className="Artist">{props.Artist}</p>
        </div>
    );
}