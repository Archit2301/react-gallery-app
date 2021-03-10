/*****************************************************
TechDegree Project 7 - React Gallery App
*****************************************************/

// Importing all dependencies
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

// Importing all components
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import FourOFour from './components/FourOFour';

// Root component from where props will be passed down to the children 
class App extends Component {

  state = {
    querySearch: '',
    photos: [],
    musicPhotos: [],
    sportsPhotos: [],
    healthPhotos: [],
    loading: true
  };  

  // React's lifecycle method defined
  componentDidMount() {

    this.performSearch();
    
    // Fetching the data using flickr API
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=music&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState ({
          musicPhotos: response.data.photos.photo,
          loading: false
      });
    })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });

      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sports&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState ({
          sportsPhotos: response.data.photos.photo,
          loading: false
      });
    })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });

      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=health&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState ({
          healthPhotos: response.data.photos.photo,
          loading: false
      });
    })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  /**
  * function defined for photo search
  * @param (string) query - this will hold the input field value requested
  */ 
  performSearch = (query="music") => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo, 
          querySearch: query,
          loading: false
      });
    })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }


  render() {    
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <SearchForm onSearch={this.performSearch} />
            <Nav />  
             {
               (this.state.loading)
               ? <p>Loading...</p> 
               : <Switch>
                    <Route exact path="/" render={() => <Redirect to="/music" /> } />   
                    <Route path="/music" render={() => <PhotoContainer title="Music" data={this.state.musicPhotos} /> } />
                    <Route path="/sports" render={() => <PhotoContainer title="Sports" data={this.state.sportsPhotos} /> } />
                    <Route path="/health" render={() => <PhotoContainer title="Health" data={this.state.healthPhotos} /> } />
                    <Route exact path="/:name" render={() => <PhotoContainer title={this.state.querySearch} data={this.state.photos}/> } />
                    <Route component={FourOFour} />
                </Switch>
             }                       
          </div>
        </div>
      </BrowserRouter>
    );
  }
}  

export default App;
