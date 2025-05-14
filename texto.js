function leerTexto(){   
        
        const textoX = document.getElementById("cajaDeTexto").value; // Guardamos el texto escrito en la caja
        if(document.getElementById("cajaDeTexto").value == ""){
            limpiar();
            document.getElementById("textoIngresado").style.display = "block";
            document.getElementById("textoIngresado").innerHTML = `No ingresaste ningún texto`;    
            return;
        } else document.getElementById("cajaDeTexto").value = "";
        texto = textoX.trimEnd();
        
        document.getElementById("textoIngresado").innerHTML = "";
        document.getElementById("textoIngresado").style.display = "block";
        document.getElementById("textoIngresado").innerHTML = `Texto ingresado: ${texto}`;

        const frecuencias = {};
        const probs = {};
        const caracteres = document.getElementById("caracteres");
        const probabilidades = document.getElementById("probabilidades");
        caracteres.innerHTML = ""; // Limpiar lo anterior escrito
        probabilidades.innerHTML = "";

        for(let i = 0; i < texto.length; i++){      // For para contar las veces que aparece cada caracter
            const x = texto[i];
            frecuencias[x] = (frecuencias[x] || 0) + 1; 
        }

        document.getElementById("caracteres").innerHTML = "Frecuencias de cada caracter: ";
        for(const caracter in frecuencias){         // For para mostrar todos los caracteres y sus frecuencias
            const p = document.createElement("p");
            p.textContent = `${caracter} : ${frecuencias[caracter]}`;
            caracteres.style.display = "block";
            caracteres.appendChild(p);
        }

        const formula = document.getElementById("formula");
        const imprimirEntropia = document.createElement("p");
        formula.innerHTML = "";
        document.getElementById("formula").innerHTML = "Cálculo de la Entropía: ";
        imprimirEntropia.textContent = "H = - [ ";

        document.getElementById("probabilidades").innerHTML = "Probabilidades de cada caracter: ";
        for(const caracter in frecuencias){
            probs[caracter] = frecuencias[caracter]/texto.length;
            const prob = document.createElement("p");
            prob.textContent = `${caracter} -> ${frecuencias[caracter]}/${texto.length}`;

            imprimirEntropia.textContent += `${frecuencias[caracter]}/${texto.length} · log₂ (${frecuencias[caracter]}/${texto.length}) + `;
            
            probabilidades.style.display = "block";
            probabilidades.appendChild(prob);   
        }

        imprimirEntropia.textContent = imprimirEntropia.textContent.slice(0,-2);
        imprimirEntropia.textContent += " ]";
        formula.style.display = "block";
        formula.appendChild(imprimirEntropia);

        let entropia = 0;

        for(const caracter in frecuencias){
           entropia += (probs[caracter] * Math.log2(probs[caracter]));
        }
        entropia = entropia * (-1);
        console.log(entropia);

        const calculoH = document.getElementById("calculoH");
        const resultado = document.createElement("p");
        calculoH.innerHTML = "";
        resultado.textContent = `H = ${entropia.toFixed(4)} = ${Math.ceil(entropia)} bits`;
        calculoH.style.display = "block";
        calculoH.appendChild(resultado); 

}

function limpiar(){
    document.getElementById("textoIngresado").innerHTML = "";
    document.getElementById("cajaDeTexto").value        = "";
    document.getElementById("probabilidades").innerHTML = "";
    document.getElementById("formula").innerHTML        = "";
    document.getElementById("caracteres").innerHTML     = "";
    document.getElementById("cajaDeTexto").innerHTML    = "";
    document.getElementById("calculoH").innerHTML       = "";

    document.getElementById("textoIngresado").style.display = "none";
    document.getElementById("probabilidades").style.display = "none";
    document.getElementById("formula").style.display        = "none";
    document.getElementById("caracteres").style.display     = "none";
    document.getElementById("calculoH").style.display       = "none";

}
   
