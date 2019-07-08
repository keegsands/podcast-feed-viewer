import React from 'react';

/**
 * Component for displaying the header of a podcast
 * @param {*} props podcast object
 */
const PodcastTile = ({ podcast, props }) => {
    return (<div><a href={podcast.name}>{podcast.title}</a></div>);
    /*(<div>{podcast.icon ? <img width="300" alt="podcastIcon" src={podcast.icon ? podcast.icon : ''} className="podcast-icon"></img> : null}<h2><a href={podcast.home}>{podcast.title}</a></h2></div>);*/
}
export default PodcastTile;
