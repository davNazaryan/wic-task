# wic-task
 > Node version: 12.8.4 LTS

### Setup ( local machine )
1. Download and Install Node.js 12.8.4 LTS version from https://nodejs.org/en/
2. Install required node modules
	- Run npm install
      ```bash
      $ npm install
      ```
3. Set the env variables\
__Add env variables described in `.env.example` file__

	3.1. Pass env variable via command: example`
    - for Windows 
      ```bash
      $ set API_URL=//localhost:3000&& npm run dev
      ```
    - for Unix based OS 
      ```bash
      $ export API_URL=//localhost:3000&& npm run dev
      ``` 
    - universal way 
      ```bash
      $ export API_URL=//localhost:3000|| set API_URL=//localhost:3000&& npm run dev
      ```

	3.2. Pass env variable via file 
    - Create the file named `.env.{NODE_ENV}` in root folder.\
    Where `{NODE_ENV}` can be `prod`(default for `npm start`), `dev`, `test` or `docker`
4. ___Optional___ | Tun unit tests (create `.env.test` file at first)	
   ```bash
   $ npm run test
   ```
5. Run the project
    - __for development__ - `npm run dev`
    - __for production__ - `npm run prod` and `npm start:prod`

### Setup ( docker )
1. Download and install Docker
2. Build docker image
	```bash
		$ npm run build:docker
	```
3. Run docker container
	- Command
		```bash
		$ docker run -e {pase env vars here} -it -p {pase api port here}:3000 --rm --name dn-wic-task--container dn-wic-task
		```
	- Paste ENV variables described in `/env/.env.example` file: example`
		```bash
		... -e CLIENT_URL=localhost:8080 -e API_URL=localhost:3000 ...
		```
