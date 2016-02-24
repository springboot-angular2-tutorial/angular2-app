import {beforeEach, expect, describe, it} from "angular2/testing";
import {TimeAgoPipe} from "app/pipes";

describe('TimeAgoPipe', () => {

  var pipe:TimeAgoPipe;

  beforeEach(() => {
    pipe = new TimeAgoPipe();
    jasmine.clock().mockDate(new Date(2014, 10, 4));
  });

  it('shows a text for time ago', () => {
    expect(pipe.transform(new Date(2014, 10, 3))).toEqual('1 day ago');
  });

});
