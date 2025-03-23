import classes from './MessageDisplay.module.css';

const MessageDisplay = ({ conversation, isAdmin, adminId, userId }) => {

    if (!conversation || !conversation.content_conv) {
        return <p>Sélectionnez une conversation!</p>;
    }

    const { messages } = conversation.content_conv || { messages: [] };

    return (
        <div className={classes.messageDisplay}>
            {messages.length > 0 ? (
                messages.map((message, index) => {
                    const isCurrentUserMessage = isAdmin 
                        ? message.id_admin === adminId
                        : message.id_user === userId;

                    return (
                        <div
                            key={index}
                            className={`${classes.message} ${isCurrentUserMessage ? classes.sent : classes.received}`}
                        >
                            <p className={classes.timestamp}>{new Date(message.timestamp).toLocaleString()}</p>
                            <p className={classes.content}>{message.content}</p>
                        </div>
                    );
                })
            ) : (
                <p>Aucun message dans cette conversation. Soyez le premier à écrire!</p>
            )}
        </div>
    );
};

export default MessageDisplay;
