import React from 'react';
import axios from 'axios';
import Detail from '../detail/detail';
import convert from 'xml-js'


export default class Summary extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            podcast: {items:[]},
            loaded: false
        };
    }

    
    componentDidMount() {
        var _this = this;
        this.serverRequest =
            axios
                .get("http://localhost:3000/feed.xml")
                .then(function (result) {
                    _this.updateTheState(result.data);
                })
    }

    updateTheState(feedXML){

        const feedJSON = convert.xml2json(feedXML, {compact: true, spaces: 4});
        this.setState({
            podcast: JSON.parse(feedJSON),
            loaded: true
        });
    }

    componentWillUnmount() {
        // this.serverRequest.abort();
    }
    render() {
        let podcastTitle = '';
        let podcastHome = '';
        let podcastIcon = '';
        let podcasts = [];
        if (this.state && this.state.loaded) {
            podcastTitle = this.state.podcast.rss.channel.title._text;
            podcastHome = this.state.podcast.rss.channel.link._text;
            podcastIcon = this.state.podcast.rss.channel['itunes:image']['_attributes']['href'];
            podcasts = this.state.podcast.rss.channel.item;
        }
        if(!podcasts){
            podcasts = [];
        }

        return (
            <div><header><img width="300" alt="podcastIcon" src={podcastIcon} className="podcast-icon"></img><h2><a href={podcastHome}>{podcastTitle}</a></h2></header>
                <ul>
                    {podcasts.reverse().map((value, index) => {
                        return <div key={index}><Detail podcast={value}/></div>
                    })}
                </ul>
            </div>


        );
    }
}