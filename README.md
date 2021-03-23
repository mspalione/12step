# Contact App 
A simple app to store contacts and schedule meetings.

## To Run App Locally
1. Clone repo `git clone https://github.com/mspalione/contactApp.git`
2. Run `npm install` in the terminal
3. Run `node ./` or install nodemon with `npm install -g nodemon` and then run `nodemon` in the terminal 
https://www.npmjs.com/package/nodemon
4. Make requests to http://localhost:3000

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
- verify the userId and the contactUuid for your sqlite db before running calendar test for 'when body contains event title, date and time'
