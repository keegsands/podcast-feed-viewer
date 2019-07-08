import React, { useEffect } from 'react';
import Podcast from '../../components/podcast/Podcast';

const PodcastDetail = ({ match, history }) => {

    useEffect(() => { testIt() });

    function testIt() {
    }
    return (
        <div>
            <button type="button" className="link-button summary-link" onClick={() => { history.push('/') }}>View Podcast Directory</button>
            <Podcast feed={match.params.id} />
        </div>);
}

export default PodcastDetail;