[![Waffle.io - Issues in progress](https://badge.waffle.io/nadcock/CSC478-SOC-Game.png?label=in%20progress&title=In%20Progress)](https://waffle.io/nadcock/CSC478-SOC-Game?utm_source=badge)

# CSC478-SOC-Game

## User Setup

    System requirements:
    - Windows 7+ or macOS
    - Google Chrome Web Browser v. 62+ (other browsers may work but are not supported)
    - Reliable internet connection
    
    Installation Instructions:
    - Install Python 2.7.14 https://www.python.org/downloads/
    - During installation, add python.exe to Path https://github.com/nadcock/CSC478-SOC-Game/blob/master/add_python_to_path.png
    - Open Command Prompt
    - Nagivate to c:\>
    - Enter the following command: pip install virtualenv
    - Download zip of repository from https://github.com/nadcock/CSC478-SOC-Game
    - Extract files
    - Navigate to CSC478-SOC-Game-master in command prompt
    - Enter the following commands: 
    - virtualenv soc-game
    - pip install "pyramid==1.9.1"
    - python setup.py install
    - pserve development.ini
    
    Installation issues:
    - This project is incompatible with Python 3. Additionally, the installation instructions are written for versions of Python  2.7.9 or later. Earlier versions of Python are not bundled with pip and will require additional steps to install.
    - To run this game locally requires 3 separate browsers. The software uses browser sessions to identify players and consequently each player must be playing from a separate browser. 

    Installation troubleshooting: 
    - Ensure the correct version of Python is installed (Python 2.7.14)
    - Ensure the Python path is enabled. On Windows, this can be checked by going to System Properties -> Advanced System Settings -> Environment Variables -> System Variables -> Path. C:\Python27 should be part of that path

## Pycharm Project Setup
    - Install Pycharm
    - Open Pycharm and select "Checkout from Version Control" or VCS > "Checkout from Version Control" > Github
    - Enter github repo URL above
    - Select "Yes" on message

## Create Virtual Environment
    - Go to Pycharm > Preferences (Mac) or File > Settings (Windows)
    - Expand Project: CSC478-SOC-Game
    - Choose Project Interpreter
    - Select Gear Icon
    - Select Create VirtualEnv
    - Enter Name of Virtual Environtment (whatever you want)
    - Select 2.7 as base interpreter
    - Choose OK

## Install required packages
    - Go to Tools > Run Setup.py Task...
    - Type "Develop" and choose menu option that appears
    - Hit "Ok"

## Setup run configuration for project
    - Select "Edit Configurations" from Run menu
    - Select "+" button and choose "Pyramid Server"
    - Name run configuration (whatever you want)
    - Select "development.ini" from project as the Config file
    - FOR WINDOWS: Select "Run Browser", enter IP address as 127.0.0.1:6543
    - Hit "OK"

## Run server
    - Click run button at top of screen
    - Click link that appears in console



