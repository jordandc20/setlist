import React, { useEffect, useState } from 'react'
import SongList from './SongList';
import Setlist from './Setlist';

function SetlistBuilder() {

    const API = 'http://localhost:3110/tracks'
    const [allSongs, setSAllSongs] = useState([])
    const [playlistSongs, setPlaylistSongs] = useState([])

    useEffect(() => {
        fetch(API)
            .then(resp => resp.json())
            .then(data => {
                const addPlaylistStatus = data.map(song => ({ ...song, inPlaylist: false }))
                setSAllSongs(addPlaylistStatus)
            })
    }, [])

    const handleAddToPlaylist = (songInfo) => {
        if (songInfo.inPlaylist === true) {
            alert('Already in Setlist')
        }
        else {
            const isInPlaylist = allSongs.map(song => {
                if (song.id === songInfo.id) {
            return       {...song, inPlaylist: true} 
                } else { return song }
            })
            setSAllSongs(isInPlaylist)

            const playlist = [...playlistSongs, songInfo]
            setPlaylistSongs(playlist)
        }
    }

    const handleRemoveFromPlaylist = (songInfo) => {
        const updatedPlaylist = playlistSongs.filter(song => song.id !== songInfo.id)
        setPlaylistSongs(updatedPlaylist)

        const xxx = allSongs.map(song => {
            if (song.id === songInfo.id) {
                return { ...song, inPlaylist: false }
            } else { return song }
        })
        setSAllSongs(xxx)
    }

    const handleDelete = (songInfo) => {
        fetch(API + '/' + songInfo.id, { method: 'DELETE' })
            .then(resp => resp.json())
            .then(() => {
                const udSongList = allSongs.filter(song => song.id !== songInfo.id)
                setSAllSongs(udSongList)
            }
            )
    }


    return (
        <div className="builder">
            <SongList allSongs={allSongs} onSongClick={handleAddToPlaylist} onDelete={handleDelete} />
            <div className="vl"></div>
            <Setlist playlistSongs={playlistSongs} onSongClick={handleRemoveFromPlaylist} onDelete={handleRemoveFromPlaylist} />
        </div>
    );
}

export default SetlistBuilder;