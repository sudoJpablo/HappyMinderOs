from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time 

# Ruta a la extensión de Chrome
extension_path = r'/Users\cpini\OneDrive\Documentos\Universidad\INFO282\HappyMinder-Chrome-Extension'


# Opciones de Chrome WebDriver
options = Options()
options.add_argument('--load-extension=' + extension_path)

# Inicializa el driver de Chrome
driver = webdriver.Chrome(options=options)

# URL a la página web para probar la extensión
url = 'chrome-extension://ajiecllbhjlgnhkglappamipflodfmca/options.html'
driver.get(url)

# Establece el tiempo inicial
start_time = time.time()

# Presiona el boton de iniciar sesión
login_btn = driver.find_element(By.ID, 'login-btn')
login_btn.click()


# Pulsa en el boton "Usuario con contraseña"
has_password = driver.find_element(By.ID, 'has-password')
has_password.click()

text_input = driver.find_element(By.ID, 'username')
text_input.send_keys("testAuto")

text_input = driver.find_element(By.ID, 'password')
text_input.send_keys("admin")

# Pulsa en el boton "Ingresar"
login_in = driver.find_element(By.ID, 'login-in')
login_in.click()

print("Se inicio sesión correctamente")

# Establece el tiempo final y calcular el tiempo transcurrido
end_time = time.time()
elapsed_time = end_time - start_time

# Dirige a la seccion de "Perfil", esperando a que aparezca el elemento
show_profile = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.ID, 'show-profile'))
)
show_profile.click()
close_session = driver.find_element(By.ID , 'logout-btn')
close_session.click()

print("Se cerro sesión correctamente")

time.sleep(10)
