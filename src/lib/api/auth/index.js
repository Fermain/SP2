import { token as tokenStore, credits as creditStore, profile as profileStore } from "../../../stores/auth"
import { API_AUTH_LOGIN, API_AUTH_REGISTER } from "../environment";

async function register(name, email, password, avatar = "") {
  if (!name || !email || !password) {
    throw new Error('Missing name, email or password')
  }

  const response = await fetch(API_AUTH_REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      avatar,
      password,
    }),
  })

  if (Number(response.status) === 400) {
    const status = await response.json();
    throw new Error(JSON.stringify(status.errors))
  }

  if (!response.ok) {
    throw new Error('Invalid email or password')
  }

  const { credits, ...profile } = await response.json()
  credits.set(credits)
  profile.set(profile)

  return { credits, ...profile }
}

async function login(email, password) {
  if (!email || !password) {
    throw new Error('Missing email or password')
  }

  const response = await fetch(API_AUTH_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  if (response.status === 400) {
    throw new Error(await response.json())
  }

  if (!response.ok) {
    throw new Error('Invalid email or password')
  }

  const { accessToken, credits, ...profile } = await response.json()
  tokenStore.set(accessToken)
  creditStore.set(credits)
  profileStore.set(profile)

  return { credits, ...profile }
}

async function logout() {
  tokenStore.set(null);
  creditStore.set(null);
  profileStore.set(null);
}

export default {
  login,
  register,
  logout,
}