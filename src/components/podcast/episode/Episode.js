import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * Component for displaying the details of a podcast episode.
 * @param {*} props 
 */
const Episode = (props) =>

    <div>
        <a href={props.link}>
            <h3>{props.title}</h3>
        </a>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: props.descText }} />
    </div>

/**
  * @name Episode propTypes
  * @type {propTypes}
  * @param {Object} props - React PropTypes
  * @property {string} link the path for the page of the episode
  * @property {string} title the title of the episode
  * @property {string} descText the body/description of the episode
  * @return {Object} React propTypes
  */
Episode.propTypes = {
    /** The path for the page of the episode*/
    link: PropTypes.string,
    /** The title of the episode*/
    title: PropTypes.string,
    /** The body/description of the episode*/
    descText: PropTypes.string
};

export default Episode;
