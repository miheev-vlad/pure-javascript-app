export class Question {
  static create(question) {
    return fetch('https://pure-javascript-app-9af93-default-rtdb.firebaseio.com/question.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      question.id = response.name
      return question
    })
    .then(addToLocalStorage)
    .then(Question.renderList)
  }
  static renderList() {
    const questions = getQuestionFromLocalStorage()
    const html = questions.length
      ? questions.map(toCard).join('')
      : `<div>You haven't asked anything yet</div>`
    const list = document.getElementById('list')
    list.innerHTML = html
  }
  static fetch(token) {
    if (!token) {
      return Promise.resolve('<p>Unauthorized</p>')
    }
    return fetch(`https://pure-javascript-app-9af93-default-rtdb.firebaseio.com/question.json?auth=${token}`)
      .then(response => response.json())
      .then(response => {
        if (response && response.error) {
          return `<p>${response.error}</p>`
        }
        return response ? Object.keys(response).map(key => ({
          ...response[key],
          id: key
        })) : []
      })
  }
  static listToHTML(questions) {
    return questions.length
      ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
      : '<p>No questions</p>'
  }
}

function addToLocalStorage(question) {
  const all = getQuestionFromLocalStorage()
  all.push(question)
  localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionFromLocalStorage() {
  return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
  return `
    <div>
      ${new Date(question.date).toLocaleDateString()}
      ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>${question.text}</div>
  `
}