/**
 * API Bound Models for AngularJS
 * @version v1.1.9 - 2015-05-07
 * @link https://github.com/angular-platanus/restmod
 * @author Ignacio Baixas <ignacio@platan.us>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';
/**
 * @mixin DebouncedModel
 *
 * @description Adds debouncing to `$save` operations so rapid consecutive calls result in only one server request.
 *
 * Usage:
 *
 * First add mixin to a model's mixin chain, the following config variables are available:
 * * DM_TIMEOUT: sets the debounce timeout, if 0 then debouncing is deactivated. Defaults to 500
 * * DM_ADJOURN: if true, then save operation is rescheduled on every $save call. Default to false
 *
 * ```javascript
 * var Bike = restmod.model('api/bikes', 'DebouncedModel', {
 *       // This is optional.
 *       DM_TIMEOUT: 100 // change timeout!
 *     }),
 *     bike = Bike.build({ id: 1, brand: 'Yeti' });
 * ```
 *
 * Then use `$save` as always
 *
 * ```javascript
 * // The following code will just generate 1 request
 * bike.$save();
 * bike.$save();
 * bike.$save();
 * ```
 *
 * Or with options
 *
 * ```javascript
 * bike.$save({ timeout: 0, adjourn: false });
 * // same as
 * bike.$saveNow();
 * ```
 *
 */

var isObject = angular.isObject;

angular.module('restmod').factory('DebouncedModel', ['restmod', '$timeout', '$q', function(restmod, $timeout, $q) {

  // builds a new async save function bound to a given context and promise.
  function buildAsyncSaveFun(_this, _oldSave, _promise, _oldPromise) {
    return function() {

      // swap promises so save behaves like it has been called during the original call.
      var currentPromise = _this.$promise;
      _this.$promise = _oldPromise;

      // when save resolves, the timeout promise is resolved and the last resource promise returned
      // so it behaves
      _oldSave.call(_this).$promise.then(
        function(_data) {
          _promise.resolve(_data);
          _this.$promise = currentPromise;
        }, function(_reason) {
          _promise.reject(_reason);
          _this.$promise = currentPromise;
        }
      );

      _this.$dmStatus = null;
    };
  }

  return restmod.mixin(function() {
    this.setProperty('dmTimeout', 500)
        .setProperty('dmAdjourn', true)

        /**
         * @method $save
         * @memberOf DebouncedModel
         *
         * @description Debounced `$save` implementation
         *
         * IDEA: think of a way of separating the scheduling-rescheduling logic from
         * the async save implementation, this way it can be used for other actions.
         * Something like:
         *
         *    this.$debounce('$save', fun, timeout, adjourn);
         *
         * This would call fun with a promise in the model context.
         *
         * @param {object} _opt Same as `setDebounceOptions` options.
         * @return {Model} self
         */
        .define('$save', function(_opt) {

          var timeout = this.$type.getProperty('dmTimeout'),
              adjourn = this.$type.getProperty('dmAdjourn'),
              status = this.$dmStatus;

          // apply configuration overrides
          if(_opt !== undefined) {
            if(isObject(_opt)) {
              if(_opt.timeout !== undefined) timeout = _opt.timeout;
              if(_opt.adjourn !== undefined) adjourn = _opt.adjourn;
            }
          }

          if(!status) {

            // if timeout is set to 0, then just call save inmediatelly.
            if(!timeout) return this.$super();

            var deferred = $q.defer(),
                asyncSave = buildAsyncSaveFun(this, this.$super, deferred, this.$promise);

            this.$dmStatus = {
              save: asyncSave,
              promise: deferred.promise,
              timeout: $timeout(asyncSave, timeout)
            };

            this.$promise = deferred.promise;

          } else {

            // reschedule only if adjourn hasnt been deactivated.
            if(adjourn) {
              $timeout.cancel(status.timeout);

              // depending on timeout schedule or save inmediatelly.
              if(timeout) {
                status.timeout = $timeout(status.save, timeout);
              } else {
                status.save();
              }
            }

            // keep the last promise.
            this.$promise = status.promise;
          }

          return this;
        })

        /**
         * @method $saveNow
         * @memberOf DebouncedModel
         *
         * @description Convenience method that will cancel any pending save and save inmediatelly.
         *
         * @return {Model} self
         */
        .define('$saveNow', function() {
          return this.$save({ timeout: 0, adjourn: true });
        });
  });
}]);})(angular);