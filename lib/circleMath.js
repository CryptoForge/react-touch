'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeSectorIdx = exports.createSectors = exports.sectorDistance = undefined;

var _range = require('lodash/range');

var _range2 = _interopRequireDefault(_range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DIRECTIONS = 8;
var RESOLUTION = 128;
var CIRCLE_RADS = Math.PI * 2;
var SECTOR_RADS = CIRCLE_RADS / DIRECTIONS;
var STEP = CIRCLE_RADS / RESOLUTION;

var sectorDistance = exports.sectorDistance = function sectorDistance(a, b) {
  var dist = Math.abs(parseInt(a, 10) - parseInt(b, 10));
  return dist > DIRECTIONS / 2 ? DIRECTIONS - dist : dist;
};

var createSectors = exports.createSectors = function createSectors() {
  return (0, _range2.default)(0, CIRCLE_RADS + STEP, STEP).map(function (angle) {
    return Math.floor(angle / SECTOR_RADS);
  });
};

var computeSectorIdx = exports.computeSectorIdx = function computeSectorIdx(dx, dy) {
  // Our sectors range from vertical to diagonal to horizontal. We want them
  // to range "around" those things. Using the "up" sector as an example,
  // relative to the vertical line representing the up direction we want the
  // sector to range between -1/16th to +1/16th of the circle around that
  // line. We can simplify the math by just adding 1/16th to our given angle.
  var angle = Math.atan2(dy, dx) + SECTOR_RADS / 2;
  if (angle < 0) {
    angle += CIRCLE_RADS;
  }
  // since we're dealing with floating point calculations here, floor
  // anything that comes out of the calculation back to the sectorIdx.
  return Math.floor(angle / CIRCLE_RADS * RESOLUTION);
};