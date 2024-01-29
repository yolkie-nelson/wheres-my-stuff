# Where's My Stuff?
​
_Where's My Stuff?_ is an application for managing and tracking the locations of equipment rentals.
​
Team:
​
* Hannah Nelly
* Ken Merritt
* Peace Omoregie
* Vivian Martinez
​
## Getting Started
​
**Make sure you have Docker, Git, and Node.js 18.2 or above**
​
1. Fork this repository
​
2. Clone the forked repository onto your local computer:
git clone <respository.url.here>
​
3. Build and run the project using Docker with these commands:
```
docker volume create postgres-data
docker volume create pg-admin
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running

### Installing python dependencies locally

In order for VSCode's built in code completion and intelligence to
work correctly, it needs the dependencies from the requirements.txt file
installed. We do this inside docker, but not in the workspace.

So we need to create a virtual environment and pip install the requirements.

From inside the `api` folder:

```bash
python -m venv .venv
```

Then activate the virtual environment

```bash
source .venv/bin/activate
```

And finally install the dependencies

```bash
pip install -r requirements.txt
```

Then make sure the venv is selected in VSCode by checking the lower right of the
VSCode status bar

### NPM Installs
**In order for our React App to function properly, make sure to run the following npm install commands**

```
npm install react
npm install redux
```
​

**View the project in the browser: http://localhost:5173/**



![Img](ghi/public/wheres_my_stuff-removebg-preview.png)

## Design
​
Where's My Stuff is a streamlined equipment management app made up of these core objects:
​
- **Account**
- **EquipmentType**
- **Equipment**
- **Contract**
- **JobSite**
​
## Integration
​
It all begins by creating a user account. The user is able to login, where they have access to their record of equipment types and the corresponding equipment items. Their availability, location, and maintenance schedule are tracked.
​
## Accessing Endpoints to Send and View Data
Access Endpoints through FastAPI (Swagger UI) and your browser
​
### Accounts:
​- The account owner is presumed to be the company renting out the equipment, and has access to data that logged out users do not. Authentication is accomplished via jwtdown, and an access token is stored as a cookie.
​
| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Accounts | GET | http://localhost:8000/api/accounts/ |
| Create an Account | POST | http://localhost:8000/api/accounts/ |
| Get a specific Account | GET | http://localhost:8000/api/accounts/id/ |
| Delete a specific manufacturer | DELETE | http://localhost:8000/api/accounts/id/ |
​
​
JSON body to send data:
​
Create and Update an account (SEND THIS JSON BODY):
- You cannot make two accounts with the same username
```
{
  "username": "Hannah"
  "password": "Banana"
}
```
The return value of creating, viewing, updating a single account:
```
{
    "access_token": "12345",
      "token_type": "Bearer,
      "account": {
        "id": 1,
        "username": "Hannah"
      }
}
```
Getting a list of accounts return value:
```
[
    {
      "access_token": "12345",
      "token_type": "Bearer,
      "account": {
        "id": 1,
        "username": "Hannah"
      }
    }
]

```
​
### EquipmentType:
- The equipment type is used to categorize the equipment items available for rental.
​
| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List Equipment Type | GET | http://localhost:8000/api/equipment_type/ |
| Create an Euipment Type | POST | http://localhost:8000/api/equipment_type/ |
| Get a specific Equipment Type | GET | http://localhost:8000/api/equipment_type/id/ |
| Delete a specific Equipment Type | DELETE | http://localhost:8000/api/equipment_type/id/ |
​

Create and update an Equipment Type (SEND THIS JSON BODY):
```
{
  "name": "Landscape",
}
```
Return value of creating or updating an equipment type:
- This returns the manufacturer's information as well
```
{

    "id": 0,
    "name": "Landscape"
}
```
Getting a List of Equipment Types Return Value:
```
[
    {
        "id": 0,
        "name": "Landscape"
    },
    {
        "id": 1,
        "name": "Sanitation"
    }
]

