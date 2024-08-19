# Epigram

A simple webapp for displaying and adding epigrams inspired by the Unix *fortune* program


## Functionalities
- Showing a random epigram by user request
- Automatically loading and showing epigrams with an interval

## How to run

- Install the following prerequisites (when needed):
  - [Java 21](https://www.openlogic.com/openjdk-downloads)
  - [Node 20.16 LTS](https://nodejs.org/en/download/package-manager)
  

- Check-out this repository.
- Start Keycloak server:
    - Run `docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin -e KC_LOG_LEVEL=INFO  quay.io/keycloak/keycloak:latest start-dev`
    - Go to `http://localhost:8080`
    - Login with `admin` and `admin`
    - Click on the left top menu that says `Keycloak` and click `Create realm`
    - Click on `Browse` next to `Resource file` and select `test-realm-keycloak.json` (from the checkout directory)
    - Click on `Save`
- Start the backend by going to the `epigram-service` directory and execute: `./gradlew bootRun` (on Linux) or `gradlew.bat bootRun`(on Windows).
- Start the webapp by going to the `epigram-web` directory and execute: `npm install` and after that `npm run dev`.  
The web app will be available at `http://localhost:5173` and when clicking the Login button it's possible to register a new user.


## Enable admin rights

To enable the adding of epigrams, your user has to have the `admin` role.
- Go to [Keycloak](http://localhost:8080) and login with `admin` and `admin`.
- Go to `Users`, select your username, and go to the `Role mapping` tab.
- Click on `Assign role ` and select `epigram-app admin`
- Click on `Assign`.
- Log out and log in again in the webapp and `Add epigram` will be visible.


