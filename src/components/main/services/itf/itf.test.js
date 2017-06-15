'use strict';
/* beautify preserve:start */
import 'chai';
import {expect} from 'chai';
import ITF from './itf';
/* beautify preserve:end */

describe('ITF service', () => {
  let sut;
  let number;
  beforeEach(() => {
    number = [4, 8, 2, 0];
    sut = new ITF();
  });

  describe('add borders', () => {
    it('should add leading zero if code-length is odd', () => {
      let mockNumber = [0, 4, 8];
      expect(sut.addBorders(mockNumber)).to.deep.equal(['a', 'a', 0, 0, 4, 8, 'a', 'z']);
    });

    it('should add borders', () => {
      expect(sut.addBorders(number)).to.deep.equal(['a', 'a', 4, 8, 2, 0, 'a', 'z']);
    });
  });

  describe('map to letters', () => {
    it('should map to code', () => {
      let mockNumber = ['a', 'a'];
      // 'a' = nn
      expect(sut.mapToCodes(mockNumber)).equal('nnnn');
    });

    it('should map to code', () => {
      let mockNumber = [4, 8];
      // 4 = nnwnw, 8 = wnnwn
      expect(sut.mapToCodes(mockNumber)).equal('nwnnwnnwwn');
    });

    it('should map to code', () => {
      let mockNumber = [4, 7];
      // 4 = nnwnw, 7 = nnnww
      expect(sut.mapToCodes(mockNumber)).equal('nnnnwnnwww');
    });
  });

  describe('mapToSequence', () => {
    it('should change color for narrow bar', () => {
      let codes = 'nnnn';
      expect(sut.mapToSequence(codes)).deep.equal([1, 0, 1, 0]);
    });

    it('should add two digits for wide bar', () => {
      let codes = 'nnwn';
      expect(sut.mapToSequence(codes)).deep.equal([1, 0, 1, 1, 0]);
    });

    it('should add two digits for wide bar', () => {
      let codes = 'wnnnnwn';
      expect(sut.mapToSequence(codes)).deep.equal([1, 1, 0, 1, 0, 1, 0, 0, 1]);
    });
  });

  describe('transformToSequences', () => {
    it('should transform to sequences', () => {
      let mockNumber = [0, 4, 8];
      let result = sut.transformToSequences(mockNumber).join('');
      expect(result).deep.equal('1010101011001100101001011010011010010');
    });
  });

});