```
​
### Equipment:
- The **'serial'** at the end of the detail urls represents the serial number for the specific equipment item you want to access. This is not an integer ID. This is a string value so you can use numbers and/or letters.
​
| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List equipment | GET | http://localhost:8000/api/equipment/ |
| Create an equipment | POST | http://localhost:8000/api/equipment/ |
| Get a specific equipment | GET | http://localhost:8000/api/equipment/serial/ |
| Update a specific automobile | PUT | http://localhost:8000/api/equipment/serial/ |
| Delete a specific automobile | DELETE | http://localhost:8000/api/equipment/serial/ |
​
​
Create Equipment (SEND THIS JSON BODY):
- You cannot make two equipment items with the same serial number
```
{
  "model_name": "Wheelbarrow",
  "description": "20 gallon, black",
  "serial_number": "194ghjl300",
  "storage_site_id": 12,
  "date_servied": "2024-01-29",
  "photo": "http://img.url",
  "equipment_type_id": 0,
}
```
Return Value of Creating an Equipment:
```
{
  "id": 0
  "model_name": "Wheelbarrow",
  "description": "20 gallon, black",
  "serial_number": "194ghjl300",
  "storage_site_id": 12,
  "date_servied": "2024-01-29",
  "photo": "http://img.url",
  "equipment_type_id": 0,
}
```
To get the details of a specific piece of equipment, you can query by its serial number:
example url: http://localhost:8000/api/equipments/194ghjl300/
​
Return Value:
```
{
  "id": 0
  "model_name": "Wheelbarrow",
  "description": "20 gallon, black",
  "serial_number": "194ghjl300",
  "storage_site_id": 12,
  "date_servied": "2024-01-29",
  "photo": "http://img.url",
  "equipment_type_id": 0
}
```
As, an example, you can update the storage site and service date of an equipment item (SEND THIS JSON BODY):
```
{
  "storage_site_id": 4,
  "date_serviced": 2024-02-12
}
```
Getting a list of Equipment items Return Value:
```
[
    {
        "id": 1,
        "model_name": "Wheelbarrow",
        "description": "Black, 6 wheel",
        "serial_number": "194ghjl300",
        "storage_site_id": 12,
        "date_servied": "2024-01-24",
        "photo": "image.yourpictureurl.com",
        "equipment_type_id": 3
    },
    {
        "id": 2,
        "model_name": "Caterpillar Backhoe",
        "description": "500 Gallon Bucket, Yellow",
        "serial_number": 12345,
        "storage_site_id": 2,
        "date_serviced": "2024-01-24",
        "photo": "image.yourpictureurl.com",
        "equipment_type_id": 2
    }
]
```
### Contracts:
​- The contract is meant to represent a rental agreement between us and our client, and stores info about the location of the piece of equipment along with the dates it will be on site.
​
| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List contracts | GET | http://localhost:8000/api/contracts/ |
| Create a contract | POST | http://localhost:8000/api/contracts/ |
| Show a specific contract | GET | http://localhost:8000/api/contracts/id/ |
| Delete a specific contract | GET | http://localhost:8000/api/contracts/id/ |
​
To create a Contract (SEND THIS JSON BODY):
```
{
  "equipment_id": 0,
  "job_site_id": 0,
  "start_date": "2024-01-24",
  "end_date": "2024-01-29",
  "description": "Music Festival"
}
```
Return Value of Creating a Contract:
```
{
  "id": 0,
  "equipment_id": 0,
  "job_site_id": 0,
  "start_date": "2024-01-24",
  "end_date": "2024-01-29",
  "description": "Music Festival"
}
```
Return value of Listing all Contracts:
```
[
        {
            "id": 0,
            "equipment_id": 0,
            "job_site_id": 0,
            "start_date": "2024-01-24",
            "end_date": "2024-01-29",
            "description": "Music Festival"
        },
        {
            "id": 0,
            "equipment_id": 0,
            "job_site_id": 0,
            "start_date": "2024-01-24",
            "end_date": "2024-01-29",
            "description": "Music Festival"
        }
]
```
### Job Site:
- The job site represents the location where the equipment will go when a contract has been initiated to rent it.

| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List job sites | GET | http://localhost:8000/api/jobsite/ |
| Job Site details | GET | http://localhost:8000/api/jobsite/id/ |
| Create a job site | POST | http://localhost:8000/api/jobsite/ |
| Delete a job site | DELETE | http://localhost:8000/api/jobsite/id/ |
​
​
To create a Job Site (SEND THIS JSON BODY):
```
{
    "job_name": "Fair Grounds Music Festival",
    "job_address": "123 E Street",
    "job_poc": "tom@tom.com"
}
```
Return Value of creating a Job Site:
```
{
    "id": 0,
    "job_name": "Fair Grounds Music Festival",
    "job_address": "123 E Street",
    "job_poc": "tom@tom.com"
}
```
List all Job Sites Return Value:
```
[
    {
        "id": 0,
        "job_name": "Fair Grounds Music Festival",
        "job_address": "123 E Street",
        "job_poc": "tom@tom.com"
    },
    {
        "id": 0,
        "job_name": "Commercial Landscaping Job",
        "job_address": "456 H Street",
        "job_poc": "sally@sally.com"
    }
]
```
### Storage Site:
- The storage site respresents the warehouse where a piece of equipment is stored when it is not actively rented.
​
| Action | Method | URL |
| ----------- | ----------- | ----------- |
| List all storage site | GET | http://localhost:8000/api/storages/ |
| Create a new storage site | POST | http://localhost:8000/api/storages/ |
| Storage site details | GET | http://localhost:8000/api/storages/id/ |
| Delete storage site | GET | http://localhost:8000/api/storages/id/ |

List all Storage Sites Return Value:
```
[
        {
            "id": 0,
            "warehouse_number": 12,
            "location_address": "789 M Street",
            "point_of_contact": "marry@marry.com"
        },
        {
            "id": 0,
            "warehouse_number": 4,
            "location_address": "111 L Street",
            "point_of_contact": "maya@maya.com"
        },
        {
            "id": 0,
            "warehouse_number": 9,
            "location_address": "321 R Street",
            "point_of_contact": "lewis@lewis.com"
        }
]
```
Create a Storage Site (SEND THIS JSON BODY):
```
{
    "warehouse_number": 1,
    "location_address": "1010 G Street",
    "point_of_contact": "tom@tom.com"
}
```
Return Value of Creating a new Storage Site:
```
{
    "id": 0,
    "warehouse_number": 1,
    "location_address": "1010 G Street",
    "point_of_contact": "tom@tom.com"
}
```
Show all Storage Sites Return Value:
```
{ "job_sites": [
    {
        "id": 0,
        "warehouse_number": 1,
        "location_address": "1010 G Street",
        "point_of_contact": "tom@tom.com"
    },
    {
        "id": 1,
        "warehouse_number": 2,
        "location_address": "2020 9th St",
        "point_of_contact": "cindy@cindy.com"
    }
  ]
}
```

## Given to us by Instructors
### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

-   `docker-compose.yaml`: there isn't much in here, just a
    **really** simple UI and FastAPI service. Add services
    (like a database) to this file as you did with previous
    projects in module #2.
-   `.gitlab-ci.yml`: This is your "ci/cd" file where you will
    configure automated unit tests, code quality checks, and
    the building and deployment of your production system.
    Currently, all it does is deploy an "under construction"
    page to your production UI on GitLab and a sample backend
    to CapRover. We will learn much more about this file.
-   `.gitignore`: This is a file that prevents unwanted files
    from getting added to your repository, files like
    `pyc` files, `__pycache__`, etc. We've set it up so that
    it has a good default configuration for Python projects.
-   `.env.sample`: This file is a template to copy when
    creating environment variables for your team. Create a
    copy called `.env` and put your own passwords in here
    without fear of it being committed to git (see `.env`
    listed in `.gitignore`). You can also put team related
    environment variables in here, things like api and signing
    keys that shouldn't be committed; these should be
    duplicated in your deployed environments.

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

-   make sure this project is in a group. If it isn't, stop
    now and move it to a GitLab group
-   remove the fork relationship: In GitLab go to:

    Settings -> General -> Advanced -> Remove fork relationship

-   add these GitLab CI/CD variables:
    -   PUBLIC_URL : this is your gitlab pages URL
    -   VITE_APP_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME

### Initialize CapRover

1. Attain IP address and domain from an instructor
1. Follow the steps in the CD Cookbook in Learn.

### Update GitLab CI/CD variables

Copy the service URL for your CapRover service and then paste
that into the value for the REACT_APP_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.
