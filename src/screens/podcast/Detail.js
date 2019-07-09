import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Episode from '../../components/podcast/episode/Episode';
import PodcastHeader from '../../components/podcast/Header'
import parsePodcastFeedFromXML from '../../util/podcast-util';


const PodcastDetail = (props) => {

    // Track the podcast object
    const [podcast, setPodcast] = useState({});
    // Track the episodes separately
    const [episodes, setEpisodes] = useState([])
    // Track if the podcast is loading
    const [loading, setLoading] = useState(false);
    // Track if the podcast is loading
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        /**
        * If the feed is not loading go out and load it.  Set the podcast
        * state and loading false when done.
        */
        async function loadFeed(feedFile) {
            // Set loading to true
            setLoading(true);
            axios.get(feedFile)
                .then(function (result) {
                    const podcast = parsePodcastFeedFromXML(result.data);
                    setPodcast(podcast);
                    setEpisodes(podcast.episodes);
                    setLoaded(true);
                    setLoading(false);
                    if (podcast) {
                        document.title = podcast.title;
                    }
                })

        }

        // Only do this if it is not loaded and not loading
        if (!loaded && !loading) {
            setLoading(true);
            loadFeed(props.match.params.id + '.xml');
        }


    }, [props.match.params.id, loaded, loading]);


    /** 
     * Handle the click of the Order Flip button, which will reverse
     * the episode list and update the state
    */
    const handleOrderFlip = () => {
        episodes.reverse();
        setEpisodes([...episodes]);
    }

    return (<div>
        <button type="button" className="link-button summary-link" onClick={() => { props.history.push('/') }}>View Podcast Directory</button>
        <PodcastHeader icon={podcast.icon} home={podcast.home} title={podcast.title} />
        {episodes && episodes.length > 1 ? <button type="button" onClick={handleOrderFlip} className='flip-button'>Flip Order</button> : null}
        <ul>
            {episodes.map((value, index) =>
                <Episode key={index} link={value.link} title={value.title} descText={value.descriptionText} />
            )}
        </ul>
    </div>);
}

export default PodcastDetail;