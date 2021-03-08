# pl4y-react-spring-demo
This is an app for educational purpose only. This application is made using Spring Boot and postGRE SQL to make the Resfull APIs. Then React JS is used to make the frond end. There is no login so just flip the value of "isEditor" of const user in App.js to see two different portals. This is not meant for sale and only educational purposes. For students, made by student.

****NOTE****

Folders are as follows :
*** pl4y-game-service : Main game service (port 8080, change in .src/java/resources/application.prop)
*** pl4y-game-catlogue-demo : Main game service (port 8081, change in .src/java/resources/application.prop)
*** pl4y-game-reviews : Main game service (port 8085, change in .src/java/resources/application.prop)
*** pl4y-web-app: React App [*NEEDS ALL OF THE ABOVE RUNNNG TO DISPLAY DATA*]

**IMPORTANT IF YOU WANT TO INSTALL AND USE**
* You will need postgresql installed on your system. Please check the name of the database from .src/java/resources/application.yml in pl4y-game-catalogue, pl4y-game-service, pl4y-game-reviews (each). The default name is 'games'
* You will need jdk8 for this Spring Boot Application set to run. Dependencies are in pom.xml, should be automatically installed.
* Also, npm (NODE JS) is needed to setup react app. 
* To setup react app, just open CLI(Command Prompt/Terminal) in pl4y-web-app folder and type in *npm install*. Once done, type in *npm start* to start the server (starts on port 3000 by default)


------------------------------
In case of any help required, you can react out : yashk398@gmail.com
