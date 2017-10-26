angular
    .module('portfolio')
    .factory('PortfolioService', PortfolioService);

PortfolioService.$inject = ['$http'];

function PortfolioService($http) {
	return {
		getAlbums: getAlbums,
        getPhotos: getPhotos
	};

	function getAlbums() {
		return $http.get('/api/albums')
            .then(complete)
            .catch(failed);
	}

    function getPhotos(id) {
        return $http.get('/api/albums/'+ id)
            .then(complete)
            .catch(failed);
    }

	function complete(response) {
        return response.data;
    }

    function failed(error) {
        console.error('XHR Failed for getAvengers.' + error.data);
    }
}