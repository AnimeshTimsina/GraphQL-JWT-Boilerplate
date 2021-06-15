import { accessTokenVar } from "./cache"
import {AES} from 'crypto-js'

const REFRESH_TOKEN_NAME = "rtkn"

export const setRefreshToken = (s: string) => {
  const encrypted = AES.encrypt(s,`${process.env.REACT_APP_ENCRYPTION_KEY}`).toString()
  localStorage.setItem(REFRESH_TOKEN_NAME, encrypted)
}

export const getRefreshToken = () => {
const hashed = localStorage.getItem(REFRESH_TOKEN_NAME)
const bytes = hashed ? AES.decrypt(hashed,`${process.env.REACT_APP_ENCRYPTION_KEY}`) : null
return bytes?.toString(CryptoJS.enc.Utf8) ?? null
}

export const setAccessToken = (s: string | null) => {
  s
    ? accessTokenVar({
        token: s,
      })
    : accessTokenVar(null)
}

export const getAccessToken = () => accessTokenVar()

export const deleteRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_NAME)
}
