import React from 'react'
import Song from './Song';


function Setlist({ playlistSongs, onSongClick, onDelete }) {

    const individualSong = playlistSongs.map(song => (
        <Song key={song.id} songInfo={song}  onSongClick={onSongClick} onDelete={onDelete}/>
    ))
    return (
        <>
            <h2>Setlist</h2>
            <div className="setlist">
                {individualSong}        </div>
        </>
    );
}

export default Setlist;