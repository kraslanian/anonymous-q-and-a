document.addEventListener('DOMContentLoaded', main);

function main() {
  fetchData();
  setEventListeners();
}

function setEventListeners() {
  const askQuestionButton = document.querySelector('#btn-show-modal-question');
  askQuestionButton.addEventListener('click', openQuestionModal);

  const modalCloseButtons = document.querySelectorAll('.close-modal');
  modalCloseButtons.forEach(button => button.addEventListener('click', closeModal));
}

function openQuestionModal() {
  const questionModal = document.getElementById('modal-question');
  questionModal.style.display = 'block';

  const closeBtn = document.getElementById('close_question');
  closeBtn.addEventListener('click', closeModal);

  const askButton = document.getElementById('create-question');
  askButton.addEventListener('click', handleQuestionSubmission);
}

function openAnswerModal(objectId) {
  const answerModal = document.getElementById('modal-answer');
  answerModal.style.display = 'block';

  const closeBtn = document.getElementById('close_answer');
  closeBtn.addEventListener('click', closeModal);

  const submitButton = document.getElementById('create-answer');
  submitButton.addEventListener('click', () => {
    const newAnswer = document.getElementById('answer-text').value;
    postNewAnswer(objectId, newAnswer);
  });
}

function closeModal() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => (modal.style.display = 'none'));
}

function handleQuestionSubmission() {
  const questionText = document.getElementById('question-text').value;
  postNewQuestion(questionText);
}

function postNewQuestion(newQuestion) {
  closeModal();
  const data = { question: newQuestion };
  const jsonData = JSON.stringify(data);
  const postApiUrl = 'http://localhost:3000/questions/';

  fetchAndReload(postApiUrl, jsonData);
}

function postNewAnswer(objectId, newAnswer) {
  closeModal();
  const data = { id: objectId, answer: newAnswer };
  const jsonData = JSON.stringify(data);
  const postAnswerUrl = `http://localhost:3000/questions/${objectId}/answers/`;

  fetchAndReload(postAnswerUrl, jsonData);
}

function fetchAndReload(url, data) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => window.location.reload())
    .catch(error => console.error('Error:', error));
}

function fetchData() {
  const apiUrl = 'http://localhost:3000/questions';
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => renderQuestionsAndAnswers(data))
    .catch(error => console.error('Error:', error));
}

function renderQuestionsAndAnswers(data) {
  const qandaContainer = document.createElement('div');
  qandaContainer.className = 'qanda-container';

  data.forEach(item => {
    const { _id, question, answers } = item;
    const questionElement = createQuestionElement(question);
    const answerElements = createAnswerElements(answers);
    const submitBtnContainer = createSubmitBtnContainer(_id);
    const questionContainer = createQuestionContainer(questionElement, answerElements, submitBtnContainer);
    qandaContainer.appendChild(questionContainer);
  });

  document.body.appendChild(qandaContainer);
}

function createQuestionElement(text) {
  const questionElement = document.createElement('h2');
  questionElement.className = 'question';
  questionElement.textContent = text;
  return questionElement;
}

function createAnswerElements(answers) {
  return answers.map(answer => {
    const answerElement = document.createElement('p');
    answerElement.className = 'answer';
    answerElement.textContent = answer;
    return answerElement;
  });
}

function createSubmitBtnContainer(objectId) {
  const submitBtnContainer = document.createElement('div');
  submitBtnContainer.className = 'submit-btn-container';

  const submitButton = createButton('Submit Another Answer', 'submit-button', () => {
    const objectIdValue = submitButton.nextSibling.textContent;
    openAnswerModal(objectIdValue);
  });

  submitBtnContainer.appendChild(submitButton);

  const objectIdElement = document.createElement('div');
  objectIdElement.textContent = objectId;
  objectIdElement.style.display = 'none';

  submitBtnContainer.appendChild(objectIdElement);

  return submitBtnContainer;
}

function createQuestionContainer(questionElement, answerElements, submitBtnContainer) {
  const questionContainer = document.createElement('div');
  questionContainer.className = 'question-container';
  questionContainer.appendChild(questionElement);

  answerElements.forEach(answerElement => questionContainer.appendChild(answerElement));

  questionContainer.appendChild(submitBtnContainer);
  return questionContainer;
}

function createButton(text, className, clickHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = className;
  button.addEventListener('click', clickHandler);
  return button;
}
