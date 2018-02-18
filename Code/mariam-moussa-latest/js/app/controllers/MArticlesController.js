app.controller('MArticlesController', ['Upload', '$window', '$http', "$rootScope", '$scope', 'marked', function(Upload, $window, $http, $rootScope, $scope, marked) {
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
            url: 'http://localhost:3000/api/getArticles'
        }).then(function successCallback(response) {
            responseData = response.data;
            // alert("respnse data" + JSON.stringify(responseData));
            angular.forEach(responseData,
                function(item) {
                    $scope.articles.push(item);
                });

        }, function errorCallback(response) {
            alert("error" + response);

        });
        // $http({
        //     method: 'GET',
        //     url: 'http://localhost:3000/api/getSelectedArticles'
        // }).then(function successCallback(response) {
        //     responseData2 = response.data;
        //     // alert("respnse data" + JSON.stringify(responseData2));
        //     angular.forEach(responseData2,
        //         function(item) {
        //             $scope.selectedArticles.push(item);
        //         });

        // }, function errorCallback(response) {
        //     alert("error" + response);

        // });
    }

    init();
    vm.submit = function() { //function to call on form submit
        var result = document.getElementsByClassName("markdown");
        vm.newArticle.description = result[0].innerHTML;
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
        }

    }
    vm.upload = function(file) {
        // alert("File: =>" + JSON.stringify(file));
        Upload.upload({
            url: 'http://localhost:3000/api/upload', //webAPI exposed to upload the file
            data: { file: file } //pass file as data, should be user ng-model
        }).then(function(resp) { //upload function returns a promise
            if (resp.data.error_code === 0) { //validate success
                // $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                vm.addArticle(resp.data.imgname);

            } else {
                $window.alert('an error occured');
            }
        }, function(resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function(evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
        alert("finish upload ");
    };

    vm.addArticle = function(imgname) {
        vm.newArticle.imagePath = imgname;
        $window.alert(JSON.stringify(vm.newArticle));

        $http({
                url: 'http://localhost:3000/api/addArticle',
                method: "POST",
                data: $.param(vm.newArticle),
                dataType: 'json',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function(result) {
                console.log(result);
                alert("Article added successfully");

            }).catch(function(error) {
                console.log(error);
            });
    }



    $scope.editor1 = "*This* **is** [markdown](https://daringfireball.net/projects/markdown/)\n and `{{ 1 + 2 }}` = {{ 1 + 2 }}";
    $scope.markdownService = marked('#TEST');

    // --
    // normal flow, function call
    $scope.convertMarkdown = function() {
        vm.convertedMarkdown = marked(vm.markdown);


    }

    // /**
    //  * For some convenience, Angular-Markdown-Editor Directive also save each Markdown Editor inside $rootScope
    //  * Each of editor object are available through their $rootScope.markdownEditorObjects[editorName]
    //  *
    //  * Example: <textarea name="editor1" markdown-editor="{'iconlibrary': 'fa'}"></textarea>
    //  * We would then call our object through $rootScope.markdownEditorObjects.editor1
    //  */
    // $scope.fullScreenPreview = function() {
    //     $rootScope.markdownEditorObjects.editor1.showPreview();
    //     alert("code: " + $rootScope.markdownEditorObjects.editor1.code.alert);
    //     $rootScope.markdownEditorObjects.editor1.setFullscreen(true);
    // }

    // $scope.getHTML = function() {

    //     var result = document.getElementsByClassName("markdown");
    //     alert(result[0].innerHTML);
    // }

    // /** Markdown event hook onFullscreen, in this example we will automatically show the result preview when going in full screen
    //  * the argument (e) is the actual Markdown object returned which help call any of API functions defined in Markdown Editor
    //  * For a list of API functions take a look on official demo site http://www.codingdrama.com/bootstrap-markdown/
    //  * @param object e: Markdown Editor object
    //  */
    // $scope.onFullScreenCallback = function(e) {
    //     e.showPreview();
    // }

    // /** After exiting from full screen, let's go back to editor mode (which mean hide the preview)
    //  * NOTE: If you want this one to work, you will have to manually download the JS file, not sure why but they haven't released any versions in a while
    //  *       https://github.com/toopay/bootstrap-markdown/tree/master/js
    //  */
    $scope.onFullScreenExitCallback = function(e) {
        e.hidePreview();
    }




    $scope.foundArticles = {
        articles: []
    };
    // $scope.toBeSelectedArticles = {
    //     articles: []
    // };

    $scope.checkAllArticles = function() {
        $scope.foundArticles.articles = angular.copy($scope.articles);
    };
    $scope.uncheckAllArticles = function() {
        $scope.foundArticles.articles = [];
    };

    // $scope.checkAllSelectedArticles = function() {
    //     $scope.toBeSelectedArticles.articles = angular.copy($scope.selectedArticles);
    // };
    // $scope.uncheckAllSelectedArticles = function() {
    //     $scope.toBeSelectedArticles.articles = [];
    // };

    // $scope.save = function() {
    //     // alert(JSON.stringify($scope.foundCampaigns.campaigns));

    //     if (($scope.foundArticles.articles.length + $scope.selectedArticles.length) > 4) {
    //         alert("Selected Articles must be 4 or less");
    //     } else {
    //         for (var i = 0; i < $scope.foundArticles.articles.length; i++) {
    //             // alert($scope.foundCampaigns.campaigns[i]);
    //             $http({
    //                     url: 'http://localhost:3000/api/addSelectedArticles',
    //                     method: "POST",
    //                     data: $.param($scope.foundArticles.articles[i]),
    //                     dataType: 'json',
    //                     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //                 })
    //                 .then(function(result) {
    //                     console.log(result);

    //                 }).catch(function(error) {
    //                     console.log(error);
    //                 });
    //         }
    //         alert("Saved Successfully");
    //     }

    // };
    $scope.deleteArticles = function() {
        // alert(JSON.stringify($scope.foundCampaigns.campaigns));

        for (var i = 0; i < $scope.foundArticles.articles.length; i++) {
            // alert($scope.foundCampaigns.campaigns[i]);
            $http({
                    url: 'http://localhost:3000/api/deleteArticle',
                    method: "PUT",
                    data: $.param($scope.foundArticles.articles[i]),
                    dataType: 'json',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .then(function(result) {
                    console.log(result);

                }).catch(function(error) {
                    console.log(error);
                });
        }
        alert("Deleted Successfully");
    }



    // $scope.deleteSelectedArticle = function() {
    //     // alert(JSON.stringify($scope.toBeSelectedCampaigns.campaigns));

    //     for (var i = 0; i < $scope.toBeSelectedArticles.articles.length; i++) {
    //         // alert($scope.toBeSelectedCampaigns.campaigns[i]);
    //         $http({
    //                 url: 'http://localhost:3000/api/deleteSelectedArticle',
    //                 method: "PUT",
    //                 data: $.param($scope.toBeSelectedArticles.articles[i]),
    //                 dataType: 'json',
    //                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //             })
    //             .then(function(result) {
    //                 console.log(result);

    //             }).catch(function(error) {
    //                 console.log(error);
    //             });
    //     }
    //     alert("Deleted Successfully");
    // }
}]);