import classes from "./GenreCard.module.css";

const GenreCard = ({genre}) => {
    return (
        <div className={classes.GenreCard}>
            <div className={classes.Genre}>
                <p>{genre}</p>
            </div>
        </div>
    );
}

export default GenreCard;