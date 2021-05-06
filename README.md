# At-Home

### Problem
People often require home appliances services and many other services to their homes. Some of them cannot find such services nearby, especially when they are new to that place. Some of them cannot make appointments with the required services. 

### Introduction
We came up with an idea of At-Home, a web portal that enables users to avail of such services. Using At-Home a person can find service professionals like plumbers, electricians, carpenters, etc. A user gets nearby service professionals as their suggestions based on their locality. The user can book an appointment according to his/her availability. Our portal also suggests the best fare services to the users.

- hosted Site : [https://elated-lovelace-401e9a.netlify.app/](https://elated-lovelace-401e9a.netlify.app/)
- [Presentation Slides](https://docs.google.com/presentation/d/16qgpClBCGWpXswHSQcu1boGJhobbbwjCKjG5VjTKI44/edit?usp=sharing) 

### Registered Users (for testing)

- Service Provider :
  - Email : test@test.com
  - Password : testpassword

- Admin :
  - Email : venkatesh.p18@iiits.in
  - Password : testpassword

### Features
- User Authentication
- Admin features
  - Add service
  - Add different sub service Type
  - Add city
  - Add slot timings to book the service providers
  - Show service providers
- Booking Services
- Reviews on service providers
- Once a user login there is a feature in the website to become a service provider.
- Service provider features
  - Update availability
  - Look at the orders(bookings)
  - get notifications.
  - Share the location on the map.
  - Chat with user.
- If he is not a service provider he will be a user with the general login.
- User features :
  - Look at the service providers in his city.
  - Look at the service types provided by the service provider.
  - Check the service provider availability and display their information.
  - Check the reviews of the service provider.
  - Book the service provider.
  - Show bookings.
  - Add review to the service provider.
  - Get the location of the user.
- Payment gateway integration to book the service provider.
- Update the profile

### EAD features
- Our main EAD feature to be implemented is SCALABILITY. Here we are going to provide a near Quality of Service for the end users by building an application that can grow as per demand of the system. 
- Our application ensures scalability in these aspects:
  - Administrative Scalability
  - Functional Scalability
  - Geographic Scalability
  - Load Scalability
  - Asynchronous Processing
- We are going to achieve this using MERN stack and Azure Cloud Platform for hosting.

- Also apart from Scalability we will be implementing some of the SECURITY features as well.
- Security features:
  - Authentication
  - Authorization
  - Logging
  - Application level Security
  - User Specific Data Sources
- We will achieve this using the “JWT Authentication Tokens”.

### Work Distribution

- Poojari Venkatesh
  - <b>EAD Features</b> : <br>
  React Hosting, Continuous integration, Continuous Deployment, Authorization, Single sign-on, Application level Security, Asynchronous Processing
  - <b>Website Features</b>: <br>
  User Authentication, Worked on User and Service Provider API’s, Payment gateway integration, Home Page UI, Profile Page, getting Notifications, chat page, list Service Providers, Review and their Details, React Frontend Development and Redux implementation. Frontend & Backend Integration.

- Pabbisetty Sri Ranga
	- <b>EAD Features</b> : <br>
  Node hosting on VM’s, Load Balancer, Disaster Recovery,  Authorization, User Specific Data Sources,  Asynchronous Processing, Scalability features
  - <b>Website Features</b> : <br> 
  Admin Features like adding Services, Service Types, Places, Time slots and Time slot management, Service Booking  along with Payment processing and  management, Frontend and Backend Integration, Redux Development, API management, React frontend development, UI for booking related pages, Bug fixes in Booking display and Chat pages.

- Paidala Vikranth Reddy
	- <b>EAD Features</b> :<br> 
  Node hosting on VM’s ,  Load Balancer ,  Asynchronous Processing , Administrative  scalability, Geographic scalability,  Authorization, Logging
  - <b>Website Features</b> :<br> 
  Service provider features  like Update availability of service provider, Listing the bookings, Getting notifications, Sharing the location on the map , Chat with user, API management , Home page and profile page UI, Backend Integration

- S Harshavardhan
  - <b>EAD Features</b>: <br>
  Authorization, Authentication, Application level security,  User data specific sources.
  - <b>Website Features</b> :<br> 
  Add reviews to the service provider, Get the location to the service provider, Show service to the provider, update profile, User features,  service provider features- getting the notification,chat with user, location of the user, Book service provider, show bookings

- K.N.D.Pavan Srinivas
  - <b>EAD Features</b>: <br>
  Authentication,  Single sign on,   Functional  Scalability,   Administrative  Scalability,  Logging,  Load  Scalability,  Geographic Scalability.
  - <b>Website features</b> :<br> 
  User features like book the service provider,  Checking reviews of service provider,  Displays service providers availability & information, Service types provided by service providers, User location,  Reviews on service providers, Look at Service providers in his city,  Update Profile page,  Profile Location page, Contact Page, Google Maps page, Location Page UI, Testing and Bugging with frontend and backend.

### Project and environment setup
```bash
# Setup environment
mkdir At-Home
cd At-Home
# Clone repository
git clone https://github.com/venky012/At-Home.git

# go to project folder
cd At-Home/

# you need two terminals to run our project one for running the nodejs server and other for running reactjs server

# in first terminal go to backend folder 
cd EAD/

# install the node dependencies
# check if it asks for `npm audit fix`
npm install

# start the development server
npm start


# in another terminal go to frontend folder
cd client/

# Install the node dependencies 
# check if it asks for `npm audit fix`
npm install  

# start the frontend server
npm start
```

### Contributors:
- [P Venkatesh](https://github.com/venky012) | S20180010135
- [P Sri Ranga](https://github.com/Pabbisettysriranga) | S20180010125
- [P Vikranth Reddy](https://github.com/vikranthreddyp) | S20180010126
- [S Harshavardhan](https://github.com/harshavardan605) | S20180010151
- [K N D Pavan Srinivas](https://github.com/nivaskambhampati1998) | S20170010062