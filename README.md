 
# Name: backendcmon
# port : 8880
 

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
# install project
- Run `npm install`  and  Run `npm install -g nodemon`

# Build Source Code on production
- Run `npx gulp`    

POST  


http://127.0.0.1:8880/login   

username: admin
password :admin

http://127.0.0.1:8880/login/verifytoken