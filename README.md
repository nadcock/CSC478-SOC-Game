[![Waffle.io - Issues in progress](https://badge.waffle.io/nadcock/CSC478-SOC-Game.png?label=in%20progress&title=In%20Progress)](https://waffle.io/nadcock/CSC478-SOC-Game?utm_source=badge)

# CSC478-SOC-Game Setup

## Command line Setup

### System requirements:
   * Windows 7+ or macOS
   * Google Chrome Web Browser v. 62+ (other browsers may work but are not supported)
   * Reliable internet connection
    
### Installation Instructions:
   * Install Python 2.7.14: https://www.python.org/downloads/
   
      * During installation, add python.exe to Path <p align="center"> <img src=https://github.com/nadcock/CSC478-SOC-Game/blob/master/Documentation/add_python_to_path.png> </p>
      * Choose default settings for all other options
   * Open Command Prompt
      * Works with standard command prompt
      * Nagivate to c:\>
      * Enter the following command: 
          ```pip install virtualenv```
   * Download zip of repository from https://github.com/nadcock/CSC478-SOC-Game
   * Extract files
   * Return to Command Prompt
      * Navigate to CSC478-SOC-Game-master in command prompt
      * Enter the following commands: 
          1. ```virtualenv soc-game```:
             * Setup tools will be installed
          1. ```pip install "pyramid==1.9.1"```:
             * Pyramid will be installed. This may take a few minutes
          1. ```python setup.py install```:
             * This will install several components and may take a few minutes
          1. ```pserve development.ini```:
             * A URL will be printed to the console. Navigate to this URL in a web browser. 
             * **Note:** User may need to change the URL from ```machinename:{port}``` to ```localhost:{port}``` if the machine name does not work
      * Copy the URL provided by the server into a browser window to begin
    
### Installation issues:
   * This project is incompatible with Python 3. 
   
      * The installation instructions are written for versions of Python 2.7.9 or later (up to but not including 3)
      * Earlier versions of Python are not bundled with pip and will require additional steps to install
      
   * To run this game locally requires a minimum of 2 separate browsers
      * At least one browser having an "incognito mode" or its equivalent 
      * The software uses browser sessions to identify players and consequently each player must be playing from a separate browser. 

### Installation Troubleshooting: 
   * Ensure the correct version of Python is installed (Python 2.7.14)
   
   * Ensure the Python path is enabled. 
      * On Windows, this can be checked by going to: 
         * ``` System Properties -> Advanced System Settings -> Environment Variables -> System Variables -> Path``` 
         * C:\Python27 should be part of that path

## IDE (Pycharm) Setup
### Pycharm Project Setup
   * Install Pycharm
   
   * Open Pycharm and select "Checkout from Version Control" or VCS > "Checkout from Version Control" > Github
   * Enter github repo URL above
   * Select "Yes" on message

### Create Virtual Environment
   * Go to Pycharm > Preferences (Mac) or File > Settings (Windows)
   
   * Expand Project: CSC478-SOC-Game
   * Choose Project Interpreter
   * Select Gear Icon
   * Select Create VirtualEnv
   * Enter Name of Virtual Environtment (whatever you want)
   * Select 2.7 as base interpreter
   * Choose OK

### Install required packages
   * Go to Tools > Run Setup.py Task...
   
   * Type "Develop" and choose menu option that appears
   * Hit "Ok"

### Setup run configuration for project
   * Select "Edit Configurations" from Run menu
   
   * Select "+" button and choose "Pyramid Server"
   * Name run configuration (whatever you want)
   * Select "development.ini" from project as the Config file
   * FOR WINDOWS: Select "Run Browser", enter IP address as 127.0.0.1:6543
   * Hit "OK"

### Run server
   * Click run button at top of screen
   
   * Click link that appears in console



