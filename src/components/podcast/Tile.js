import React from 'react';

/**
 * Component for displaying the tile of a podcast
 * @param {*} podcast podcast object
 */
const PodcastTile = ({ podcast }) => {
    return (<div><a href={podcast.name}>{podcast.title}</a></div>);
}
export default PodcastTile;
