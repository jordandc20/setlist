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

    const status = (songInfo) => {
        const playlistStatus = allSongs.map(song => {
            if (song.id === songInfo.id) {
                return { ...song, inPlaylist: !song.inPlaylist }
            } else { return song }
        })
        setSAllSongs(playlistStatus)
    }

    const handleAddToPlaylist = (songInfo) => {
        if (songInfo.inPlaylist === true) {
            alert('Already in Setlist')
        }
        else {
            status(songInfo)
            setPlaylistSongs(playlistSongs.concat(songInfo))
        }
    }

    const handleRemoveFromPlaylist = (songInfo) => {
        const updatedPlaylist = playlistSongs.filter(song => song.id !== songInfo.id)
        setPlaylistSongs(updatedPlaylist)
        status(songInfo)

    }

    const handleSongDelete = (songInfo) => {
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
            <SongList allSongs={allSongs} onSongClick={handleAddToPlaylist} onDelete={handleSongDelete} />
            <div className="vl"></div>
            <Setlist playlistSongs={playlistSongs} onSongClick={handleRemoveFromPlaylist} onDelete={handleRemoveFromPlaylist} />
        </div>
    );
}

export default SetlistBuilder;