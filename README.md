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
- Start the backend by going to the `epigram-service` directory and execute: `./gradlew bootRun` (on Linux) or `gradlew.bat bootRun`(on Windows)
- Start the webapp by going to the `epigram-web` directory and execute: `npm install` and after that `npm run dev`.  
The web app will be available at `http://localhost:5173`
