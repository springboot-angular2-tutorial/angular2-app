import {URLSearchParams} from 'angular2/http';

export const objToSearchParams = (obj:any):URLSearchParams => {
  let params = new URLSearchParams();
  for (let k in obj) {
    params.append(k, obj[k])
  }
  return params;
};
