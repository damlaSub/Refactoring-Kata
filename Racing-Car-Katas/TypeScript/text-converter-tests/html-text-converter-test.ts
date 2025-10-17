import { expect } from 'chai';
import sinon from 'sinon';
import 'mocha';
import HtmlTextConverter from '../text-converter/html-text-converter';
import fs from 'fs';

describe('HtmlTextConverter', () => {

  let readFileSyncStub: sinon.SinonStub;

  beforeEach(() => {
    readFileSyncStub = sinon.stub(fs, 'readFileSync');
  });

  afterEach(() => {
    readFileSyncStub.restore();
  });

  it('should convert plain text without special characters', () => {
    readFileSyncStub.returns('Hello World');
    const converter = new HtmlTextConverter('dummy.txt');

    const result = converter.convertToHtml();

    expect(result).to.equal('Hello World');
  });

  it('should convert <, >, & characters to HTML entities', () => {
    readFileSyncStub.returns('< & >');
    const converter = new HtmlTextConverter('dummy.txt');

    const result = converter.convertToHtml();

    expect(result).to.equal('&lt; &amp; &gt;');
  });

  it('should convert newlines to <br />', () => {
    readFileSyncStub.returns('Line1\nLine2\nLine3');
    const converter = new HtmlTextConverter('dummy.txt');

    const result = converter.convertToHtml();

    expect(result).to.equal('Line1<br />Line2<br />Line3');
  });

  it('getFilename should return the original filename', () => {
    const converter = new HtmlTextConverter('myfile.txt');
    expect(converter.getFilename()).to.equal('myfile.txt');
  });

});
