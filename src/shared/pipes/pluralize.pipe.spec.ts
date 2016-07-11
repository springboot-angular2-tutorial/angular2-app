import {PluralizePipe} from "./pluralize.pipe";

describe('PluralizePipe', () => {

  let pipe:PluralizePipe;

  beforeEach(() => {
    pipe = new PluralizePipe();
  });

  it('pluralize a word', () => {
    expect(pipe.transform(1, 'mouse')).toEqual('1 mouse');
    expect(pipe.transform(2, 'mouse')).toEqual('2 mice');
  });

});
