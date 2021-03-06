var DataService = (function() {
  var all_musics = [];
  return {
    init: function() {
      
    },
    getAlbums: function() {
      return { 
        "albums": [
        { "name": "Destination Anywhere", "coverArt": "http://www.theaudiodb.com/images/media/album/thumb/destination-anywhere-4e10e5c279b0f.jpg" },
        { "name": "Cross Road", "coverArt": "http://www.theaudiodb.com/images/media/album/thumb/yxwtrp1367243317.jpg" },
        { "name": "Falling Into You", "coverArt": "http://www.theaudiodb.com/images/media/album/thumb/yqsswr1367235710.jpg" },
        { "name": "Let\'s Talk about love", "coverArt": "http://www.theaudiodb.com/images/media/album/thumb/ytprxy1367235643.jpg" },
        { "name": "Achtung Baby", "coverArt": "http://www.theaudiodb.com/images/media/album/thumb/achtung-baby-4e4363493d3da.jpg" },
        { "name": "All that you can\'t leave behind", "coverArt": "http://www.theaudiodb.com/images/media/album/thumb/all-that-you-cant-leave-behind-4e439ec0c290c.jpg" },
        { "name": "Pop", "coverArt": "http://www.theaudiodb.com/images/media/album/thumb/pop-4e439cb5d6644.jpg" },
        { "name": "Left Right Left Right Left", "coverArt": "http://www.theaudiodb.com/images/media/album/thumb/tvquxw1367234023.jpg" },
        { "name": "Acoustica", "coverArt": "http://ecx.images-amazon.com/images/I/51ORBNamEYL.jpg" },
        { "name": "Humanity Hour I", "coverArt": "http://www.theaudiodb.com/images/media/album/thumb/humanity-hour-i-4e4dda58f381a.jpg" },
        { "name": "Moment of Glory", "coverArt": "http://www.theaudiodb.com/images/media/album/thumb/qqxyrs1410894288.jpg" },
        { "name": "(What's The Story) Morning Glory", "coverArt": "http://www.theaudiodb.com/images/media/album/thumb/whats-the-story-morning-glory-disc-1-4de93e4bc1c6f.jpg" },
        ]
      };
    },
    getAllMusics: function() {
      return {
        "musics": all_musics
      };
    },
    getMusicsFromAlbum: function(album) {
      return album;
    },
    getMusicsFromArtist: function(artist) {
      return artist;
    },
    getMusicsFromSearch: function(search) {
      return search;
    },
    getAlbumsFromArstist: function(artist) {
      return artist;
    },
    getArtists: function() {
      return {
        "artists": [
        { "name": "Celine Dion", "fanArt": "http://www.theaudiodb.com/images/media/artist/fanart/qvqvpu1359062183.jpg" },
        { "name": "U2", "fanArt": "http://www.theaudiodb.com/images/media/artist/fanart/suutuy1347997410.jpg" },
        { "name": "Engenheiros do Hawaii", "fanArt": "http://www.theaudiodb.com/images/media/artist/fanart/sruprw1369587930.jpg" },
        { "name": "Coldplay", "fanArt": "http://www.theaudiodb.com/images/media/artist/fanart/spvryu1347980801.jpg" },
        { "name": "Scorpions", "fanArt": "http://www.theaudiodb.com/images/media/artist/fanart/scorpions-4f82d87e9feb5.jpg" },
        { "name": "Oasis", "fanArt": "http://www.theaudiodb.com/images/media/artist/fanart/tpqwyt1349529389.jpg" },
        ]
      };
    }
  };
})();

DataService.init();