# RPE10

![Screen Shot 2022-06-14 at 4 19 36 PM](https://user-images.githubusercontent.com/60331384/173704886-584d146f-ba13-4786-9bcc-2c8c622ac432.png)

[RPE10](https://rpe10.herokuapp.com/) is a fitness application for athletes to program their own workouts and track performance metrics such as average volume and RPE (rate of perceived exertion). RPE10's goal is replace the traditional spreadsheets that are often used by coaches to communicate workout programs to their athletes.

# Technologies Used

RPE10 is built with React / Redux on the frontend, Python / Flask on the server, and a PostgreSQL database.

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/>
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=40/>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=40/>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height=40/>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height=40/>
          

## Getting started
1. Clone this repository

   ```bash
   git clone git@github.com:ethanchen7/RPE10.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
   
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Start your pipenv shell, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. Open up another terminal and CD into /react-app and run the React app.
   ```bash
   npm start
   ```

<br>

# Features Highlight

## Display of Performance Metrics

![](https://media.giphy.com/media/21nLM5OAZNVeh0Nhk7/giphy.gif)

Average volume and RPE per week are displayed on the dashboard when the user logs in. The chart is rendered through the Chart.js library, and volume and RPE are calculated as hybrid methods/properties of each Week model instance.

Volume is calculated as (weight * sets * reps) and is a metric used to understand the total load/stress being placed on an athlete's muscles. RPE (rate of perceived exertion) is simply an average of the RPE numbers reported per exercise. RPE is used to determine the fatigue involved with completing that exercise.

## Full CRUD of Blocks, Weeks, Days, and Exercises

Athletes have access to dynamically sized tables and auto-updating fields for convenient programming. Fields can be left blank to finish later, or filled to completion and displayed on their block summary. Average volume and RPE metrics are calculated automatically through the backend upon instantiation of new exercises, days, and weeks. 
