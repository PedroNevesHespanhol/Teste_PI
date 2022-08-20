const button = document.querySelector('button')
const text = document.querySelector('.text')

const recognition = createRecognition()
let listening = false;

button.addEventListener('click', e => {
    if(!recognition) return;

    listening ? recognition.stop() : recognition.start()

    button.innerHTML = listening ? 'Aperta para falar' : 'Parar de escutar'

    button.classList.toggle('bg-purple-200')
    button.classList.toggle('text-red')

})

function createRecognition() {
    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition // "||" = ou, caso nao tenha
    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null //":" = senao

    if(!recognition) {
        text.innerHTML = "Speech Recognition is not found!"
        return null
    }

    recognition.lang = "pt_BR"

    recognition.onstart = () => listening = true
    recognition.onend = () => listening = false
    recognition.onerror = e => console.log('error', e)
    recognition.onresult = e => text.innerHTML = e.results[0][0].transcript

    return recognition
}
