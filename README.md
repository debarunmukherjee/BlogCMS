## Live Demo

Visit https://bloglib.herokuapp.com/

Super-admin Creds - 
- Email: **admin@bloglib.com**
- Password: **Test1234#**
- DOB: **04/06/2022**
## Steps to run locally

1. Clone the contents of frontend(`main-frontend` branch) and backend code(`main-backend` branch) into separate folders.
2. Make sure to have latest version of NodeJS installed
3. Run `npm install` in both of the folders to install dependencies
4. To set up mysql, you can install workbench or any other mysql client. I have used XAAMP for development. Whichever you choose, make sure to import the database schema from **blog.sql** file in the backend folder.
5. Create a **.env** file in each folder following **.env.example** file and make sure to update the correct configuration values. For `JWT_SECRET` you can use any sample string like **blog123**. `CLIENT_URI` is the url in which your frontend client is running eg- http://localhost:3000 . Make sure to update the correct mysql creds and config as well. Also, for client env make sure to enter the backend api url `REACT_APP_API_URL` - eg: http://localhost:4001
6. Run `npm start` in both the folders and the servers should spawn up. Visit http://localhost:3000
7. The super admin user creds are - email: **admin@bloglib.com** password: **Test1234#** dob: **04/06/2022**
8. If you chose to clear all the db data, make sure to make **the first user** as super admin by manually editing the **role** field in **users** table with the value **super-admin**. The super admin can then give admin access to others from the admin panel.
