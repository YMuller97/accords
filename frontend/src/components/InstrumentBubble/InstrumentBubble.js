import classes from "./InstrumentBubble.module.css";

const InstrumentBubble = ({instrument}) => {
    return (
        <div className={classes.instrumentCard}>
            <div className={classes.instrument}>
                <p>{instrument}</p>
            </div>
        </div>
    );
}

export default InstrumentBubble;