var assert = require('assert')
var td = require('testdouble')
var getAttributes = td.replace('../../lib/get-attributes')
var getRelationships = td.replace('../../lib/get-relationships')
var getType = td.replace('../../lib/get-type')
var serialize = require('../../lib/serialize')
var SPEC = {}

module.exports = {
  'serialize': function () {
    var original = { id: 777 }
    var attrs = {}
    var rels = {}

    td.when(getType(SPEC, 'Widget')).thenReturn('widgets')
    td.when(getAttributes(SPEC, 'Widget', original)).thenReturn(attrs)
    td.when(getRelationships(SPEC, 'Widget', original)).thenReturn(rels)

    var subject = serialize(SPEC, 'Widget', original)

    assert.deepEqual(subject, {
      data: {
        type: 'widgets',
        id: '777',
        attributes: attrs,
        relationships: rels,
      }
    })
  },
}
