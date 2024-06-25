import './GiphyList.css'

export default function GiphyList({ gifs, onSelect }) {
    const items = gifs.map((item, index) => {
        return <Item key={index} url={item} onSelect={() => onSelect(item)}/>
    })
    return(
        <div className='gif-container'>
            {items}
        </div>
    )
}

const Item = ({ url, onSelect }) => {
    return (
        <div className="gif-item" onClick={() => onSelect(url)}>
            <img src={url} />
        </div>
    )
}
