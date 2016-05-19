import {URLSearchParams} from "@angular/http";

export const objToSearchParams = (obj:any):URLSearchParams => {
  let params = new URLSearchParams();
  for (let k in obj) {
    if (obj[k]) params.append(k, obj[k]);
  }
  return params;
};
