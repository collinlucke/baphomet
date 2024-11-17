Start-Process powershell -Verb runAs -ArgumentList @("-NoExit", "-Command", "docker pull collinlucke/baphomet-ui:latest")
