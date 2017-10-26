angular
    .module('portfolio')
    .factory('AdminService', AdminService);

AdminService.$inject = ['$http'];
 
function AdminService($http) {
    return {
        uploadImg: uploadImg,
        currentAlbum: currentAlbum,
        postPhotos: postPhotos
    };

    function uploadImg(album, image) {
        console.log('service fiel:', image);
        var fd = new FormData();
        fd.append('file', image);
        // fd.append('file', image);
        console.log("inside album: ", album)
        fd.append('album', JSON.stringify(album) );
        console.log('fd:', fd);
        return $http.post('/api/createAlbum'
            , fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
        }
        )
        .then(complete)
        .catch(failed);
    }

    function currentAlbum(id) {
        console.log('id is: ', id);
        return $http.get('/api/currentAlbum/'+ id)
        .then(complete)
        .catch(failed);
    }


    function postPhotos(files, id) {
        var fd = new FormData();
        console.log(id);
        for (var i = 0; i < files.length; i++) {
            file = files.item(i);
            // file = files[i];
            console.log('file', file);
            fd.append('file', file);
        }

        //console.log('file to send: ' ,file);
        return $http.put('/api/addPhotos/'+id, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .then(complete)
        .catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        console.error('XHR Failed for getAvengers.' + error.data);
    }
};