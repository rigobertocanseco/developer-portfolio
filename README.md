# developer-portfolio


This is a website to developers using [gatsby](https://gatsbyjs.com), [bulma](https://bulma.io/), [netlify](https://www.netlify.com/) and [stackbit](https://www.stackbit.com/). Add [github](htts://github.com/) profile to add your information as repositories, languages used and projects. Also add [dev](https://dev.to/) profile to add your articles. 

It was created with [Stackbit](https://www.stackbit.com?utm_source=project-readme&utm_medium=referral&utm_campaign=user_themes) in under a minute.

## Requirements
Create a github api key, also add your google-analytics tracking id and recaptcha key.  
To add a project:  
In your repository add a new topics with name `ìs-web-project` or `is-backend-project` or `is-`whatever`-project` and add an image in your repository with name `is-thumb.png`.

## Create env development
Create a file `.env.development` and add next variables
```
GATSBY_DOMAIN=
GATSBY_GITHUB_USER=
GATSBY_GITHUB_API_KEY=
GATSBY_GOOGLE_ANALYTICS_TRACKING_ID=
GATSBY_RECAPTCHA_KEY=
GATSBY_DEVTO_USERNAME=
```

## Develop Locally

1. Install [Node.js and npm](https://nodejs.org/en/)

2. Install npm dependencies:

        npm install



3. Start the Gatsby local development server:

        npm run develop

1. Open [http://localhost:8000/](http://localhost:8000/) in the browser
