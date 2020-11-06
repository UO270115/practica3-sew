"use strict";
class CalculadoraDietetica{

    constructor(){
        this.IMC = 0;
        this.TBM = 0;
        this.peso = 0;
        this.edad = 0;
        this. altura = 0;
    }

    calcular(){
        this.peso = document.getElementById("peso").value;
        this.edad = document.getElementById("edad").value;
        this.altura = document.getElementById("altura").value;
        this.calcularIMC();
        this.calcularTBM();
        this.display();
    }

    // Peso(kg) / altura (m^2)
    calcularIMC(){
        this.IMC = Math.round((this.peso / Math.pow((this.altura/100),2))*100)/100;
    }

    // Fórmula de Harris-Benedict
    calcularTBM(){
        if(document.getElementById("sexoMujer").checked){
            // TMB Hombres = 66.473 + (13.751 * Peso (kg)) + (5.0033 * Altura(cm)) - (6.7550 * edad(años))
            this.TBM = Math.round((66.473 + (13.751 * this.peso) + (5.0033 * this.altura) - (6.7550 * this.edad))*100)/100;
        }else{
            // TMB Mujeres = 655.1 + (9.463 * Peso (kg)) + (1.8 * Altura(cm)) - (4.6756 * edad(años))
            this.TBM = Math.round((655.1 + (9.463 * this.peso) + (1.8 * this.altura) - (4.6756 * this.edad))*100)/100;
            
        }
    }

    display(){
        document.getElementById("IMC").value = this.IMC;
        document.getElementById("calorias").value = this.TBM;
    }
}
var calculadoraDietetica = new CalculadoraDietetica();