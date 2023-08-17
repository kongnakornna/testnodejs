 
# Name: Test NODEJS fastify typescript
# port : 8880
## nodejs v 16.16.0

##  Author Kongnakorn Jantakun
##  email kongnakornna@gmail.com

```
# How To run project
# taskkill /f /im node.exe
# 
- Run `taskkill /f /im node.exe `
# install project

- Run `npm install`  or Run `npm i ` 

# task kill on Windows10 OS
- Run `netstat -an taskkill /f /im node.exe`  

# Development server

- Run `npx nodemon ` for a dev server.  OR  Run `npx ts-node -P tsconfig.json src/server.ts `

## Development server on Build
# Build Source Code on production
- Run `npx gulp`

 -- After Run `npx gulp` is have directory `dist` file in package typescript

# directory Build file ` dist/server.ts`

# How To run project
- Run `npx nodemon `

# install project
- Run `npm install`  and  Run `npm install -g nodemon`



# Test PostMan

```
- http://127.0.0.1:8880

- http://127.0.0.1:8880/login   

- username: admin
- password :admin

- http://127.0.0.1:8880/login/verifytoken

- token_bearer

- http://127.0.0.1:8880/login/private

- token_bearer

```