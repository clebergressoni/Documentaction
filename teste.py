import streamlit as st
import speech_recognition as sr

# Função para gravar e transcrever áudio
def transcrever_audio():
    recognizer = sr.Recognizer()
    
    with sr.Microphone() as source:
        st.info("Ajustando ruído ambiente...")
        recognizer.adjust_for_ambient_noise(source)
        st.info("Gravando... Fale algo!")
        
        # Capture o áudio
        audio = recognizer.listen(source)
        st.info("Gravação concluída. Transcrevendo...")
        
        try:
            # Transcrever o áudio para texto usando Google Web Speech API
            texto = recognizer.recognize_google(audio, language='pt-BR')
            return texto
        except sr.UnknownValueError:
            return "Não foi possível entender o áudio."
        except sr.RequestError as e:
            return f"Erro ao se conectar ao serviço de reconhecimento de fala; {e}"

# Interface com Streamlit
st.title("Aplicação de Transcrição de Áudio")

if st.button("Gravar Áudio"):
    transcricao = transcrever_audio()
    st.text_area("Transcrição do Áudio", value=transcricao, height=200)

