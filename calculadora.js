'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=numero]');
const operadores = document.querySelectorAll('[id*=operador]');
let novoNumero=true;
let operador;
let numeroAnterior;

const  operacaoPendente = () => operador != undefined;

const calcular = () => {
  if(operacaoPendente()){
    const numeroAtual = parseFloat(display.textContent.replace(',','.'));
    novoNumero = true;
    if(operador == '+'){
      atualizarDisplay(numeroAnterior + numeroAtual);
    }else if (operador == '-') {
      atualizarDisplay(numeroAnterior - numeroAtual);
    }else if (operador == 'x') {
      atualizarDisplay(numeroAnterior * numeroAtual);
    }else if (operador == '÷') {
      atualizarDisplay(numeroAnterior / numeroAtual);
    }
  }
}


const atualizarDisplay = (texto) =>{
  if(novoNumero){
    display.textContent=texto.toLocaleString('BR');
    novoNumero=false
  }else {
    display.textContent+=texto;
  }
}
const inserirNumero=(evento)=> atualizarDisplay(evento.target.textContent);
numeros.forEach( numeros => numeros.addEventListener('click',inserirNumero));


const selecionarOperadores =(evento)=>{
  if(!novoNumero){
    calcular()
    novoNumero=true;
    operador = evento.target.textContent;
    numeroAnterior = parseFloat(display.textContent.replace(',' , '.'));
    console.log(operadores);
  }
}
operadores.forEach( operadores => operadores.addEventListener('click',selecionarOperadores));
const ativarIgual = () =>{
  calcular();
  operador = undefined;

}

const limparDisplay =() => display.textContent = '';

document.getElementById('operadorIgual').addEventListener('click', calcular);
const limparCalculo = () =>{
  limparDisplay();
  operador = undefined;
  novoNumero = true;
  numeroAnterior = undefined;
}
document.getElementById('limpar').addEventListener('click',limparCalculo);

const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor=() => display.textContent.length > 0;
const inserirDecimal=()=>{
  if(!existeDecimal()){
    if(existeValor()){
      atualizarDisplay(',');
    }else {
      atualizarDisplay('0,');
    }
  }
}
document.getElementById('valorPonto').addEventListener('click',inserirDecimal)

const mapaTeclado = {
  '0' : 'numeroZero',
  '1' : 'numeroUm',
  '2' : 'numeroDois',
  '3' : 'numeroTres',
  '4' : 'numeroQuatro',
  '5' : 'numeroCinco',
  '6' : 'numeroSeis',
  '7' : 'numeroSete',
  '8' : 'numeroOito',
  '9' : 'numeroNove',
  '+' : 'operadorAdicao',
  '-' : 'operadorSubtracao',
  '/' : 'operadorDivisao',
  '*' : 'operadorMultiplicacao',
  'Enter' : 'operadorIgual',
  ',' : 'valorPonto',
  'c' : 'limpar'

}

const mapearTeclado = (evento) => {
  const tecla = evento.key;
  const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;
  if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);