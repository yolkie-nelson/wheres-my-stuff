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
