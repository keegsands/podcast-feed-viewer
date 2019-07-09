import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * Component for displaying the header of a podcast
 * @param {*} props 
 */
const PodcastHeader = (props) =>
    <header>
        {props.icon ? <img width="300" alt="podcastIcon" src={props.icon ? props.icon : ''} className="podcast-icon"></img> : null}
        <h2>
            <a href={props.home}>{props.title}</a>
        </h2>
    </header>

/**
  * @name PodcastHeader propTypes
  * @type {propTypes}
  * @param {Object} props - React PropTypes
  * @property {string} icon the path to the image for the podcast
  * @property {string} home the path to the main page for the podcast
  * @property {string} title The title for the podcast
  * @return {Object} React propTypes
  */
PodcastHeader.propTypes = {
    icon: PropTypes.string,
    home: PropTypes.string,
    title: PropTypes.string
};
export default PodcastHeader;
