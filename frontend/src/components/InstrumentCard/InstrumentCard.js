import classes from "./InstrumentCard.module.css";

const InstrumentCard = ({instrument, level}) => {
    return (
        <div className={classes.instrumentCard}>
            <div className={classes.instrument}>
                <p>{instrument}</p>
            </div>
            <div className={classes.level}>
                <p>{level}</p>
            </div>
        </div>
    );
}

export default InstrumentCard;

