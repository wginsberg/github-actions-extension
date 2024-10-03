export default function Empty() {
    return (
        <div>
            <p>Not watching any repos 🙈</p>
            <p>Select some repositories to watch on the <a href="options.html" target="_blank">options page</a>.</p>
        </div>
    )
}

Empty.NotLoggedIn = function () {
    return (
        <div>
            <p>Please log in to your Github account on the <a href="options.html" target="_blank">options page</a>.</p>
        </div>
    )
}
