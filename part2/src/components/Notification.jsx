const Notification = ({message, type}) => {
    if (message === null) {
        return null
    }
    if (type === 'error') {
        return (
            <div className="Error">
                {message}
            </div>
        )
    }
    return (
        <div className="Notification">
            {message}
        </div>
    )
}

export default Notification