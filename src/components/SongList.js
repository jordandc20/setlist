import React from 'react'
import Song from './Song';

function SongList({ allSongs, onAddToSetlist , onSongClick, onDelete}) {

    const individualSong = allSongs.map(song => (
        <Song key={song.id} songInfo={song} onSongClick={onSongClick} onDelete={onDelete}/>
    ))


    return (
        <>
            <h2>Song List</h2>
            <div className="song-list">
                {individualSong}
            </div>
        </>
    );
}

export default SongList;