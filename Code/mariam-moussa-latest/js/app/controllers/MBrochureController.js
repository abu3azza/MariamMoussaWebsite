app.controller('MBrochureController', ['Upload', '$window', '$http', '$scope', function(Upload, $window, $http, $scope) {
    console.log("hi MBrochureController");
    var vm = this;

    vm.submit = function() { //function to call on form submit

        // console.log("hawhawhaw" + name);
        // console.log(JSON.stringify($scope.foundArticles.articles[i]));

        $http({
                url: 'http://207.154.226.195:3000/api/deleteBrochure',
                method: "PUT",
                dataType: 'json',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function(result) {

                console.log(result);

            }).catch(function(error) {
                console.log(error);
            });
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
        }

    }
    vm.upload = function(file) {
        // console.log("File: =>" + JSON.stringify(file));
        Upload.upload({
            url: 'http://207.154.226.195:3000/api/uploadBrochure', //webAPI exposed to upload the file
            data: { file: file } //pass file as data, should be user ng-model
        }).then(function(resp) { //upload function returns a promise
            if (resp.data.error_code === 0) { //validate success
                // $window.console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ');

                $window.console.log('Brouchure uploaded sucssesfuly');

            } else {
                $window.console.log('an error occured');
            }
        }, function(resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.console.log('Error status: ' + resp.status);
        }, function(evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
        console.log("finish upload ");
    };

}]);