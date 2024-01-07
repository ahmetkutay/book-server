# book-server

## Project Setup

Follow these steps to set up the project:

1. Run Docker Compose to build and start the services:

   ``````
   docker-compose up --build

2. Run the initializeMysql.sh script to set up the database. This script creates the database schema and populates it with some initial data. To run this script we need to go to the scripts directory then run this command:

    ```
    ./initializeMysql.sh

3. Wait for this script to finish running before proceeding to the next step.
After the database setup script has finished running, you can start using the project. The project provides several endpoints that you can use to interact with the book server. You can check shared_postman_collection.json