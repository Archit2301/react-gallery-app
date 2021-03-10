import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoContainer = (props) => {

    const results = props.data;
    let photos;

    // Conditional statement to check if the results were returned upon request
    if ( results.length !== 0 ) {
        photos = results.map(photo => 
            <Photo 
                key={photo.id}
                url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                title={photo.title}
            />
        );
    } else {
       photos = <NotFound />; 
    }    
    
    return(        
            ( results.length !== 0 ) 
            ? <div className="photo-container">
                <h2>Images Of: { props.title }</h2>
                <ul>
                  { photos }
                </ul>
              </div>
            : <div className="photo-container">
                <ul>
                  { photos }
                </ul>
              </div>               
    );
}

export default PhotoContainer