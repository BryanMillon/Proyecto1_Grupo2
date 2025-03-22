




cancelButton.addEventListener("click", function () {
    inputs.forEach(input => {
        input.value = valoresOriginales[input.placeholder];
        input.setAttribute("disabled", "true");
    });

