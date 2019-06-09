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
9. Start the MAMP Server and visit the webpage. At this point, you will see the webpage. 
10. To set up linting, open VS Code and install the ESLint extension. Reload VS Code afterwards.

### Making changes
1. Make sure either `gulp dev` or `gulp watch` is running.
2. Make your desired change.
3. Visit the webpage and clear browser cache (for example, if you're using Chrome, open your developer tools and hold down the refresh icon to see the option to "Empty Cache and Hard Reload:).

To contribute, follow our [Git WorkFlow](https://github.com/mihi-r/ceas-tribunal-luau-tickets/wiki) and refer to the style guide.


