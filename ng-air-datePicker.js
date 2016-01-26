(function () {
    // Example from https://github.com/t1m0n/air-datepicker

    angular
        .module('air-datePicker', [])
        .directive('datePicker', datePicker);

    /**
     * air-datePicker
     *
     * @scope ngModel {object|ngModel} object or scope
     * @scope options {object} air-datePicker options
     *
     * @example
     * <input date-picker type="text" options="{language: 'en'}" ng-model="xxx">
     * <input date-picker type="text" options="xxx" ng-model="xxxx">
     */
    function datePicker ($rootScope, $timeout) {
        return {
            restrict: 'A',
            scope   : {
                options: '&',
                ngModel: '='
            },
            link    : linkFunc
        };

        function linkFunc (scope, element, attrs, ctrl) {
            var defaults = {
                language: 'zh'
            };

            // view to model
            defaults.onSelect = function (formattedDate, date, inst) {
                scope.ngModel = formattedDate;
                scope.$applyAsync();
            };

            // model to view
            scope.$watch('ngModel', function (newVal) {
                if (!newVal) return false;

                $(element).data('datepicker').selectDate(new Date(newVal));
            });

            // init
            scope.$watch(function () {
                return scope.options();
            }, function (newVal) {
                if (!newVal) return false;

                if (newVal.minDate) newVal.minDate = new Date(newVal.minDate);
                if (newVal.maxDate) newVal.maxDate = new Date(newVal.maxDate);

                $(element).data('datepicker').update(angular.extend(defaults, newVal));
            }, true);

            $(element).datepicker(angular.extend(defaults, scope.options()));
        }
    }
})();
