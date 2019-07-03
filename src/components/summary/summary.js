import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Detail from '../detail/detail';
import convert from 'xml-js'

const Summary = (props) => {
    const [podcast, setPodcast] = useState({ items: [] });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => { loadFeed() }, []);

    async function loadFeed() {
        axios.get("http://localhost:3000/feed.xml")
            .then(function (result) {
                const feedJSON = convert.xml2json(result.data, { compact: true, spaces: 4 });
                setPodcast(JSON.parse(feedJSON));
                setLoaded(true);
            })
      }

    let podcastTitle = '';
    let podcastHome = '';
    let podcastIcon = '';
    let podcasts = [];
    if (loaded) {
        podcastTitle = podcast.rss.channel.title._text;
        podcastHome = podcast.rss.channel.link._text;
        podcastIcon = podcast.rss.channel['itunes:image']['_attributes']['href'];
        podcasts = podcast.rss.channel.item;
    }
    if (!podcasts) {
        podcasts = [];
    }

    return (
        <div><header><img width="300" alt="podcastIcon" src={podcastIcon} className="podcast-icon"></img><h2><a href={podcastHome}>{podcastTitle}</a></h2></header>
            <ul>
                {podcasts.reverse().map((value, index) => {
                    return <div key={index}><Detail podcast={value} /></div>
                })}
            </ul>
        </div>


    );
}
export default Summary;
