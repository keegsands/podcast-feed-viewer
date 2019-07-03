import React from 'react';

/**
 * Component for displaying the header of a podcast
 * @param {*} props podcast object
 */
const Header = ({podcast}) => {
    return (<div><img width="300" alt="podcastIcon" src={podcast.icon} className="podcast-icon"></img><h2><a href={podcast.home}>{podcast.title}</a></h2></div>);
}
export default Header;
