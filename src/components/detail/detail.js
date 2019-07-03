import React from 'react';


const Detail = (props) => {
    let podcastTitle = props.podcast.title._text;
    if (!podcastTitle) {
        let publishDate = new Date(props.podcast.date_published);
        podcastTitle = publishDate.toLocaleString('en-US');
    }

    let episodeLink = props.podcast.link._text;

    let descriptionText = '';
    if ('content:encoded' in props.podcast) {
        descriptionText = props.podcast['content:encoded']._text;
    }

    if (!descriptionText) {
        if ('_cdata' in props.podcast.description) {
            descriptionText = props.podcast.description._cdata;
        } else {
            descriptionText = props.podcast.description._text;
        }
    }
    return (
        <div><a href={episodeLink}><h3>{podcastTitle}</h3></a> <hr /><div dangerouslySetInnerHTML={{ __html: descriptionText }} /></div>
    );
}
export default Detail;
