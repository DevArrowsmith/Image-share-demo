async function submitForm(event) {
  event.preventDefault();

  const title = document.getElementById('ftitle').value;
  const file = pond.getFiles()[0].file;
  const comment = document.getElementById('fcomment').value;

  const formData = new FormData();

  formData.append('title', title);
  formData.append('file', file);
  formData.append('comment', comment);

  const response = await fetch(`http://${window.location.host}/posts`, {
      method: 'POST',
      body: formData
  })

  const responseBody = await response.json()

  console.log(responseBody);
}