## Journal Entries

### 01/17/24
- Cloned repo & began coding
- Established Postgres Database
- Started working on Authenticator

### 01/18/24
- Refactored accounts queries and routers to make it work
- Struggled with authentication but resolved several errors
- Successfully created an account with an access token
- Created and worked on the 'authentication' branch

### 01/19/24
- Began equipment and equipment type queries and routers

### 01/22/24
- Completed Contract model's queries and routers.

### 01/24/24
- Completed entire backend!
- Tested all endpoints in Swagger and all were successful!

### 01/24/24
- Began implementing unit tests

### 01/25/24
- Spun up Vite/React App
- Started home page front end and Nav Bar

### 01/26/24
- Implemented unit testing for get one contract!

### 01/27/24
- Began implementation of React Authenticator using jwtdown and Redux

### 01/28/24
- Spun up Vite/React App
- Started home page front end and Nav Bar

### 01/29/24
- Struggled with utilizing Redux, we were unable to send the cookie with the queries until we discovered including "credentials" in our API slice, and setting "credentials" to "include", which includes the cookie currently stored in the browser along with any request being made

### 01/30/24
- Once again, battled Redux! Our API host was not set properly, and we fixed it by updating our .env and our yaml file
- Edited all enpoints to get rid of trailing /'s
- Built the EquipmentList component

### 01/31/24
- Started the EquipmentDetail page
- Implemented Routers in our App.jsx

### 02/01/24
- Fixed Routers in App.jsx, ran into an issue with useParams. It wasn't pulling the serial number for equipment properly from the path and it turns out it was because I was trying to import it from react instead of react-router-dom
- Ran into a catestrophic Git moment because we were all working on the same branch and had to reconcile consolidating everything
- In the future, we all need to create a branch off of main, and we only ever pull from main

### 02/02/24
- Today we continued working on components but then were sidetracked due to misuse of Git. We spent most of our time coding today simply trying to merge all of our code to main, and making sure everyone had up to date code and the website was working. Thomas helped us through but it took a LONG time.

### 02/05/24
- Pair programmed with Peace to create function to check availability of equipent
- This turned out to be more complicated than anticipated. We have our equipment model, and a contract model which references a piece of equipment by its ID, and has a start and end date for the contract. We set an input start and end date which can be set by the user, but defaults to today's date so that when you first navigate to the page, it shows Available if it is available today, and Unavailable if its not. Once the inputs are changed, this updates. \

### 02/06/24
- All CSS and styling today. I worked to format the equipment detail table and card, and in the process discovered a little bit of an issue with out availability function and table data! Fixed that as well. Got the Delete button working on the equipment detail card.

### 02/07/24
- It was a wild ride today. I created a Modal which pops up when you click the edit button on the equipment detail card. We ran into a ton of issues with submitting the form. The data appeared to be formatted correctly for our API slice but we were getting a 422 error. Eventually we discovered that mutation api sclices can only take ONE argument, while we were trying to pass in both the serial number to identify the piece of equipment AND the data for the form body. Instead, we just passed in a single object, the body, to the api slice and found the serial number within that in order to identify the equipment. Now I need to get my modal to properly close!

### 02/08/24
- Today I updated the nav buttons and created a drop down menu for "Create New" in the dropdown. In addition I continued to polish our README.md
