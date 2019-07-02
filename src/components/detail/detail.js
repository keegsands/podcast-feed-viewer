import React from 'react';


export default class Detail extends React.Component {
    
    render() {
        let podcastTitle = this.props.podcast.title._text;
        if(!podcastTitle){
            let publishDate = new Date(this.props.podcast.date_published);
            podcastTitle = publishDate.toLocaleString('en-US');
        }

        let episodeLink = this.props.podcast.link._text;

        let descriptionText = '';
        if('content:encoded' in this.props.podcast){
            descriptionText = this.props.podcast['content:encoded']._text;
        }

        if(!descriptionText){
            if('_cdata' in this.props.podcast.description){
                descriptionText = this.props.podcast.description._cdata;
            }else{
                descriptionText = this.props.podcast.description._text;
            }
        }
        
        

        return (
            <div><a href={episodeLink}><h3>{podcastTitle}</h3></a> <hr/><div dangerouslySetInnerHTML={{ __html: descriptionText }} /></div>
        );
    }
}