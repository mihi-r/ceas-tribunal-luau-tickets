# CEAS Tribunal Luau Tickets Form
The Luau tickets web form will allow students to get tickets to an event called Luau hosted by [CEAS Tribunal](https://tribunal.uc.edu), an engineering student council organization at the University of Cincinnati.

## Use Case
### General Flow
The form will ask for the student's name, preferred email, and a screenshot of their payment from [Venmo](https://venmo.com). This screenshot will be used to confirm the payment of the student's ticket. A deep link to Venmo's purchase page in the mobile app (for Andriod and iOS) will be provided to simplify the process for the student. The page will be autofilled with purchase details such as the name, reciepient, and amount. If they don't have the Venmo app installed or they are using the web form on Desktop, an alternate link to Venmo's website will open instead.

### Data Flow
The form's data such as the student's name, email, and screenshot of the payment will be sent to an admin email. The admin email will be stored in a database table along with other information such as date, month, and year of the event. Also, the table will store the payment amount required, the Venmo recipient, and the Venmo payment title. This information will be populated on the web page as needed. 

## Getting Started
### Initial Set Up
Prerequisites:
- Mamp (or something equivalent)
- VS Code (or something equivalent)
- nodeJS for NPM

1. `cd` into the MAMP folder.
2. Rename your current htdocs folder to something else using `mv htdocs <new directory name>`.
3. `git clone https://github.com/mihi-r/ceas-tribunal-luau-tickets.git` and click enter to clone repo (alternatively, you can use the SSH clone if you have that set up).
4. `mv ceas-tribunal-luau-tickets htdocs` to rename the cloned folder to “htdocs”.
5. `cd` into htdocs.
6. Run `npm install` to install all of the needed modules for the project.
7. Run `npm install gulp-cli -g` to install Gulp globally.
8. Next, run either `gulp dev` or `gulp watch`. Gulp watch will compile the javascript file and CSS into a minified cross-browser compatible code while gulp dev will not. It is recommended to use gulp dev for development to make debugging easier and reserve gulp watch for the final production code.
9. Start the MAMP Server and click on "Open WebStart page". 
10. On the newly opened MAMP webpage, go to Tools -> phpMyAdmin.
11. Create a database called "tribunal" by clicking on "new" from the left-hand-side panel. Then, add in the name "tribunal" for the database name and select "utf8_general_ci" as the collation, and click "create".
12. Click on the newly created tribunal database from the left-hand-side panel and click on import from the top toolbar. Import all the files from the schema folder (htdocs/schema). This will create the necessary tables for you.
8. Now create a PHP file which will allow you to connect to the MAMP database. `cd` into api/includes and create a mysqli.php file. For development, the contents of the PHP file can like look like this:
```
<?php
//mysqli database connection

// Development
DEFINE('DB_USERNAME_DEV', 'root');
DEFINE('DB_PASSWORD_DEV', 'root');
DEFINE('DB_HOST_DEV', 'localhost');
DEFINE('DB_DATABASE_DEV', 'tribunal');

// Production
DEFINE('DB_USERNAME_PROD', '');
DEFINE('DB_PASSWORD_PROD', '');
DEFINE('DB_HOST_PROD', '');
DEFINE('DB_DATABASE_PROD', '');

$mysqli = new mysqli(DB_HOST_DEV, DB_USERNAME_DEV, DB_PASSWORD_DEV, DB_DATABASE_DEV);

if (mysqli_connect_error()) {
    die('Connect Error ('.mysqli_connect_errno().') '.mysqli_connect_error());
}
?>
```
For production, you will need to provide the missing constants and update the database connection to use those.

11. To set up linting, open VS Code and install the ESLint extension. Reload VS Code afterwards.
12. Open up the htdocs directory in VS Code to start developing.
13. To see the webpage, click on "Open WebStart page" from the MAMP Server and click on "My Website".

### Making changes
1. Make your desired change.
2. Make sure to either run `gulp dev` or `gulp watch`.
3. Visit the webpage and clear browser cache (<kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>3</kbd> or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>3</kbd>).

To contribute, follow our [Git WorkFlow](https://github.com/mihi-r/ceas-tribunal-luau-tickets/wiki) and refer to the style guides.


