import React from 'react';
import { PropTypes } from 'prop-types';
/**
 * Component for displaying the tile of a podcast
 * @param {*} props 
 */
const PodcastTile = (props) =>
    <div>
        <a href={props.href}>{props.title}</a>
    </div>


/**
  * @name PodcastTile propTypes
  * @type {propTypes}
  * @param {Object} props - React PropTypes
  * @property {string} href link for the detail page in the podcast directory
  * @property {string} title The title for the tile
  * @return {Object} React propTypes
  */
PodcastTile.propTypes = {
    href: PropTypes.string,
    title: PropTypes.string
};
export default PodcastTile;
