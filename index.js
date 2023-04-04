const inputPergunta = document.getElementById("pergunta")
const inputResposta = document.getElementById("resposta")
const OPEN_API_KEY = ""

inputPergunta.addEventListener("keypress", (e) => {
    if(inputPergunta.value && e.key === "Enter"){
        buscaPergunta();
    }
})

function limpaChat(){
    inputPergunta.value = '';
    inputResposta.value = '';
}

function buscaPergunta(){
    
    let sPergunta = inputPergunta.value;

    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPEN_API_KEY,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: sPergunta,
            max_tokens: 3500,
            temperature: 0.5,
        })
    })
    .then((inputResposta) => inputResposta.json())
    .then((json) => {

        inputPergunta.value = "Carregando..."
        inputPergunta.disabled = true;

        if(inputResposta.value) inputResposta.value += "\n"

        if(json.error?.message){
            inputResposta.value += `Error: ${json.error.mesage}`
        }else if(json.choices?.[0].text) {
            var text = json.choices[0].text || "Sem Resposta";
            inputResposta.value += `ChatGpt: ${text}`;
        }
        inputResposta.scrollTop = inputResposta.scrollHeight;
    })
    .catch((error) => console.error("Error:",error))
    .finally(() => {
        inputPergunta.value = "";
        inputPergunta.disabled = false;
        inputPergunta.focus();
    })

    if(inputResposta.value) inputResposta.value += "\n";
    inputResposta.value += `Eu: ${sPergunta}`

    inputResposta.scrollTop = inputResposta.scrollHeight;
}