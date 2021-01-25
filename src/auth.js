export function getAuthFrom() {
  return `
  <form action="" class="" id="auth-form">
    <div>
      <input
        type="email"
        class=""
        id="email"
        required
      >
      <label for="email">Email</label>
    </div>
    <div>
      <input
        type="password"
        class=""
        id="password"
        required
      >
      <label for="password">Password</label>
    </div>
    <button
      type="submit"
      class=""
    >
      Submit
    </button>
  </form>
  `
}

export function authWithEmailAndPassword(email, password) {
  const apiKey = 'AIzaSyAr7YmtJXZgJPM7xJ_CrDX5W3uloOLpJUA'
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({
      email, password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => data.idToken)
}