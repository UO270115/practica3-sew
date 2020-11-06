"use strict";
class CalculadoraBasica{
    // m- te resta de memoria lo que tienes en pantalla
    // m+ te suma ""
    
    constructor(){
        this.resultado = "";
        this.memoria = 0;
    }

    // mrc muestra lo que está guardado en memoria
    mrc(){
        try { 
            this.resultado = this.memoria;
            document.getElementById("resultado").value = this.resultado;
        }
        catch(err) {
            document.getElementById("resultado").value = "Error = " + err;
        }
    }

    mMenos(){
        try { 
            this.memoria -= parseInt(document.getElementById("resultado").value);
            this.resultado = this.memoria;
        }
        catch(err) {
             document.getElementById("resultado").value = "Error = " + err;
        }
    }

    mMas(){
        try { 
            this.memoria += parseInt(document.getElementById("resultado").value);
            this.resultado = this.memoria;
        }
        catch(err) {
             document.getElementById("resultado").value = "Error = " + err;
        }
    }

    dividir(){
        this.resultado += "/";
        document.getElementById("resultado").value = this.resultado;
    }

    digitos(digito){
        this.resultado += digito;
        document.getElementById("resultado").value = this.resultado;
    }

    multiplicación(){
        this.resultado += "*";
        document.getElementById("resultado").value = this.resultado;
    }

    resta(){
        this.resultado += "-";
        document.getElementById("resultado").value = this.resultado;
    }

    suma(){
        this.resultado += "+";
        document.getElementById("resultado").value = this.resultado;
    }

    punto(){
        this.resultado += ".";
        document.getElementById("resultado").value = this.resultado;
    }

    borrar(){
        this.resultado = "";
        document.getElementById("resultado").value = this.resultado;
    }

    igual(){
        try { 
            document.getElementById("resultado").value = eval(this.resultado);
            this.resultado = document.getElementById("resultado").value;
        }
        catch(err) {
             document.getElementById("resultado").value = "Error = " + err;
        }
    }

}
var calculadoraBasica = new CalculadoraBasica();