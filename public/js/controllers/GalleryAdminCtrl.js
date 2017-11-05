angular
.module('portfolio')
.controller('GalleryAdminCtrl', GalleryAdminCtrl);
GalleryCtrl.$inject = ['PortfolioService', '$state'];

function GalleryAdminCtrl(PortfolioService, $state) {
var vm = this;

vm.albums = [];

activate();

function activate() {
    displayAlbums();
}

function displayAlbums() {
    PortfolioService.getAlbums()
        .then(function(data) {
            vm.albums = data;
            console.log('data', data);
            return vm.albums;
        });
}

}