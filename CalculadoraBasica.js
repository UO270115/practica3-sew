"use strict";
class CalculadoraBasica{
    
    constructor(){
        this.resultado = "";
        this.mostrar = "";
        this.memoria = 0;
    }

    // mrc muestra lo que está guardado en memoria
    mrc(){
        try { 
            this.resultado = this.memoria;
            this.mostrar = this.resultado;
            document.getElementById("resultado").value = this.mostrar;
        }
        catch(err) {
            document.getElementById("resultado").value = "Error = " + err;
        }
    }

    // m- te resta de memoria lo que tienes en pantalla
    // m+ te suma ""
    mMenos(){
        try { 
            this.memoria -= parseInt(document.getElementById("resultado").value);
            this.resultado = this.memoria;
            this.mostrar = this.resultado;
        }
        catch(err) {
             document.getElementById("resultado").value = "Error = " + err;
        }
    }

    mMas(){
        try { 
            this.memoria += parseInt(document.getElementById("resultado").value);
            this.resultado = this.memoria;
            this.mostrar = this.resultado;
        }
        catch(err) {
             document.getElementById("resultado").value = "Error = " + err;
        }
    }

    dividir(){
        this.resultado += "/";
        this.mostrar += "/";
        document.getElementById("resultado").value = this.mostrar;
    }

    digitos(digito){
        this.resultado += digito;
        this.mostrar += digito;
        document.getElementById("resultado").value = this.mostrar;
    }

    multiplicación(){
        this.resultado += "*";
        this.mostrar += "*";
        document.getElementById("resultado").value = this.mostrar;
    }

    resta(){
        this.resultado += "-";
        this.mostrar += "-";
        document.getElementById("resultado").value = this.mostrar;
    }

    suma(){
        this.resultado += "+";
        this.mostrar += "+";
        document.getElementById("resultado").value = this.mostrar;
    }

    punto(){
        this.resultado += ".";
        this.memoria += ".";
        document.getElementById("resultado").value = this.mostar;
    }

    borrar(){
        this.resultado = "";
        this.mostrar = "";
        document.getElementById("resultado").value = this.mostrar;
    }

    igual(){
        try { 
            this.mostrar = eval(this.resultado);
            document.getElementById("resultado").value = this.mostrar
            this.resultado = this.mostrar;
        }
        catch(err) {
             document.getElementById("resultado").value = "Error = " + err;
        }
    }

}
var calculadoraBasica = new CalculadoraBasica();