import {React, Component} from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './css/App.css';
import axios from 'axios';
import apiKey from './config/config';

import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';

class App extends Component {

  state = {
    querySearch: '',
    photos: [],
    musicPhotos: [],
    sportsPhotos: [],
    healthPhotos: []
  };

  performSearch = (query="music") => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo, 
          querySearch: query
      });
    })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  componentDidMount() {
    
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=music&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState ({
          musicPhotos: response.data.photos.photo
      });
    })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });

      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sports&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState ({
          sportsPhotos: response.data.photos.photo
      });
    })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });

      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=health&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState ({
          healthPhotos: response.data.photos.photo
      });
    })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
}

  render() {
    console.log(this.state.photos);
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <SearchForm onSearch={this.performSearch} />
            <Nav />  
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/music" /> } />   
                <Route path="/music" render={() => <PhotoContainer title="Music" data={this.state.musicPhotos} /> } />
                <Route path="/sports" render={() => <PhotoContainer title="Sports" data={this.state.sportsPhotos} /> } />
                <Route path="/health" render={() => <PhotoContainer title="Health" data={this.state.healthPhotos} /> } />
                <Route path="/:name" render={() => <PhotoContainer title={this.state.querySearch} data={this.state.photos}/> } />
            </Switch>           
          </div>
        </div>
      </BrowserRouter>
    );
  }

}  

export default App;
