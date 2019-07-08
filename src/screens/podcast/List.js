import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PodcastTile from '../../components/podcast/Tile'

const PodcastList = (props) => {

    // Track the podcast object
    const [podcasts, setPodcasts] = useState([]);
    // Track if the podcast has been loaded
    const [loaded, setLoaded] = useState(false);

    useEffect(() => { loadPodcastList() });

    /**
     * If the feed hasn't been loaded go out and load it.  Set the podcast
     * state and loaded to true.
     */
    async function loadPodcastList() {
        if (!loaded) {
            axios.get("/podcasts.json")
                .then(function (result) {
                    setPodcasts(result.data.podcasts);
                    setLoaded(true);
                })
        }
    }

    return <div><header><h2>Podcast Directory</h2></header>
        <div className="podcast-tiles">
            {podcasts.map((value, index) => {
                return <div key={index}><PodcastTile podcast={value} /></div>
            })}
        </div>
    </div>;
}
export default PodcastList;