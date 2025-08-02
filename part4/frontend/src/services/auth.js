export async function loginUser(credentials) {
  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Email or password is incorrect');
  }
  return response.json();
}

export function setAuthCookie(token, stayLoggedIn = false) {
  let cookie = `token=${token}; path=/; SameSite=Lax`;
  if (stayLoggedIn) {
    const maxAge = 60 * 60 * 24 * 7;
    cookie += `; max-age=${maxAge}`;
  }
  document.cookie = cookie;
}

export function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
}

export function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999; path=/';
}
