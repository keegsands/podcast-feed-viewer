import React from 'react';

/**
 * Component for displaying the details of a podcast episode.
 * @param {*} props podcast episode object 
 */
const Detail = ({episode}) => {
    return (
        <div><a href={episode.link}><h3>{episode.title}</h3></a> <hr /><div dangerouslySetInnerHTML={{ __html: episode.descriptionText }} /></div>
    );
}
export default Detail;
