Command List for Project.

You have the option to install these below any way you want. As is will install the node_modules locally. That being said you might want to install them globally with a -g flag at the end of it. If you do that they will not live in your project dir.

npm install express
npm install body-parser
npm install node-slack

Start the local server with: node app

When you have the local server started you can test out your actions by running curl commands to the local server.
ex -> 'curl -X POST --data "user_name=matt" http://localhost:3000/yesman'
