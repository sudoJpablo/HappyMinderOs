from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time 

# Ruta a la extensión de Chrome
extension_path = '/Users\panch\Documents\selenium\HM\HappyMinder-Chrome-Extension'

# Opciones de Chrome WebDriver
options = Options()
options.add_argument('--load-extension=' + extension_path)

# Inicializa el driver de Chrome
driver = webdriver.Chrome(options=options)

# URL a la página web para probar la extensión
url = 'chrome-extension://ajiecllbhjlgnhkglappamipflodfmca/options.html'
driver.get(url)



# Presiona el boton de iniciar sesión
login_btn = driver.find_element(By.ID, 'login-btn')
login_btn.click()


# Pincha en el boton "Usuario con contraseña"
has_password = driver.find_element(By.ID, 'has-password')
has_password.click()


# Ingresa el username: test9820
text_input = driver.find_element(By.ID, 'username')
text_input.send_keys("test9820")


# ingresa la contraseña: 12345
text_input = driver.find_element(By.ID, 'password')
text_input.send_keys("12345")

# pincha en el boton "Ingresar"
login_in = driver.find_element(By.ID, 'login-in')
login_in.click()

# Tomar el tiempo inicial
start_time = time.time()

# Dirige a la seccion de "Perfil", esperando a que aparezca el elemento
show_profile = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.ID, 'show-profile'))
)
show_profile.click()
# Tomar el tiempo final y calcular el tiempo transcurrido
end_time = time.time()
elapsed_time = end_time - start_time

# Imprimir el tiempo transcurrido en consola
print("Tiempo transcurrido hasta ingresar en la cuenta : {:.2f} segundos".format(elapsed_time))

# Dirige a la seccion de "Perfil", esperando a que aparezca el elemento
close_session = driver.find_element(By.ID , 'logout-btn')
close_session.click()

# Presiona el boton de iniciar sesión
login_btn = driver.find_element(By.ID, 'login-btn')
login_btn.click()


# Pincha en el boton "Usuario con contraseña"
has_password = driver.find_element(By.ID, 'has-password')
has_password.click()


# Ingresa el username: test9999
text_input = driver.find_element(By.ID, 'username')
text_input.send_keys("test9999")


# ingresa la contraseña: 12345
text_input = driver.find_element(By.ID, 'password')
text_input.send_keys("12345")

# pincha en el boton "Ingresar"
login_in = driver.find_element(By.ID, 'login-in')
login_in.click()
time.sleep(10)
""" # Pincha en el boton "Agregar enlace"
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
time.sleep(3) """