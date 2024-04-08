from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time 

# Ruta local a la extensión de Chrome
extension_path = ''

# Opciones de Chrome WebDriver
options = Options()
options.add_argument('--load-extension=' + extension_path)

# Inicializa el driver de Chrome
driver = webdriver.Chrome(options=options)

# URL correspondiente a la extension cuando se abre en el navegador
url = ''
driver.get(url)

time.sleep(2)

# Presiona el boton de iniciar sesión
login_btn = driver.find_element(By.ID, 'login-btn')
login_btn.click()
time.sleep(2)

# Pincha en el boton "Usuario con contraseña"
has_password = driver.find_element(By.ID, 'has-password')
has_password.click()
time.sleep(2)

# Ingresa el username: test41220
text_input = driver.find_element(By.ID, 'username')
text_input.send_keys("test41220")
time.sleep(1)

# ingresa la contraseña: 12345
text_input = driver.find_element(By.ID, 'password')
text_input.send_keys("12345")
time.sleep(1)

# pincha en el boton "Ingresar"
login_in = driver.find_element(By.ID, 'login-in')
login_in.click()
time.sleep(2)

# Dirige a la seccion de "Enlaces"
show_links = driver.find_element(By.ID, 'show-links')
show_links.click()
time.sleep(2)

# Pincha en el boton "Agregar enlace"
add_link = driver.find_element(By.ID, 'add-link')
add_link.click()
time.sleep(1)

# ingresa el link
text_input = driver.find_element(By.ID, 'input-url')
text_input.send_keys("https://www.instagram.com/")
time.sleep(2)

# Pincha en el boton "Confirmar"
add_url = driver.find_element(By.ID, 'add-url')
add_url.click()
time.sleep(3)

# Dirige a la seccion de "Enlaces"
show_links = driver.find_element(By.ID, 'show-links')
show_links.click()
time.sleep(2)

# Pincha en el boton "Agregar enlace"
add_link = driver.find_element(By.ID, 'add-link')
add_link.click()
time.sleep(1)

# ingresa el link
text_input = driver.find_element(By.ID, 'input-url')
text_input.send_keys("https://www.youtube.com/")
time.sleep(2)

# Pincha en el boton "Confirmar"
add_url = driver.find_element(By.ID, 'add-url')
add_url.click()
time.sleep(3)

# Dirige a la seccion de "Enlaces"
show_links = driver.find_element(By.ID, 'show-links')
show_links.click()
time.sleep(2)

# Pincha en el boton de eliminar una url
button = driver.find_element(By.CSS_SELECTOR, "button[data-url='instagram.com/']")
button.click()
time.sleep(3)

# Dirige a la seccion de "Enlaces"
show_links = driver.find_element(By.ID, 'show-links')
show_links.click()
time.sleep(2)

# Pincha en el boton de eliminar una url
button = driver.find_element(By.CSS_SELECTOR, "button[data-url='youtube.com/']")
button.click()
time.sleep(3)

# Dirige a la seccion de "Enlaces"
show_links = driver.find_element(By.ID, 'show-links')
show_links.click()
time.sleep(2)

# Dirige a la seccion de "Perfil"
show_profile = driver.find_element(By.ID, 'show-profile')
show_profile.click()
time.sleep(2)

# Pincha en el boton "Cerrar sesión"
logout = driver.find_element(By.ID, 'logout-btn')
logout.click()
time.sleep(3)

# Cierra el navegador
driver.quit()
