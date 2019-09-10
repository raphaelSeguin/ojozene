import React from 'react';

export default ({playlist}) => 
    <ul>
        {
            playlist
                .slice(0, 5)
                .map( (song, i) => <li key={song.id}>
                    {song.artist} - <a href={song.link} target="blank">{song.title}</a> {i === 0 && '(now playing)'}
                </li>
            )
        }
    </ul>
    