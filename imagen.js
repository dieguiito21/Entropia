document.getElementById("subirImagen").addEventListener('change', function (e) {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const img = new Image();
    const lector = new FileReader();

    lector.onload = function (event) {
        img.src = event.target.result;
        document.getElementById("vistaPrevia").src = event.target.result;
    };

    img.onload = function () {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const histograma = new Array(256).fill(0);          // Convertir a escala de grises
        const totalPixels = canvas.width * canvas.height;   

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            if (a === 0) continue; // Omitir negros innecesarios

            const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b); // Luma
            histograma[gray]++;
        }

        const pixeles = document.getElementById("pixeles"); 
        pixeles.innerHTML = "";

        for (let i = 0; i < 256; i++) {     // Impresión de la escala de grises
            if (histograma[i] > 0) {
                const p = document.createElement("p");
                p.textContent = `Gris ${i}: ${histograma[i]} veces`;
                pixeles.style.display = "block";
                pixeles.appendChild(p);
            }
        }

        // Calcular las probabilidades de cada pixel
        document.getElementById("probabilidades").innerHTML = "Probabilidades de cada caracter: ";
        const probabilidades = document.getElementById("probabilidades");

        let entropia = 0;
        for (let i = 0; i < 256; i++) {
            if (histograma[i] === 0) continue;
            const p = histograma[i] / totalPixels;

            const prob = document.createElement("p");
            prob.textContent = `${i} -> ${histograma[i]}/${totalPixels}`;
            probabilidades.style.display = "block";
            probabilidades.appendChild(prob);

            entropia -= p * Math.log2(p);
            document.getElementById('formula').innerText = ` ${p}  * log2`;
        }

        const formula = document.getElementById("formula");
        const imprimirEntropia = document.createElement("p");
        formula.innerHTML = "";
        document.getElementById("formula").innerHTML = "Cálculo de la Entropía: ";
        imprimirEntropia.textContent = "H = - [ ";

        for (let i = 0; i < 256; i++) { // Impresión de la formula
            imprimirEntropia.textContent += `${histograma[i]}/${totalPixels} · log₂ (${histograma[i]}/${totalPixels}) + `;
        }

        imprimirEntropia.textContent = imprimirEntropia.textContent.slice(0,-2);
        imprimirEntropia.textContent += ` ] = ${entropia.toFixed(4)}`;
        formula.style.display = "block";
        formula.appendChild(imprimirEntropia);

        document.getElementById("resultado").style.display = "block";
        document.getElementById("resultado").innerText = `Entropía: ${Math.ceil(entropia)} bits por píxel`;
    };

    lector.readAsDataURL(archivo);
});

