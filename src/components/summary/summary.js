import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Detail from '../detail/detail';
import Header from '../header/header'
import parsePodcastFeedFromXML from '../../util/podcast-util';

/**
 * Component for displaying the details about a podcast including the episodes
 */
const Summary = () => {

    // Track the podcast object
    const [podcast, setPodcast] = useState({ episodes: [] });
    // Track if the podcast has been loaded
    const [loaded, setLoaded] = useState(false);

    useEffect(() => { loadFeed() });

    /**
     * If the feed hasn't been loaded go out and load it.  Set the podcast
     * state and loaded to true.
     */
    async function loadFeed() {
        if (!loaded) {
            axios.get("/feed.xml")
                .then(function (result) {
                    setPodcast(parsePodcastFeedFromXML(result.data));
                    setLoaded(true);
                })
        }
    }

    return (
        <div><header><Header podcast={podcast} /></header>
            <ul>
                {podcast.episodes.map((value, index) => {
                    return <div key={index}><Detail episode={value} /></div>
                })}
            </ul>
        </div>
    );
}
export default Summary;
