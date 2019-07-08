import React from 'react';

/**
 * Component for displaying the header of a podcast
 * @param {*} props podcast object
 */
const PodcastHeader = ({ podcast }) => {
    return (<div>{podcast.icon ? <img width="300" alt="podcastIcon" src={podcast.icon ? podcast.icon : ''} className="podcast-icon"></img> : null}<h2><a href={podcast.home}>{podcast.title}</a></h2></div>);
}
export default PodcastHeader;
