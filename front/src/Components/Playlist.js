import React from 'react';

export default ({playlist}) => {
    playlist = playlist || [];

    return (
        <ul>
            {
                playlist
                    .slice(0, 5)
                    .map( (song, i) => <li key={`${song.id}${i}`}>
                        {song.artist} - <a href={song.link} target="blank">{song.title}</a> {i === 0 && '(now playing)'}
                    </li>
                )
            }
        </ul>
    )
}




