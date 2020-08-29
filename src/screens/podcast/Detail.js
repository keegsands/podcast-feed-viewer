import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import Episode from '../../components/podcast/episode/Episode';
import PodcastHeader from '../../components/podcast/Header'
import parsePodcastFeedFromXML from '../../util/podcast-util';

const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';
const EPISODE_FLIP = 'EPISODE_FLIP';

/**
 * Reducer for managing the state of the loading of podcasts and also
 * the flipping of the order of the podcasts.
 * @param {*} state 
 * @param {*} action 
 */
const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case FETCH_INIT:
            // When initializing update the isLoading and isLoaded properties
            return {
                ...state,
                isLoading: true,
                isLoaded: false
            };
        case FETCH_SUCCESS:
            // When initializing update podcast and episodes list and the isLoading and isLoaded properties
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                podcast: action.payload,
                episodes: action.payload.episodes
            };
        case FETCH_FAILURE:
            // When a failure occurs update the isLoading and isLoaded properties
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
            };
        case EPISODE_FLIP:
            // Flip the order of the episodes
            return {
                ...state,
                episodes: state.episodes.reverse(),
            };
        default:
            throw new Error();
    }
};

const PodcastDetail = (props) => {

    // Initialize the reducer with the default values
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isLoaded: false,
        podcast: {},
        episodes: []
    });


    useEffect(() => {
        /**
        * If the feed is not loading go out and load it.  Set the podcast
        * state and loading false when done.
        */
        async function loadFeed(feedFile) {
            dispatch({ type: FETCH_INIT });
            axios.get(feedFile)
                .then(function (result) {
                    const podcast = parsePodcastFeedFromXML(result.data);
                    if (podcast) {
                        document.title = podcast.title;
                    }
                    dispatch({ type: FETCH_SUCCESS, payload: podcast });
                }).catch(function (error) {
                    dispatch({ type: FETCH_FAILURE });
                });

        }

        // Only do this if it is not loaded and not loading
        if (!state.loaded && !state.loading) {
            loadFeed(props.match.params.id + '.xml');
        }

        return () => { /* clean up method */ };

    }, [props.match.params.id, state.loaded, state.loading]);


    /** 
     * Handle the click of the Order Flip button, which will reverse
     * the episode list and update the state
    */
    const handleOrderFlip = () => {
        dispatch({ type: EPISODE_FLIP });
    }

    return (<div>
        <button type="button" className="link-button summary-link" onClick={() => { props.history.push('/') }}>View Podcast Directory</button>
        <PodcastHeader icon={state.podcast.icon} home={state.podcast.home} title={state.podcast.title} />
        {state.episodes && state.episodes.length > 1 ? <button type="button" onClick={handleOrderFlip} className='flip-button'>Flip Order</button> : null}
        <ul>
            {state.episodes.map((value, index) =>
                <Episode key={index} link={value.link} title={value.title} descText={value.descriptionText} />
            )}
        </ul>
    </div>);
}

export default PodcastDetail;