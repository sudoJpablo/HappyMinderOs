# Instrucciones para Despliegue de Test

## Prerrequisitos
- Debes tener desplegada la API y la extensión Happy Minder.
- Asegúrate de tener instalados Google Chrome, Python y pip en tu sistema.

## Pasos a Seguir
1. Abre una terminal en Windows.
2. Instala la biblioteca Selenium ejecutando el siguiente comando en tu terminal:
    ```
    pip install selenium
    ```
3. Abre el archivo llamado `testF.py`.
4. Busca la sección etiquetada como "extension_patch" en el archivo y proporciona la ruta local donde se encuentra la extensión.
5. Encuentra la sección etiquetada como "url" y suministra la URL generada al abrir la extensión en Google Chrome.
6. Ejecuta el archivo desde la línea de comandos con el siguiente comando:
    ```
    python testF.py
    ```
7. Para realizar el test no funcional, sigue los mismos pasos mencionados anteriormente, pero en lugar de utilizar el archivo "testF.py", utiliza el archivo "testNF.py".
