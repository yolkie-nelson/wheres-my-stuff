#### Where's My Stuff?
​
Where's My Stuff? is an application for managing and tracking the locations of equipment rentals.
​
Team:
​
* **Student 1** - Hannah Nelly
* **Student 2** - Ken Merritt
* **Student 3** - Peace Omoregie
* **Student 4** - Vivian Martinez
​
## Getting Started
​
**Make sure you have Docker, Git, and Node.js 18.2 or above**
​
1. Fork this repository
​
2. Clone the forked repository onto your local computer:
git clone <<respository.url.here>>
​
3. Build and run the project using Docker with these commands:
```
docker volume create postgres-data
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running
​
- View the project in the browser: http://localhost:5173/
​
![Img](/images/WheresMyStuff.png)
​
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
![Img](/images/CarCarDiagram.png)
​
​
## Integration
​
How this all starts is at our equipment type domain. We keep a record of equipment types and their corresponding equipment items. Their availability and location, and maintenance schedule are tracked.
​
## Accessing Endpoints to Send and View Data: Access Through FastAPI & Your Browser
​
### Accounts:
​
​
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List Accounts | GET | http://localhost:8000/api/accounts/
| Create an Account | POST | http://localhost:8000/api/accounts/ |
| Get a specific Account | GET | http://localhost:8000/api/accounts/id/
| Delete a specific manufacturer | DELETE | http://localhost:8000/api/accounts/id/
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
    "access_token": "string",
      "token_type": "Bearer,
      "account": {
        "id": 2,
        "username": "Hannah"
      }
}
```
Getting a list of accounts return value:
```
{
  "accounts": [
    {
      "access_token": "string",
      "token_type": "Bearer,
      "account": {
        "id": 2,
        "username": "Hannah"
      }
    }
  ]
}
```
​
### EquipmentType:
​
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List Equipment Type | GET | http://localhost:8000/api/equipment_type/
| Create an Euipment Type | POST | http://localhost:8000/api/equipment_type/
| Get a specific Equipment Type | GET | http://localhost:8000/api/equipment_type/id/
| Delete a specific Equipment Type | DELETE | http://localhost:8000/api/equipment_type/id/
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
  "equipment type": {
    "id": 0,
    "name": "Landscape"
  }

}
```
Getting a List of Equipment Types Return Value:
```
{
  "EquipmentType": [
      "equipment_type": {
        "id": 0,
        "name": "Landscape"
    }
  ]
}
```
​
### Equipment:
- The **'serial'** at the end of the detail urls represents the serial number for the specific automobile you want to access. This is not an integer ID. This is a string value so you can use numbers and/or letters.
​
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List equipment | GET | http://localhost:8100/api/equipment/
| Create an equipment | POST | http://localhost:8100/api/equipment/
| Get a specific equipment | GET | http://localhost:8100/api/equipment/serial/
| Update a specific automobile | PUT | http://localhost:8100/api/equipment/serial/
| Delete a specific automobile | DELETE | http://localhost:8100/api/equipment/serial/
​
​
Create Equipment (SEND THIS JSON BODY):
- You cannot make two equipment items with the same serial number
```
{
  "equipment_type": (Landscape),
  "model_name": "Wheelbarrow",
  "description": "20 gallon, black",
  "serial_number": "194ghjl300",
  "warehouse": 12,
  "date_servied": 01:02:1993,
  "photo": "http://img.url"
}
```
Return Value of Creating an Equipment:
```
{
    "href": "/api/automobiles/1C3CC5FB2AN120174/",
    "id": 1,
    "color": "red",
    "year": 2012,
    "vin": "777",
    "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "R8",
        "picture_url": "image.yourpictureurl.com",
        "manufacturer": {
            "href": "/api/manufacturers/1/",
            "id": 1,
            "name": "Audi"
        }
    }
}
```
To get the details of a specific automobile, you can query by its VIN:
example url: http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/
​
Return Value:
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "green",
  "year": 2011,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "image.yourpictureurl.com",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  }
}
```
You can update the color and/or year of an automobile (SEND THIS JSON BODY):
```
{
  "color": "red",
  "year": 2012
}
```
Getting a list of Automobile Return Value:
```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "image.yourpictureurl.com",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      }
    }
  ]
}
```
# Sales Microservice
​
On the backend, the sales microservice has 4 models: AutomobileVO, Customer, SalesPerson, and SalesRecord. SalesRecord is the model that interacts with the other three models. This model gets data from the three other models.
​
The AutomobileVO is a value object that gets data about the automobiles in the inventory using a poller. The sales poller automotically polls the inventory microservice for data, so the sales microservice is constantly getting the updated data.
​
The reason for integration between these two microservices is that when recording a new sale, you'll need to choose which car is being sold and that information lives inside of the inventory microservice.
​
​
## Accessing Endpoints to Send and View Data - Access through Insomnia:
​
### Customers:
​
​
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List customers | GET | http://localhost:8090/api/customers/
| Create a customer | POST | http://localhost:8090/api/customers/
| Show a specific customer | GET | http://localhost:8090/api/customers/id/
​
To create a Customer (SEND THIS JSON BODY):
```
{
    "name": "John Johns",
    "address": "1212 Ocean Street",
    "phone_number": 9804357878
}
```
Return Value of Creating a Customer:
```
{
    "id: "1",
    "name": "John Johns",
    "address": "1212 Ocean Street",
    "phone_number": 9804357878
}
```
Return value of Listing all Customers:
```
{
    "customers": [
        {
            "id",
            "name": "Martha Stewart",
            "address": "1313 Baker Street",
            "phone_number": "980720890"
        },
        {
            "id",
            "name": "John Johns",
            "address": "1212 Ocean Street",
            "phone_number": "9804357878"
        }
    ]
}
```
### Salespeople:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List salespeople | GET | http://localhost:8090/api/salespeople/
| Salesperson details | GET | http://localhost:8090/api/salesperson/id/
| Create a salesperson | POST | http://localhost:8090/api/salespeople/
| Delete a salesperson | DELETE | http://localhost:8090/api/salesperson/id/
​
​
To create a salesperson (SEND THIS JSON BODY):
```
{
    "name": "Jane Doe",
    "employee_number": 1
}
```
Return Value of creating a salesperson:
```
{
    "id": 1,
    "name": "Liz",
    "employee_number": 1
}
```
List all salespeople Return Value:
```
{
    "salespeople": [
        {
            "id": 1,
            "name": "Jane Doe",
            "employee_number": 1
        }
    ]
}
```
### Salesrecords:
- the id value to show a salesperson's salesrecord is the **"id" value tied to a salesperson.**
​
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all salesrecords | GET | http://localhost:8090/api/salesrecords/
| Create a new sale | POST | http://localhost:8090/api/salesrecords/
| Show salesperson's salesrecords | GET | http://localhost:8090/api/salesrecords/id/
List all Salesrecords Return Value:
```
{
    "sales": [
        {
            "id": 1,
            "price": 111000,
            "vin": {
                "vin": "111"
            },
            "salesperson": {
                "id": 1,
                "name": "Liz",
                "employee_number": 1
            },
            "customer": {
                "name": "Martha Stewart",
                "address": "1313 Baker Street",
                "phone_number": "980720890"
            }
        }
    ]
}
```
Create a New Sale (SEND THIS JSON BODY):
```
{
    "salesperson": "Liz",
    "customer": "John Johns",
    "vin": "888",
    "price": 40000
}
```
Return Value of Creating a New Sale:
```
{
    "id": 4,
    "price": 40000,
    "vin": {
        "vin": "888"
    },
    "salesperson": {
        "id": 1,
        "name": "Liz",
        "employee_number": 1
    },
    "customer": {
        "id",
        "name": "John Johns",
        "address": "1212 Ocean Street",
        "phone_number": "9804357878"
    }
}
```
Show a Salesperson's Salesrecord Return Value:
```
{
    "id": 1,
    "price": 111000,
    "vin": {
        "vin": "111"
    },
    "salesperson": {
        "id": 1,
        "name": "Liz",
        "employee_number": 1
    },
    "customer": {
        "id",
        "name": "Martha Stewart",
        "address": "1313 Baker Street",
        "phone_number": "980720890"
    }
}
```
# Service microservice
​
Hello and welcome to the wonderful world of service!!
As explained above, the service microservice is an extension of the dealership that looks to provide service repairs for your vehicle.
​
As automobiles are purchased, we keep track of the vin number of each automobile and you are able to receive the special perks of being a VIP!
As a VIP, you will receive free oil changes for life, complimentary neck massages while in our waiting room, and free car washes whenever you would like!
​
This area is going to be broken down into the various API endpoints (Fancy way of saying your web address url) for service along with the format needed to send data to each component.
The basics of service are as follows:
1. Our friendly technician staff
2. Service Appointments
​
​
### Technicians - The heart of what we do here at CarCar
(We are considering renaming, don't worry)
​
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List technicians | GET | http://localhost:8080/api/technicians/
| Technician detail | GET | http://localhost:8080/api/technicians/<int:pk>/
| Create a technician | POST | http://localhost:8080/api/technicians/
| Delete a technician | DELETE | http://localhost:8080/api/technicians/<int:pk>/
​
​
LIST TECHNICIANS: Following this endpoint will give you a list of all technicians that are currently employed.
Since this is a GET request, you do not need to provide any data.
```
Example:
{
    "technicians": [
        {
            "name": "Donald",
            "employee_number": 1,
            "id": 1
        },
```
​
TECHNICIAN DETAIL: This is a GET request as well, so no data needs to be provided here either. When you list technicians, you will
see that they are assigned a value of "id". This is the value that will replace "<int:pk>. For example, if you wanted to see the technician
details related to our technician "Donald", you would input the following address: http://localhost:8080/api/technicians/1/
This would then lead to this:
​
```
{
    "name": "Donald",
    "employee_number": 1,
    "id": 1
}
```
This how our technician detail is displayed. If you want to change the technician, just change the value at the end to match the "id" of the technician you want to display.
​
CREATE TECHNICIAN - What if we hired a new technician (In this economy even)? To create a technician, you would use the following format to input the data and you would just submit this as a POST request.
```
{
    "name": "Liz",
    "employee_number": 2
}
```
As you can see, the data has the same format. In this example, we just changed the "name" field from "Donald" to "Liz". We also assigned her the "employee_number" value of "2" instead of "1".
Once we have the data into your request, we just hit "Send" and it will create the technician "Liz". To verify that it worked, just select follow the "LIST TECHNICIAN" step from above to show all technicians.
With any luck, both Donald and Liz will be there.
Here is what you should see if you select "LIST TECHNICIAN" after you "CREATE TECHNICIAN" with Liz added in:
```
{
    "technicians": [
        {
            "name": "Donald",
            "employee_number": 1,
            "id": 1
        },
        {
            "name": "Liz",
            "employee_number": 1,
            "id": 2
        },
```
​
DELETE TECHNICIAN - If we decide to "go another direction" as my first boss told me, then we need to remove the technician from the system. To do this, you just need to change the request type to "DELETE" instead of "POST". You also need to pull the "id" value just like you did in "TECHNICIAN DETAIL" to make sure you delete the correct one. Once they are "promoted to customer" they will no longer be in our page that lists
all technicians.
​
​
And that's it! You can view all technicians, look at the details of each technician, and create technicians.
Remember, the "id" field is AUTOMATICALLY generated by the program. So you don't have to input that information. Just follow the steps in CREATE TECHNICIAN and the "id" field will be populated for you.
If you get an error, make sure your server is running and that you are feeding it in the data that it is requesting.
If you feed in the following:
```
{
    "name": "Liz",
    "employee_number": 3,
    "favorite_food": "Tacos"
}
​
You will get an error because the system doesn't know what what to do with "Tacos" because we aren't ever asking for that data. We can only send in data that Json is expecting or else it will get angry at us.
​
```
​
​
### Service Appointments: We'll keep you on the road and out of our waiting room
​
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List service appointments | GET | http://localhost:8080/api/serviceappointment/
| Service appointment detail | GET | http://localhost:8080/api/serviceappointment/<int:id>
| Service appointment history | GET | http://localhost:8080/api/servicehistory/<int:vin (OPTIONAL)>
| Create service appointment | POST | http://localhost:8080/api/serviceappointment/
| Delete service appointment | DELETE | http://localhost:8080/api/serviceappointment/<int:id>
​
​
LIST SERVICE APPOINTMENT: This will return a list of all current service appointment.
This is the format that will be displayed.
Spoiler alert! Remember, the way that it is returned to you is the way that the data needs to be accepted. Remember, the "id" is automatically generated, so you don't need to input that.
Also, the "date" and "time" fields HAVE TO BE IN THIS FORMAT
```
{
    "service_appointment": [
        {
            "id": 1,
            "vin": "1222",
            "customer_name": "Barry",
            "time": "12:30:00",
            "date": "2021-07-14",
            "reason": "mah tires",
            "vip_status": false,
            "technician": "Liz"
        },
```
SERVICE APPOINTMENT DETAIL: This will return the detail of each specific service appointment.
```
{
    "id": 1,
    "vin": "1222",
    "customer_name": "Barry",
    "time": "12:30:00",
    "date": "2021-07-14",
    "reason": "mah tires",
    "vip_status": false,
    "technician": "Liz"
}
```
SERVICE APPOINTMENT HISTORY: This will show the detail based on the "VIN" that is input. You will see ALL service appointments for the vehicle associated with the "vin" that you input.
At the end of the URL, tack on the vin associated with the vehicle that you wish to view. If you leave this field blank, it will show all service history for all vehicles.
```
{
    "service_history": [
        {
            "id": 1,
            "vin": "1222",
            "customer_name": "Barry",
            "time": "12:30:00",
            "date": "2021-07-14",
            "reason": "mah tires",
            "vip_status": false,
            "technician": "Liz"
        },
        {
            "id": 6,
            "vin": "1222",
            "customer_name": "Gary",
            "time": "12:30:00",
            "date": "2021-07-11",
            "reason": "new car",
            "vip_status": false,
            "technician": "Caleb"
        }
    ]
}
```
If we add "1222" to the request (eg. http://localhost:8080/api/servicehistory/1222), then it will show the above. If you put a vin that does not exist in the system, it will return a blank list.
​
​
CREATE SERVICE APPOINTMENT - This will create a service appointment with the data input. It must follow the format. Remember, the "id" is automatically generated, so don't fill that in. To verify
that it was added, just look at your service appointment list after creating a service appointment and it should be there.
```
        {
            "id": 6,
            "vin": "1222",
            "customer_name": "Gary",
            "time": "12:30:00",
            "date": "2021-07-11",
            "reason": "new car",
            "vip_status": false,
            "technician": "Caleb"
        }
​
```
DELETE SERVICE APPOINTMENT - Just input the "id" of the service appointment that you want to delete at the end of the url. For example, if we wanted to delete the above service history appointment for Barry
because we accidently input his name as "Gary", we would just enter 'http://localhost:8080/api/serviceappointment/6' into the field and send the request. We will receive a confirmation message saying that
the service appointment was deleted.
​






# Module3 Project Gamma

## Getting started

You have a project repository, now what? The next section
lists all of the deliverables that are due at the end of the
week. Below is some guidance for getting started on the
tasks for this week.

## Install Extensions

-   Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
-   Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

-   [ ] Wire-frame diagrams
-   [ ] API documentation
-   [ ] Project is deployed to Caprover (BE, DB) & GitLab-pages (FE)
-   [ ] GitLab issue board is setup and in use (or project management tool of choice)
-   [ ] Journals

## Project layout

The layout of the project is just like all of the projects
you did with `docker-compose` in module #2. You will create
a directory in the root of the repository for each service
that you add to your project just like those previous
projects were setup.

### Directories

Several directories have been added to your project. The
directories `docs` and `journals` are places for you and
your team-mates to, respectively, put any documentation
about your project that you create and to put your
project-journal entries. See the _README.md_ file in each
directory for more info.

The other directories, `ghi` and `api`, are services, that
you can start building off of.

Inside of `ghi` is a minimal React app that has an "under construction" page.
This app is written using the [Vite](https://vitejs.dev/) bundler. The example
code is also using [jsdoc](https://jsdoc.app/) to provide type hints for
JavaScript. You are not required to use JSDoc yourself, and you will be removing
these examples and providing your own code for `App.jsx`

Inside of `api` is a minimal FastAPI application.
"Where are all the files?" you might ask? Well, the
`main.py` file is the whole thing, and go take look inside
of it... There's not even much in there..., hmm? That is
FastAPI, we'll learn more about it in the coming days. Can
you figure out what this little web-application does even
though you haven't learned about FastAPI yet?

Also in `api` is a directory for your migrations.
If you choose to use PostgreSQL, then you'll want to use
migrations to control your database. Unlike Django, where
migrations were automatically created for you, you'll write
yours by hand using DDL. Don't worry about not knowing what
DDL means; we have you covered. There's a sample migration
in there that creates two tables so you can see what they
look like.

The Dockerfile and Dockerfile.dev run your migrations
for you automatically.

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
