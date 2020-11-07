"use strict";
class CalculadoraBasica{

    constructor(){
        this.resultado = "";
        this.mostrar = "";
        this.memoria = 0;
        this.numeroPi = false;
        this.numeroE = false;
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
        if(this.numeroPi){
            this.mostrar += "π";
        }else if(this.numeroE){
            this.mostrar += "e";
        }else{
            this.mostrar += digito;
        }
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
        this.mostrar += ".";
        document.getElementById("resultado").value = this.mostrar;
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
class CalculadoraCientifica extends CalculadoraBasica{

    constructor(){
        super();
        this.exp = false;
        this.p = -1;
        this.elevarY = false;
        this.f = 1;
        this.pa = false; // abrir paréntesis
        this.pc = false; // cerrar paréntesis
    }

    exponencial(){
        this.exp = true;
        this.resultado += "Math.exp(";
        //this.resultado = eval(this.resultado).toString();
        this.mostrar += "e^"
        document.getElementById("resultado").value = this.mostrar;
    }

    check(){
        if(this.exp | this.elevarY){
            this.resultado += ")";
            this.mostrar += ")";
        }
        document.getElementById("resultado").value = this.mostrar;
        this.exp = false;
        this.elevarY = false;
    }

    borrar(){
        this.check();
        super.borrar();
    }

    multiplicación(){
        this.check();
        super.multiplicación();
    }

    resta(){
        this.check();
        super.resta();
    }

    suma(){
        this.check();
        super.suma();
    }

    dividir(){
        this.check();
        super.dividir(); 
    }

    módulo(){
        this.check();
        this.resultado += "%";
        this.mostrar += "%";
        document.getElementById("resultado").value = this.mostrar;
    }

    elevarAlCuadrado(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.pow(" + this.p + ",2)";
            //this.resultado = eval(this.resultado);
            this.mostrar += this.p + "^2";
            document.getElementById("resultado").value = this.mostrar;
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
        // !
        this.mostrar = this.resultado;
        document.getElementById("resultado").value = this.mostrar;
    }

    elevar(){
        this.parsear();
        if(this.p > -1){
            this.elevarY = true;
            this.resultado += "Math.pow(" + this.p;
            this.mostrar += this.p + "^";
            document.getElementById("resultado").value = this.mostrar;
        }else{
            document.getElementById("resultado").value = "Error";
        }
    }

    digitos(digito){
        if(this.elevarY){
            this.resultado += ",";
            this.mostrar += ",";
            document.getElementById("resultado").value = this.mostrar;
        }
        super.digitos(digito);
    }

    seno(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.sin(((" + this.p +  " * Math.PI) / 180))";
            //this.resultado = eval(this.resultado);
            this.mostrar += "sin(" + this.p + ")";
            document.getElementById("resultado").value = this.mostrar;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    aseno(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.asin(((" + this.p +  " * Math.PI) / 180))";
            //this.resultado = eval(this.resultado);
            this.mostrar += "asin(" + this.p + ")";
            document.getElementById("resultado").value = this.mostrar;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    coseno(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.cos(((" + this.p + " * Math.PI )/ 180))";
            //this.resultado = eval(this.resultado);
            this.mostrar += "cos(" + this.p + ")";
            document.getElementById("resultado").value = this.mostrar;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    acoseno(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.acos(((" + this.p + " * Math.PI )/ 180))";
            //this.resultado = eval(this.resultado);
            this.mostrar += "acos(" + this.p + ")";
            document.getElementById("resultado").value = this.mostrar;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    tangente(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.tan(((" + this.p + " * Math.PI )/ 180))";
            //this.resultado = eval(this.resultado);
            this.mostrar += "tan(" + this.p + ")";
            document.getElementById("resultado").value = this.mostrar;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    atangente(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.atan(((" + this.p + " * Math.PI )/ 180))";
            //this.resultado = eval(this.resultado);
            this.mostrar += "atan(" + this.p + ")";
            document.getElementById("resultado").value = this.mostrar;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    logaritmo(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.log(" + this.p + ")";
            //this.resultado = eval(this.resultado);
            this.mostrar += "log(" + this.p + ")";
            document.getElementById("resultado").value = this.mostrar;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    neperiano(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "1/Math.log(" + this.p + ")";
            //this.resultado = eval(this.resultado);
            this.mostrar += "ln(" + this.p + ")";
            document.getElementById("resultado").value = this.mostrar;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    diezElevar(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.pow(10," + this.p + ")";
            //this.resultado = eval(this.resultado);
            this.mostrar += "10^" + this.p;
            document.getElementById("resultado").value = this.mostrar;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    raiz(){
        this.parsear();
        if(this.p > -1){
            this.resultado += "Math.sqrt(" + this.p + ")";
            //this.resultado = eval(this.resultado);
            this.mostrar += "√" + this.p;
            document.getElementById("resultado").value = this.mostrar;
        }else{
            document.getElementById("resultado").value = "Error";
        }
        this.p = -1;
    }

    pi(){
        this.numeroPi = true;
        super.digitos("Math.PI");
        this.numeroPi = false;
    }

    e(){
        this.numeroE = true;
        super.digitos("Math.E");
        this.numeroE = false;
    }

    factorial(){
        this.parsear();
        if(this.p > -1){
            this.fact(this.p);
            this.resultado += this.f;
            this.mostrar += this.f;
            document.getElementById("resultado").value = this.mostrar;
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
        this.mostrar = "abs(" + this.mostrar + ")";
        document.getElementById("resultado").value = this.mostrar;
    }

    abrirParéntesis(){
        this.pa = true;
        this.resultado += "(";
        this.mostrar += "(";
        document.getElementById("resultado").value = this.mostrar;
    }

    cerrarParéntesis(){
        this.pc = true;
        this.resultado += ")";
        this.mostrar += ")";
        document.getElementById("resultado").value = this.mostrar;
    }

    igual(){
        try { 
            if(this.exp | this.elevarY | (this.pa & !this.pc)){
                this.resultado += ")";
                this.mostrar += ")";
                document.getElementById("resultado").value = this.mostrar;
            }
            this.mostrar = eval(this.resultado);
            document.getElementById("resultado").value = this.mostrar;
            this.resultado = this.mostrar;
        }
        catch(err) {
             document.getElementById("resultado").value = "Error = " + err;
        }
        this.exp = false;
        this.elevarY = false;
        this.pa = false;
        this.pc = false;
    }

}
var calculadoraCientifica = new CalculadoraCientifica();