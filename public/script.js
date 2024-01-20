let socket = io()

document.getElementById('uploadForm').addEventListener('submit',(e)=>{
    e.preventDefault()

    const formData = new FormData(e.target)
    console.log(formData)
    const progressBar = document.getElementById('progressBar')
    const progressText = document.getElementById('progressText')

    console.log('start....')
    fetch('/convert',{
        method: 'POST',
        body: formData
    }).then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
})