const bodyColor = document.body
const btnPlayPause=document.getElementById("play-pause")
const faixa=document.getElementById("audio-capitulo")
const btnAnterior=document.getElementById("anterior")
const btnProximo=document.getElementById("proximo")
const capitulo=document.getElementById("capitulo")
const fotoFaixa=document.querySelector(".foto-album")
const numeroFaixas=10;
let faixaAtual=1;
let tocando=false;
let intervaloGradiente=null;

function tocarOuPausar() {
    mudarGradiente()
    if (!tocando) {
        tocando=true        
        tocar()        
    }else{
        tocando=false    
        pausar()  
    }    
}

function tocar() {
    faixa.play()
    btnPlayPause.classList.remove("bi-play-circle-fill")
    btnPlayPause.classList.add("bi-pause-circle-fill")
}

function pausar() {
    clearInterval(intervaloGradiente)
    intervaloGradiente = null
    faixa.pause()
    btnPlayPause.classList.remove("bi-pause-circle-fill")
    btnPlayPause.classList.add("bi-play-circle-fill")

}

function carregarFaixaAtual() {
    faixa.pause()
    faixa.src = `./books/dom-casmurro/${faixaAtual}.mp3`
    tocando = true
    tocar()
}

function avancar() {    
    if(faixaAtual < numeroFaixas) {
        faixaAtual=faixaAtual+1
    }else{ 
        faixaAtual=1
    }    
    fotoFaixa.src= `./imagens/dom-casmurro${faixaAtual}.jpeg`
    fotoFaixa.style.maxWidth = "300px"
    capitulo.innerText=`Capítulo ${faixaAtual}` 
    carregarFaixaAtual()
}


function retroceder() {    
    if(faixaAtual >= 2) {
        faixaAtual=faixaAtual-1        
    }else{   
        faixaAtual=1
    }   
    fotoFaixa.src=`./imagens/dom-casmurro${faixaAtual}.jpeg`
    fotoFaixa.style.maxWidth="300px"
    capitulo.innerText=`Capítulo ${faixaAtual}` 
    carregarFaixaAtual()
}

function mudarGradiente() {
    const gradiente = getComputedStyle(bodyColor).backgroundImage  
    const cores = gradiente.match(/#[\da-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi) || []
    if (cores.length < 2 || intervaloGradiente !== null) return

    const paraRgb = cor => {
        const elemento = document.createElement("span")
        elemento.style.color = cor
        document.body.appendChild(elemento)
        const canais = getComputedStyle(elemento).color.match(/[\d.]+/g).slice(0, 3).map(Number)
        elemento.remove()
        return canais
    }

    const [cor1, cor2] = cores.slice(0, 2).map(paraRgb)
    let progresso = 0
    let direcao = 1
   

    intervaloGradiente = setInterval(() => {
        progresso += 0.07 * direcao
        if (progresso >= 1 || progresso <= 0) {
            progresso = Math.max(0, Math.min(1, progresso))
            direcao *= -1
        }

        const interpolar = (origem, destino) => origem.map((canal, indice) =>
            Math.round(canal + (destino[indice] - canal) * progresso)
        )
        const rgb1 = interpolar(cor1, cor2)
        const rgb2 = interpolar(cor2, cor1)
        bodyColor.style.backgroundImage = `${direcao>0?"linear":"radial"}-gradient(rgb(${rgb1.join(",")}), rgb(${rgb2.join(",")}))`
    }, 100)
}


btnPlayPause.addEventListener("click",tocarOuPausar)
btnAnterior.addEventListener("click",retroceder)
btnProximo.addEventListener("click",avancar)



