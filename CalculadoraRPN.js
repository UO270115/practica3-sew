"use strict";
class Pila { 
    constructor (){ 
        this.pila = new Array();
    }
    push(valor){
        this.pila.push(valor);
    }
    pop(){
        return (this.pila.pop());
    }
    show(){
        var stringPila = "";
        for (var i = this.pila.length - 1 ; i >= 0; i--){ 
            stringPila += "<p>" + i + ": " +  this.pila[i] + "</p>";
        } 
        document.getElementById("stack").innerHTML = stringPila;
    }
}
class CalculadoraRPN{

    constructor(){
        this.pila = new Pila();
        this.puntoCalcado = false;
    }

    dividir(){
        var digit2 = this.pila.pop();
        var digit1 = this.pila.pop();
        var result = digit1 / digit2;
        this.pila.push(result);
        this.pila.show();
    }

    digitos(digito){
        if(this.puntoCalcado){
            document.getElementById("resultado").value += digito;
            this.pila.pop();
        }else{
            this.pila.push(digito);
            document.getElementById("resultado").value = digito;
        }
    }

    multiplicación(){
        var digit2 = this.pila.pop();
        var digit1 = this.pila.pop();
        var result = digit1 * digit2;
        this.pila.push(result);
        this.pila.show();
    }

    resta(){
        var digit2 = this.pila.pop();
        var digit1 = this.pila.pop();
        var result = digit1 - digit2;
        this.pila.push(result);
        this.pila.show();
    }

    suma(){
        var digit2 = this.pila.pop();
        var digit1 = this.pila.pop();
        var result = digit1 + digit2;
        this.pila.push(result);
        this.pila.show();
    }

    punto(){
        this.puntoCalcado = true;
        document.getElementById("resultado").value += ".";
    }

    borrar(){
        document.getElementById("resultado").value = "";
        this.pila = new Pila();
        this.pila.show();
    }

    exponencial(){
        var digit1 = this.pila.pop();
        var result = Math.exp(digit1);
        this.pila.push(result);
        this.pila.show();
    }

    enter(){
        if(this.puntoCalcado){
            this.puntoCalcado = false;
            this.pila.push(document.getElementById("resultado").value);
        }
        this.pila.show();
    }

    módulo(){
        var digit2 = this.pila.pop();
        var digit1 = this.pila.pop();
        var result = digit1 % digit2;
        this.pila.push(result);
        this.pila.show();
    }

    elevarAlCuadrado(){
        var digit1 = this.pila.pop();
        var result = Math.pow(digit1, 2);
        this.pila.push(result);
        this.pila.show();
    }

    elevar(){
        var digit2 = this.pila.pop();
        var digit1 = this.pila.pop();
        var result = Math.pow(digit1,digit2);
        this.pila.push(result);
        this.pila.show();
    }

    seno(){
        var result = Math.sin(this.pila.pop());
        this.pila.push(result);
        this.pila.show();
    }

    coseno(){
        var result = Math.cos(this.pila.pop());
        this.pila.push(result);
        this.pila.show();
    }

    tangente(){
        var result = Math.tan(this.pila.pop());
        this.pila.push(result);
        this.pila.show();
    }

    logaritmo(){
        var result = Math.log(this.pila.pop());
        this.pila.push(result);
        this.pila.show();
    }

    diezElevar(){
        var digit1 = this.pila.pop();
        var result = Math.pow(10,digit1);
        this.pila.push(result);
        this.pila.show();
    }

    raiz(){
        var result = Math.sqrt(this.pila.pop());
        this.pila.push(result);
        this.pila.show();
    }

    pi(){
        this.digitos(Math.PI);
    }

    e(){
        this.digitos(Math.E);
    }

    factorial(){
        var result = this.fact(this.pila.pop());
        this.pila.push(result);
        this.pila.show();
    }

    fact(numero){
        var f = 1;
        var i = 1;
        while(i <= numero)
        {
            f *= i;
            i++;
        }
        return f;
    }

    valorAbsoluto(){
        var result = Math.abs(this.pila.pop());
        this.pila.push(result);
        this.pila.show();
    }

    aseno(){
        var result = Math.asin(this.pila.pop());
        this.pila.push(result);
        this.pila.show();
    }

    acoseno(){
        var result = Math.acos(this.pila.pop());
        this.pila.push(result);
        this.pila.show();
    }

    atangente(){
        var result = Math.atan(this.pila.pop());
        this.pila.push(result);
        this.pila.show();
    }

    ln(){
        var result = 1/Math.log(this.pila.pop());
        this.pila.push(result);
        this.pila.show();
    }
}
var calculadoraRPN = new CalculadoraRPN();