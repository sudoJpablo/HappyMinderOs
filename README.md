Instrucciones Para despliegue de test:
	Prerrequisitos: tener desplegado la Api y extensión Happy minder, tener Chrome, tener Python, y pip.
Abre una terminal en Windows e instala la biblioteca Selenium ejecutando el comando ‘ pip install selenium ‘ en tu terminal.
Abre el archivo llamado testF.py.
Busca la sección etiquetada como "extension_patch" en el archivo y proporciona la ruta local donde se encuentra la extensión.
Encuentra la sección etiquetada como "url" y suministra la URL generada al abrir la extensión en Google Chrome.
Ejecuta el archivo desde la línea de comandos con el comando python testF.py.
Para el test no funcional, sigue los mismos pasos mencionados anteriormente, pero en lugar de usar el archivo "testF.py", utiliza el archivo "testNFl.py".
