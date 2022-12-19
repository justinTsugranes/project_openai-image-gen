// const { response } = require('express')

function onSubmit(e) {
  e.preventDefault()

  // clear search params
  document.querySelector('.msg').textContent = ''
  document.querySelector('#image').src = ''

  const prompt = document.querySelector('#prompt').value
  const size = document.querySelector('#size').value

  if (prompt === '') {
    alert("Don't forget to enter your prompt!")
    return
  }

  generateImageRequest(prompt, size)
}

async function generateImageRequest(prompt, size) {
  try {
    // call show spinner
    showSpinner()
    // fetch image
    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    })

    // if there is an error, remove the spinner and throw error
    if (!response.ok) {
      removeSpinner()
      throw new Error('That image could not be generated')
    }

    const data = await response.json()
    // console.log(data)
    // capture image url from data
    const imageUrl = data.data
    // set image src to imageurl
    document.querySelector('#image').src = imageUrl

    removeSpinner()
  } catch (error) {
    document.querySelector('.msg').textContent = error
  }
}

// show loading spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show')
}
// remove loading spinner
function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show')
}

// capture form and handle submit
document.querySelector('#image-form').addEventListener('submit', onSubmit)
