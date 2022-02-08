const newFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const body = document.querySelector('#text-content').value;

  await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);
