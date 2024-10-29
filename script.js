// Verifica se a API de reconhecimento de voz está disponível
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    alert('Seu navegador não suporta a API de Reconhecimento de Voz.');
}

const recognition = new SpeechRecognition();
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const transcriptArea = document.getElementById('transcript');

// Inicia o reconhecimento de voz
startButton.onclick = () => {
    recognition.start();
    startButton.disabled = true;
    stopButton.disabled = false;
};

// Para o reconhecimento de voz
stopButton.onclick = () => {
    recognition.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
};

// Quando a transcrição for realizada
recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript;
    transcriptArea.value += transcript + ' ';
};

// Lida com erros
recognition.onerror = (event) => {
    console.error('Erro de reconhecimento:', event.error);
};
