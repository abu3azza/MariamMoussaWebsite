app.controller('MArticlesController', ['Upload', '$window', '$http', "$rootScope", '$scope', 'marked', function (Upload, $window, $http, $rootScope, $scope, marked) {
    // alert("hi MArticlesController");
    var vm = this;
    vm.newArticle = {};
    $scope.articles = [];
    // $scope.selectedArticles = [];

    function init() {
        var responseData;
        var responseData2;
        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/getArticles'
        }).then(function successCallback(response) {
            responseData = response.data;
            // alert("respnse data" + JSON.stringify(responseData));
            angular.forEach(responseData,
                function (item) {
                    $scope.articles.push(item);
                });

        }, function errorCallback(response) {
            console.log("error" + response);

        });

    }
    function reloadArticles() {
        var responseData;
        $scope.articles = [];
        console.log("Refreshing Articles list");
        $http({
            method: 'GET',
            url: 'http://207.154.226.195:3000/api/getArticles'
        }).then(function successCallback(response) {
            responseData = response.data;
            angular.forEach(responseData,
                function (item) {
                    $scope.articles.push(item);
                });
            $scope.$digest();
        }, function errorCallback(response) {
            console.log("error" + response);

        });

    }

    init();
    vm.submit = function () { //function to call on form submit
        var result = document.getElementsByClassName("markdown");
        vm.newArticle.description = result[0].innerHTML;
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
            reloadArticles();
        }

    }
    vm.upload = function (file) {
        // alert("File: =>" + JSON.stringify(file));
        Upload.upload({
            url: 'http://207.154.226.195:3000/api/upload', //webAPI exposed to upload the file
            data: { file: file } //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if (resp.data.error_code === 0) { //validate success
                // $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                vm.addArticle(resp.data.imgname);

            } else {
                $window.alert('Unexpected Error occured!');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
        // alert("Done uploading ");
    };

    vm.addArticle = function (imgname) {
        vm.newArticle.imagePath = imgname;
        // $window.alert(JSON.stringify(vm.newArticle));

        $http({
            url: 'http://207.154.226.195:3000/api/addArticle',
            method: "POST",
            data: $.param(vm.newArticle),
            dataType: 'json',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(function (result) {
                console.log(result);
                alert("Article added successfully");
            }).catch(function (error) {
                console.log(error);
            });
    }



    $scope.editor1 = "*This* **is** [markdown](https://daringfireball.net/projects/markdown/)\n and `{{ 1 + 2 }}` = {{ 1 + 2 }}";
    $scope.markdownService = marked('#TEST');

    // --
    // normal flow, function call
    $scope.convertMarkdown = function () {
        vm.convertedMarkdown = marked(vm.markdown);


    }


    $scope.onFullScreenExitCallback = function (e) {
        e.hidePreview();
    }




    $scope.foundArticles = {
        articles: []
    };

    $scope.checkAllArticles = function () {
        $scope.foundArticles.articles = angular.copy($scope.articles);
    };
    $scope.uncheckAllArticles = function () {
        $scope.foundArticles.articles = [];
    };


    $scope.deleteArticles = function () {
        // alert(JSON.stringify($scope.foundCampaigns.campaigns));

        for (var i = 0; i < $scope.foundArticles.articles.length; i++) {
            // alert(JSON.stringify($scope.foundArticles.articles[i].imagePath));
            var name = $scope.foundArticles.articles[i].imagePath;
            $http({
                url: 'http://207.154.226.195:3000/api/deleteArticle',
                method: "PUT",
                data: $.param($scope.foundArticles.articles[i]),
                dataType: 'json',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
                .then(function (result) {
                    // alert("hawhawhaw" + name);
                    console.log(result);
                    // alert(JSON.stringify($scope.foundArticles.articles[i]));
                    reloadArticles();
                    $http({
                        url: 'http://207.154.226.195:3000/api/deleteImage',
                        method: "PUT",
                        params: { name: name },
                        dataType: 'json',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                        .then(function (result) {
                            console.log(result);

                        }).catch(function (error) {
                            console.log(error);
                        });

                }).catch(function (error) {
                    console.log(error);
                });
        }
        alert("Deleted Successfully");
    }




}]);