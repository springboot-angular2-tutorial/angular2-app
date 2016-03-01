import {beforeEach} from "angular2/testing";
import {PluralizePipe} from "app/pipes";

describe('PluralizePipe', () => {

  var pipe:PluralizePipe;

  beforeEach(() => {
    pipe = new PluralizePipe();
  });

  it('pluralize a word', () => {
    expect(pipe.transform(1, ['mouse'])).toEqual('1 mouse');
    expect(pipe.transform(2, ['mouse'])).toEqual('2 mice');
  });

});
