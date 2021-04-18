

export const LinkCard = ({link}) => {
    console.log(link)
    return (
        <div>
            <h6>link</h6>
            <p>Short link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>How many clicks from link: <strong>{link.clicks}</strong></p>
            <p>Date created: <strong>{new Date(link.data).toLocaleDateString()}</strong></p>
        </div>
    )
}