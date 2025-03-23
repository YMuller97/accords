import classes from "./GenreBubble.module.css";

const GenreBubble = ({genre}) => {
    return (
        <div className={classes.genreCard}>
            <div className={classes.genre}>
                <p>{genre}</p>
            </div>
        </div>
    );
}

export default GenreBubble;