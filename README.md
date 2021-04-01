# Contact App 
A simple app to store contacts and schedule meetings.

## To Run App Locally
1. Clone repo `git clone https://github.com/mspalione/contactApp.git`
2. Run `npm install` in the terminal
3. Run `node ./` or install nodemon with `npm install -g nodemon` and then run `nodemon` in the terminal 
https://www.npmjs.com/package/nodemon
4. Make requests to http://localhost:3000
5. If you need to run the app locally more than once, or make a change to the code and run again manually or via nodemon, comment out the call to seed the db on index line 23.

## To run Swagger UI for the API
- Run `node swagger.js` or `nodemon swagger.js`
- Access the ui here http://localhost:3001/api-docs

## Routes
- /user
- /contacts
- /calendar

## Project Goals
- Build an ExpressJS Backend Application
- Utilize Sequelize with Sqlite 
- Include unit tests for each end point
- Build out api following CRUD operations

## SQLite
While not necessary to see project effectiveness, a DB Browser for SQLite to see db contents can be downloaded here https://sqlitebrowser.org/

- The User model is used as a foreign key in the Calendar and Contact models to limit user access to their own calendar and contacts. 
- The Contact model is used as a foreign key in the Calendar model as an optional field to tie a calendar event to a specific contact.
- All three db tables have been seeded with data. Ensure the seed.seed() method in the entrypoint index.js file is not commented out before running to allow seed to run automatically once the app is started.

## Testing
- Testing utilizing chai running on mocha. 
- Run the tests by typing `npm run test` in the terminal.
- There are some base objects created for use with the tests.
- /calendar has three tests. /contact and /user have two.
- All tests are found in routes/validations/validation.test.js
- Each endpoint has its own describe grouping.
