export function isValid(value) {
  return value.length >= 10
}

export function createModal(title, content) {
  const htmlMod = `
  <hr>
  <h2>${title}</h2>
  ${content}
  <hr>
  `
  const modal = document.getElementById('modal-div')
  modal.innerHTML = htmlMod
}