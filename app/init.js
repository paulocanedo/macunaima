var app = angular.module('macunaima', [
  "ngRoute",
  "mobile-angular-ui"
  ]);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/artists',   {templateUrl: "artists.htm", controller: 'ArtistController'}); 
  $routeProvider.when('/albums',    {templateUrl: "albums.htm", controller: 'AlbumController'}); 
  $routeProvider.when('/musics',    {templateUrl: "musics.htm"}); 
  $routeProvider.otherwise({ redirectTo: '/artists'});
});

app.controller('MainController', function ($scope, $http) {
  $scope.setTitleLabel = function(title) {
    document.getElementById("app_title_label").innerHTML = title;
  };
});

app.controller('AlbumController', function ($scope, $http) {
  $scope.albums = DataService.getAlbums().albums;

  $scope.setTitleLabel("Álbuns");
});

app.controller('ArtistController', function ($scope, $http) {
  $scope.artists = DataService.getArtists().artists;

  $scope.setTitleLabel("Artistas");
});