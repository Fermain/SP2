import { writable } from 'svelte/store'

export const token = writable(JSON.parse(localStorage.getItem('token')))
token.subscribe((value) => localStorage.token = JSON.stringify(value))

export const profile = writable(JSON.parse(localStorage.getItem('profile')))
profile.subscribe((value) => localStorage.profile = JSON.stringify(value))

export const credits = writable(JSON.parse(localStorage.getItem('credits')))
credits.subscribe((value) => localStorage.credits = JSON.stringify(value))