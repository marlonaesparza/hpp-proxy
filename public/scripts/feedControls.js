const addPostBtn = document.getElementById('add-post-button');
const cancelPostBtn = document.getElementById('cancel-post-button');
const postFormBox = document.getElementById('post-form-box');
const postForm = document.getElementById('post-form');
const feedView = document.getElementById('feed-view');

addPostBtn.addEventListener('click', (e) => {
  e.preventDefault();
  feedView.classList.add('hidden');
  postFormBox.classList.remove('hidden');
  addPostBtn.classList.add('hidden');
  cancelPostBtn.classList.remove('hidden');
});

cancelPostBtn.addEventListener('click', (e) => {
  e.preventDefault();
  postFormBox.classList.add('hidden');
  feedView.classList.remove('hidden');
  cancelPostBtn.classList.add('hidden');
  addPostBtn.classList.remove('hidden');
  postForm.reset()
});
