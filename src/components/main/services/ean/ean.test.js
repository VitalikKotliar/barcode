'use strict';
/* beautify preserve:start */
import 'chai';
import {expect} from 'chai';
import EAN from './ean';
/* beautify preserve:end */

describe('EAN service', () => {
  let sut;

  beforeEach(() => {
    sut = new EAN();
  });

  it('should calculate sum', () => {
    let number = [4, 8, 2, 0, 0, 1, 1, 1, 8, 2, 0, 3];
    expect(sut.calculateSum(number)).to.equal(0);
  });
});
