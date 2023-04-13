export interface AuthLoginDto {
  email:string,
  password:string
}

export interface AuthRegisterDto {
  email:string,
  password:string,
  name:string
}

export interface ResponseAuth {
  token:string,
  refresh_token:string
}

export interface IsAvailable {
  email:string
}