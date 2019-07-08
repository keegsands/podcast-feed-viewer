import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PodcastDetail from './screens/podcast/Detail';
import PodcastList from './screens/podcast/List';

const App = () => {

    return (<Router>
        <div>

            <Route exact path="/" component={PodcastList} />
            <Route path="/:id" component={PodcastDetail} />
        </div>
    </Router>);
}
export default App;
