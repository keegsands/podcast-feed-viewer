import convert from 'xml-js'

export default function parsePodcastFeedFromXML(feedXML) {

    const feedObject = JSON.parse(convert.xml2json(feedXML, { compact: true, spaces: 4 }));
    const podcast = { episodes: [] };

    // Check to make sure the rss and channel items are in the object before processing
    if ('rss' in feedObject && 'channel' in feedObject.rss) {
        // Store the channel for simplicity
        const channel = feedObject.rss.channel;

        // Get the title for the podcast
        if ('title' in channel) {
            podcast.title = channel.title._text;
        }

        // Get the link for the podcast
        if ('link' in channel) {
            podcast.home = channel.link._text;
        }

        // Get the image for the podcast
        if ('itunes:image' in channel) {
            podcast.icon = channel['itunes:image']['_attributes']['href'];
        }

        // Check to see if there are episodes and if so process them
        if ('item' in channel && channel.item) {
            channel.item.forEach(element => {
                podcast.episodes.push(parseEpisode(element));
            });
        }
    }

    return podcast;
}


/**
 * Parsing the JSON from xml into a standard episode object
 * @param {*} rawEpisode JSON from the XML conversion
 */
function parseEpisode(rawEpisode) {
    const episode = {};
    episode.title = rawEpisode.title._text;
    // If the title has not been set then use the date_published as the title
    if (!episode.title) {
        let publishDate = new Date(rawEpisode.date_published);
        episode.title = publishDate.toLocaleString('en-US');
    }

    // Set the URL of the podcast
    episode.link = rawEpisode.link._text;

    // If the content:encoded property exists then it is the preferred 
    // content for displaying the episode notes.
    if ('content:encoded' in rawEpisode) {
        episode.descriptionText = rawEpisode['content:encoded']._text;
    }

    // If the descriptionText hasn't been set then try to get the value from
    // the description property, first looking at the cdata attribute and then the text attribute as a fall back
    if (!episode.descriptionText) {
        if ('_cdata' in rawEpisode.description) {
            episode.descriptionText = rawEpisode.description._cdata;
        } else if('_text' in rawEpisode.description){
            episode.descriptionText = rawEpisode.description._text;
        }else{
            episode.descriptionText = '';
        }
    }
    return episode;
}

