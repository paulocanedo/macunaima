var Config = (function() {
  var base = "http://192.168.0.201:3000";

  return {
    init: function() {

    },
    
    url_musics:         base + "/database/teste/musics",
    url_albums:         base + "/database/teste/albums",
    url_album_detail:   base + "/database/teste/album/",
    url_artist_detail:  base + "/database/teste/artist/",
    url_artists:        base + "/database/teste/artists",
  };
})();

var app = angular.module('macunaima', [
  "ngRoute",
  "mobile-angular-ui"
  ]);

app.config(function($routeProvider, $locationProvider, $compileProvider) {
  $routeProvider.when('/artists',           {templateUrl: "artists.htm",        controller: 'ArtistController'}); 
  $routeProvider.when('/albums',            {templateUrl: "albums.htm",         controller: 'AlbumController'}); 
  $routeProvider.when('/musics',            {templateUrl: "musics.htm",         controller: 'MusicController'}); 
  $routeProvider.when('/artist/:artist',    {templateUrl: "artist_musics.htm",  controller: 'ArtistDetailController'});
  $routeProvider.when('/album/:album',      {templateUrl: "album_musics.htm",   controller: 'AlbumDetailController'});
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