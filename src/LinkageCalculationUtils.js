/* @flow */

'use strict';

type Point = {x: number; y: number};

function euclid(p1: Point, p2: Point): number {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function calcFromTriangle(
  p1: Point, 
  p2: Point, 
  a1: number, 
  a2: number
): Point {
  var a3 = euclid(p1, p2);
  if (a3 > a1 + a2) {
    throw new Error('lengths of bars less that distance between joints');
  }

  var alpha1 = Math.acos((a1*a1 + a3*a3 - a2*a2)/(2*a1*a3));
  if (!isFinite(alpha1)) {
    throw new Error('bad acos calculation');
  }

  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  if (dx === 0 && dy === 0) {
    throw new Error('enpoints are equal -> unknown angle');
  }
  var theta1 = Math.atan2(dy, dx);

  return {
    x: p1.x + a1 * Math.cos(alpha1 + theta1), 
    y: p1.y + a1 * Math.sin(alpha1 + theta1),
  };
}

function calcFromExtender(
  p1: Point,
  p2: Point, 
  len: number, 
  angle: number
): Point {
  var baseAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  angle += baseAngle;
  return {
    x: p1.x + len * Math.cos(angle),
    y: p1.y + len * Math.sin(angle),
  };
}

module.exports = {euclid, calcFromTriangle, calcFromExtender};