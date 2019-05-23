# CEAS Tribunal Luau Tickets Form
The Luau tickets web form will allow students to get tickets to an event called Luau hosted by [CEAS Tribunal](https://tribunal.uc.edu), an engineering student council organization at the University of Cincinnati.

## Use Case
### General Flow
The form will ask for the student's name, preferred email, and a screenshot of their payment from [Venmo](https://venmo.com). This screenshot will be used to confirm the payment of the student's ticket. A deep link to Venmo's purchase page in the mobile app (for Andriod and iOS) will be provided to simplify the process for the student. The page will be autofilled with purchase details such as the name, reciepient, and amount. If they don't have the Venmo app installed or they are using the web form on Desktop, an alternate link to Venmo's website will open instead.

### Data Flow
The form's data such as the student's name, email, and screenshot of the payment will be sent to an admin email. The admin email will be stored in a database table along with other information such as date, month, and year of the event. Also, the table will store the payment amount required, the Venmo recipient, and the Venmo payment title. This information will be populated on the web page as needed. 
