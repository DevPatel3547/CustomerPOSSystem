[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/apcvbojB)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12489252&assignment_repo_type=AssignmentRepo)

Project 3 by team 910_10b

To run the backend open the api folder and type "npm start" in terminal
Look at different routes inside backend by seeing the app.js file and there is a section of code with comments around it
    Example: "app.use('/testAPI', testAPIRouter);" means that localhost:9000/testAPI exists

    Run the following in the "my-react-app" folder:
    npm install react-modal
    npm install react-tsparticles
    npm install axiom
    npm install google-maps-react
    npm i @react-oauth/google // this is for the Oauth Login
    npm install jwt-decode // for emails to be decoded
    npm install react-icons

Things to download for backend (download in the api folder):
    BEFORE DOING THIS JUST TRY TO RUN BECAUSE THEY SHOULD ALREADY BE DOWNLOADED IN THE NODE_MODULES FOLDER
    npm install express --save
    npm install pg --save
    npm install dotenv --save


## Architecture (current)

- **Front end** (`my-react-app`): React with a **Redux** store (`src/store/cartSlice.js`, Redux Toolkit) holding the order being assembled, so the menu, cart modal, cashier and checkout all read the same items and the same running total (summed in integer cents). REST calls use `async/await` with `axios`; the API base URL comes from `REACT_APP_API_URL` (defaults to the hosted backend). The customer page uses the Google Maps JavaScript API.
- **API** (`api`): Node + Express REST routes over PostgreSQL through the **Sequelize** ORM (`api/db.js`). Table and column names are validated as plain identifiers and values are bound, never concatenated into SQL. Set `PSQL_SSL=false` for a local database without TLS.
- **Tests**: `cd api && npm test` (route tests; set `POS_INTEGRATION=1` with a PostgreSQL in `PSQL_*` for the end-to-end test) and `cd my-react-app && npx react-scripts test --watchAll=false`. GitHub Actions runs both, builds the app, and smoke-tests the Docker stack.

## Running with Docker

```sh
docker compose up --build
# front end: http://localhost:3000   API: http://localhost:9000   PostgreSQL: localhost:5432 (pos/pos)
```
