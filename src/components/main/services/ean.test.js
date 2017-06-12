'use strict';
/* beautify preserve:start */
import 'chai';
import {expect} from 'chai';
import EAN from './ean';
/* beautify preserve:end */

describe.only('EAN service', () => {
  let sut;

  beforeEach(() => {
     sut = new EAN();
  });

  it('should separate first digit', () => {
    let number = [4, 8, 2, 0, 0, 1, 1, 1, 8, 2, 0, 3];
    expect(sut.separateNumber(number).key).to.equal(4);
  });
});
