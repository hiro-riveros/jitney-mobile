angular.module('restmod').factory('RootlessAMSApi', [
  'restmod', 'inflector', function(restmod, inflector) {
    return restmod.mixin({
      $config: {
        style: 'AMS',
        primaryKey: 'id',
        jsonMeta: 'meta',
        jsonLinks: 'links'
      },
      $extend: {
        Model: {
          decodeName: inflector.camelize,
          encodeName: function(_v) {
            return inflector.parameterize(_v, '_');
          },
          encodeUrlName: inflector.parameterize,
          pack: function(_resource, _raw) {
            var name, ret;
            name = this.getProperty('jsonRootSingle') || this.getProperty('jsonRoot') || this.getProperty('name');
            ret = {};
            ret[name] = _raw;
            return ret;
          }
        }
      }
    });
  }
]);
