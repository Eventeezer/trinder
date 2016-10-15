((App) => {
    'use strict';

    App.config(($stateProvider) => {
        $stateProvider.state('people', {
            url: '/people',
            reload: false,
            controller: 'PeopleController',
            templateUrl: 'templates/people.html'
        });
    });

    App.controller('PeopleController', class PeopleController {
        /**
         * @param $scope
         * @param $timeout
         */
        constructor($scope, $timeout) {
            $scope.$watch('client', (value) => {
                if (value !== null) {
                    $scope.refresh();
                }
            });

            // Main section.
            $scope.people = [];
            $scope.loading = false;
            $scope.voting = false;
            $scope.match = false;

            $scope.like = (person) => {
                $scope.voting = true;
                $scope.client.like(person.id).then((result) => {
                    if (result.match) {
                        $scope.match = true;
                        $timeout(() => {
                            $scope.match = false;
                        }, 1000);
                    }

                    let index = $scope.people.indexOf(person);
                    if (index > -1) {
                        $scope.people.splice(index, 1);
                        if (!$scope.people.length) {
                            $scope.refresh();
                        }
                    }
                    $scope.voting = false;
                    $scope.$apply();
                }, () => {
                    $scope.voting = false;
                    $scope.$apply();
                })
            };

            $scope.pass = (person) => {
                $scope.voting = true;
                $scope.client.pass(person.id).then(() => {
                    let index = $scope.people.indexOf(person);
                    if (index > -1) {
                        $scope.people.splice(index, 1);
                        if (!$scope.people.length) {
                            $scope.refresh();
                        }
                    }
                    $scope.voting = false;
                    $scope.$apply();
                }, () => {
                    $scope.voting = false;
                    $scope.$apply();
                })
            };

            $scope.refresh = () => {
                $scope.loading = true;
                $scope.client.recs().then((recs) => {
                    $scope.people = recs;
                    $scope.loading = false;
                    $scope.$apply();
                }, () => {
                    $scope.people = [];
                    $scope.loading = false;
                    $scope.$apply();
                });
            };

            $scope.ageText = (birth) => {
                let age = (new Date()).getYear() - birth.getYear();
                return age + ' years';
            }
        }
    });
})(App);
