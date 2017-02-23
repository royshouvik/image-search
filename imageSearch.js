"use strict"
const request = require('request-promise');
const Search = require('./search_model');

const URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&per_page=10&content_type=1',
      API_KEY = process.env.KEY;

// Converts a Flickr photo object to an URL
// https://www.flickr.com/services/api/misc.urls.html
const photoToUrl = photo => {
  const {id, farm, secret, server} = photo;
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
}

const mapPhotos = photos => {
  return photos.map(photo => {
    return {
      title : photo.title,
      url: photoToUrl(photo)
    }
  })
}

const fetchFlickrData = (searchQuery, page) => {
  return request({
      url: URL,
      qs : {
        api_key: API_KEY,
        text: searchQuery,
        page
      }
  });
};

exports.getSearchResults = (req, res) => {
  const term = req.params.query,
        offset = req.query.offset || 1 ;
  const searchTerm = new Search({
    term
  });
  searchTerm.save((err)=> {
    if(err)
      return res.status(500).end(err);
    
    fetchFlickrData(term, offset)
    .then(data => res.json(mapPhotos(JSON.parse(data).photos.photo)))
    .catch(err => {
      req.status(500).end(err);
    });
  });
}

exports.getLatestSearch = (req, res) => {
  Search.find().sort('-when').select('term when -_id').limit(10).exec((err, searchResults) => {
    if(err)
      return res.status(500).end(err);
    res.json(searchResults);
  })
}