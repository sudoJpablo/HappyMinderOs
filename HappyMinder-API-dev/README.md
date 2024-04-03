# HappyMinder-API
1. Install Node.js v14 from here or any other source (apt, chocolatey, pacman, homebrew, etc...) (as root if necessary)
2. Create a mongoDB database
3. Install Git from here or any other source (apt, chocolatey, pacman, homebrew, etc...) (as root if necessary).
4. Fork and Clone this repository https://github.com/Puentes-Digitales/HappyMinder-API.git
5. Open your terminal inside the cloned repository.
6. Execute the command “npm i” in your terminal to install internal dependencies.
7. Create a file .env with following information, change the values according to your information
DB_USER= userBD
DB_PASS= pasBD
DB_SERVER= url_bD
PORT= 4001
8. Execute the command “npm start” in your terminal to start the local server in the background, it will be available at http://localhost:4001.


Running de API with Docker in a server
1. Check if the docker-compose version is at least 1.28.3, Execute the command ´´docker-compose --version
2. If necessary, install a newer version https://documentation.wazuh.com/current/docker/docker-installation.html
3. Clone repository on server, Execute the command ´´git clone https://github.com/Puentes-Digitales/HappyMinder-API.git´´ 
you migth need gituser and token, see this to generate one  https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
4. Create a file .env
5. Check the ports that are already being used with the command
´´netstat -tulpn| grep LISTEN´´ 
6. If necessary, modify the docker-compose.yml file line 9, using an available port
7. Build the container
´´docker-compose -f docker-compose.yml up -d --build --force-recreate´´

