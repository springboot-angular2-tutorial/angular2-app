export interface Micropost {
  id:number
  content:string
  user:User
  createdAt:number
}

export interface User {
  id:string|number
  email:string
  name?:string
  userStats?:UserStats
}

export interface RelatedUser extends User {
  relationshipId:number;
}

export interface UserStats {
  micropostCnt:number
  followingCnt:number
  followerCnt:number
}

export interface Page<T> {
  content:T[]
  totalPages:number
  totalElements:number
}

export interface PageRequest {
  page:number;
  size:number;
}

export interface UserParams {
  email?:string
  password?:string
  name?:string
}
