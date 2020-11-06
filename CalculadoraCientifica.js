"use strict";
class CalculadoraBasica{

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
class CalculadoraCientifica extends CalculadoraBasica{

    constructor(){
        super();
        this.exp = false;
        this.elevar2 = false;
        this.p = -1;
        this.elevarY = false;
        this.f = 1;
        this.pa = false; // abrir paréntesis
        this.pc = false; // cerrar paréntesis
    }

    exponencial(){
        this.exp = true;
        this.resultado += "Math.exp(";
        this.resultado = eval(this.resultado).toString();
        document.getElementById("resultado").value = this.resultado;
    }

    borrar(){
        if(this.exp | this.elevarY){
            this.resultado += ")";
        }
        document.getElementById("resultado").value = this.resultado;
        this.exp = false;
        this.elevar2 = false;
        super.borrar();
    }

    multiplicación(){
        if(this.exp | this.elevarY){
            this.resultado += ")";
        }
        document.getElementById("resultado").value = this.resultado;
        super.multiplicación();
    }

    resta(){
        if(this.exp | this.elevarY){
            this.resultado += ")";
        }
        document.getElementById("resultado").value = this.resultado;
        super.resta();
    }

    suma(){
        if(this.exp | this.elevarY){
            this.resultado += ")";
        }
        document.getElementById("resultado").value = this.resultado;
        super.suma();
    }

    dividir(){
        if(this.exp | this.elevarY){
            this.resultado += ")";
        }
        document.getElementById("resultado").value = this.resultado;
        super.dividir(); 
    }

    módulo(){
        this.resultado += "%";
        document.getElementById("resultado").value = this.resultado;
    }

    elevarAlCuadrado(){
        this.parsear();
        if(this.p > -1){
            this.elevar2 = true;
            this.resultado += "Math.pow(" + this.p + ",2)";
            this.resultado = eval(this.resultado).toString();
            document.getElementById("resultado").value = this.resultado;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    parsear(){
        var counter = this.resultado.length-1;
        while(counter >= 0){
            if(this.pa & this.pc){
                if(this.resultado.charAt(counter) == "("){
                    break;
                }
                if(counter > 0){
                    counter--;
                }else{
                    break;
                }
            }else if ((this.pa & !this.pc) | (this.pc & !this.pa)){
                document.getElementById("resultado").value = "Error: los paréntesis no están colocados correctamente";
            }else{
                if(!Number.isNaN(parseInt(this.resultado.charAt(counter)))){
                    if(counter >= 0){
                        counter--;
                    }
                }else{
                    break;
                }
            }
        }
        if(this.pa & this.pc){
            this.p = this.resultado.substring(counter, this.resultado.length);
            this.p = eval(this.p).toString();
            this.resultado = this.resultado.substring(0, counter);
            this.pa = false;
            this.pc = false;
        }else{
            if(counter == this.resultado.length-1){
                this.p = this.resultado;
                this.resultado = this.resultado.substring(0, counter);
            }else{
                this.p = this.resultado.substring(counter+1, this.resultado.length);
                this.resultado = this.resultado.substring(0, counter+1);
            }
        }
        document.getElementById("resultado").value = this.resultado;
    }

    elevar(){
        this.parsear();
        if(this.p > -1){
            this.elevarY = true;
            this.resultado += "Math.pow(" + this.p;
            document.getElementById("resultado").value = this.resultado;
        }else{
            document.getElementById("resultado").value = "Error";
        }
    }

    digitos(digito){
        if(this.elevarY){
            this.resultado += ",";
            document.getElementById("resultado").value = this.resultado;
        }
        super.digitos(digito);
    }

    borrar(){
        this.resultado = "";
        super.borrar();
    }

    seno(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.sin(((" + this.p +  " * Math.PI) / 180))";
            this.resultado = eval(this.resultado).toString();
            document.getElementById("resultado").value = this.resultado;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    coseno(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.cos(((" + this.p + " * Math.PI )/ 180))";
            this.resultado = eval(this.resultado).toString();
            document.getElementById("resultado").value = this.resultado;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    tangente(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.tan(((" + this.p + " * Math.PI )/ 180))";
            this.resultado = eval(this.resultado).toString();
            document.getElementById("resultado").value = this.resultado;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    logaritmo(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.log(" + this.p + ")";
            this.resultado = eval(this.resultado).toString();
            document.getElementById("resultado").value = this.resultado;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    diezElevar(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.pow(10," + this.p + ")";
            this.resultado = eval(this.resultado).toString();
            document.getElementById("resultado").value = this.resultado;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    raiz(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.sqrt(" + this.p + ")";
            this.resultado = eval(this.resultado).toString();
            document.getElementById("resultado").value = this.resultado;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    pi(){
        super.digitos("Math.PI");
        
    }

    factorial(){
        this.parsear();
        if(this.p > -1){
            this.fact(this.p);
            this.resultado += this.f;
            document.getElementById("resultado").value = this.resultado;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.f = 1;
        this.p = -1;
    }

    fact(numero){
        var i = 1;
        while(i <= numero)
        {
            this.f *= i;
            i++;
        }
    }

    valorAbsoluto(){
        this.resultado = "Math.abs(" + this.resultado + ")";
        document.getElementById("resultado").value = this.resultado;
    }

    abrirParéntesis(){
        this.pa = true;
        this.resultado += "(";
        document.getElementById("resultado").value = this.resultado;
    }

    cerrarParéntesis(){
        this.pc = true;
        this.resultado += ")";
        document.getElementById("resultado").value = this.resultado;
    }

    igual(){
        try { 
            if(this.exp | this.elevarY | (this.pa & !this.pc)){
                this.resultado += ")";
                this.display += ")";
                document.getElementById("resultado").value = this.resultado;
            }
            document.getElementById("resultado").value = eval(this.resultado).toString();
            this.resultado = document.getElementById("resultado").value;
        }
        catch(err) {
             document.getElementById("resultado").value = "Error = " + err;
        }
        this.exp = false;
        this.elevar2 = false;
        this.elevarY = false;
        this.pa = false;
        this.pc = false;
    }

}
var calculadoraCientifica = new CalculadoraCientifica();