import React from 'react'

function Song({ songInfo, onSongClick, onDelete }) {

    const { artist, image, song } = songInfo

    return (
        <div className="song" onClick={() => onSongClick(songInfo)}>
            <img src={image} alt={song} />
            <div className="song-info">
                <h3>{song}</h3>
                <h4>{artist}</h4>
            </div>
            <button onClick={(e) => {
                onDelete(songInfo)
                e.stopPropagation()
            }}>X</button>
        </div>
    );
}

export default Song;