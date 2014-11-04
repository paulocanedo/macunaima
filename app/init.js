var Config = (function() {
  var base = "http://192.168.0.201:3000";

  return {
    init: function() {

    },
    
    url_musics:            base + "/database/teste/musics",
    url_albums:            base + "/database/teste/albums",
    url_album_detail:      base + "/database/teste/album/",
    url_artist_detail:     base + "/database/teste/artist/",
    url_artists:           base + "/database/teste/artists",
    url_play_music:        base + "/play/",
    url_current_metadata:  base + "/current/",
    url_play_next:         base + "/next/",
    url_play_previous:     base + "/previous/",
  };
})();

var app = angular.module('macunaima', [
  "ngRoute",
  "mobile-angular-ui"
  ]);

app.config(function($routeProvider, $locationProvider, $compileProvider) {
  $routeProvider.when('/artists',             {templateUrl: "artists.htm",        controller: 'ArtistController'}); 
  $routeProvider.when('/albums',              {templateUrl: "albums.htm",         controller: 'AlbumController'}); 
  $routeProvider.when('/musics',              {templateUrl: "musics.htm",         controller: 'MusicController'}); 
  $routeProvider.when('/artist/:artist',      {templateUrl: "artist_musics.htm",  controller: 'ArtistDetailController'});
  $routeProvider.when('/album/:album',        {templateUrl: "album_musics.htm",   controller: 'AlbumDetailController'});
  $routeProvider.when('/play/:music_id',      {templateUrl: "playing_now.htm",    controller: 'PlayMusicController'});
  $routeProvider.when('/playing_now',         {templateUrl: "playing_now.htm",    controller: 'PlayingNowController'});
  $routeProvider.otherwise({ redirectTo: '/artists'});

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);
});

app.controller('MainController', function ($scope, $http) {
  $scope.setTitleLabel = function(title) {
    document.getElementById("app_title_label").innerHTML = title;
  };

  $scope.stringSorter = function(a,b){
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  };

  var previousButton = document.getElementById('control-previous-music');
  previousButton.addEventListener('click', function(evt) {
    $http.get(Config.url_play_previous);
  });

  var nextButton = document.getElementById('control-next-music');
  nextButton.addEventListener('click', function(evt) {
    $http.get(Config.url_play_next);
  });

  $scope.updateMetadata = function(metadata) {
    document.getElementById('artist_label').innerHTML = metadata.artist;
    document.getElementById('album_label').innerHTML = metadata.album;
    document.getElementById('title_label').innerHTML = metadata.title;
    document.getElementById('current_time_label').innerHTML = metadata.s_current_time;
    document.getElementById('total_time_label').innerHTML = metadata.s_duration;

    document.getElementById('playing_now_content').style.backgroundImage = 'url(' + metadata.coverArt + ')';

    var ellapsed = 100.0 * metadata.current_time / metadata.duration;
    var ellapsed_p100 = Math.min(ellapsed, 100.0);

    document.getElementById('control_time').style.width = ellapsed_p100 + '%';
  };

  $scope.intervalHandler = -1;
});

app.controller('PlayMusicController', function ($scope, $http, $routeParams) {
  $http.get(Config.url_play_music + $routeParams.music_id).success(function(data) {
    if(data.success == true) {
      self.location = '#/playing_now';
    }
  });
});

app.controller('PlayingNowController', function ($scope, $http, $routeParams) {
  // $http.get(Config.url_current_metadata).success(function(data) {
  //   if(data.success == true) {
  //     $scope.updateMetadata(data.result.metadata);
  //   }
  // });

  $scope.setTitleLabel('Tocando agora');

  if($scope.intervalHandler == -1) {
    $scope.intervalHandler = setInterval(function() {
      if(self.location.hash !== '#/playing_now') {
        return;
      }

      $http.get(Config.url_current_metadata).success(function(data) {
        $scope.updateMetadata(data.result.metadata);
      });
    }, 1000);
  }
});

app.controller('AlbumController', function ($scope, $http) {
  $http.get(Config.url_albums).success(function(data) {
    if(data.success == true) {
      $scope.albums = data.result.albums.sort($scope.stringSorter);
    }
  });

  $scope.setTitleLabel("Álbuns");
});

app.controller('ArtistController', function ($scope, $http) {
  $http.get(Config.url_artists).success(function(data) {
    if(data.success == true) {
      $scope.artists = data.result.artists.sort($scope.stringSorter);
    }
  });

  $scope.setTitleLabel("Artistas");
});

app.controller('ArtistDetailController', function ($scope, $http, $routeParams) {
  $http.get(Config.url_artist_detail + $routeParams.artist).success(function(data) {
    if(data.success == true) {
      $scope.albums = data.result.artist_albums;
    }
  });

  $scope.setTitleLabel($routeParams.artist);
});

app.controller('AlbumDetailController', function ($scope, $http, $routeParams) {
  $http.get(Config.url_album_detail + $routeParams.album).success(function(data) {
    if(data.success == true) {
      $scope.musics = data.result.musics;
    }
  });

  $scope.setTitleLabel($routeParams.album);
});

app.controller('MusicController', function ($scope, $http) {
  $http.get(Config.url_musics).success(function(data) {
    if(data.success == true) {
      $scope.musics = data.result.musics;
    }
  });

  $scope.setTitleLabel("Músicas");
});