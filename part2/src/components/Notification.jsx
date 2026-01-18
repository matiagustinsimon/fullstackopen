const Notification = ({message}) => {
    if (message === undefined) {
        return null
    }
    return (
        <div className="Notification">
            {message}
        </div>
    )
}

export default Notification