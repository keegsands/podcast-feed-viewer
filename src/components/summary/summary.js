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
    const [podcast, setPodcast] = useState({});
    // Track the episodes separately
    const [episodes, setEpisodes] = useState([])
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
                    const podcast = parsePodcastFeedFromXML(result.data);
                    setPodcast(podcast);
                    setEpisodes(podcast.episodes);
                    setLoaded(true);
                    if (podcast) {
                        document.title = podcast.title;
                    }
                })
        }
    }

    /** 
     * Handle the click of the Order Flip button, which will reverse
     * the episode list and update the state
    */
    const handleOrderFlip = () =>{
        episodes.reverse();
        setEpisodes([...episodes]);
    }
    

    return (
        <div><header><Header podcast={podcast} /></header>
            <button type="button" onClick={handleOrderFlip} className='flip-button'>Flip Order</button>
            <ul>
                {episodes.map((value, index) => {
                    return <div key={index}><Detail episode={value} /></div>
                })}
            </ul>
        </div>
    );
}
export default Summary;
