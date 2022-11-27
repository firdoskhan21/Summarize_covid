# Summarize_covid
Node JS API for fetching data on Covid - 19 worldwide.

# How to run the Project

`git clone <https_link_for_the_repo>`

`npm install`

**Make sure you install serverless offline globally in your system(if any serverless error is observed)**

`npm install -g serverless`

`npm install -g serverless-offline`

After successfull installation of serverless offline is done, now its time to run the project.

`sls offline` or

`serverless offline`

the base api url for the offline api would be at your localhost:3000 

Inorder to run the APIs with AWS Lamda service, we can directly deploy the application

`serverless deploy`

This time the base url for the api will be a link with aws lamda, to run the api replace `localhost:3000` with the base url shown in your command promt.

Full API documentation can be found here:

<a href="https://documenter.getpostman.com/view/7663594/2s8YswRXZa" target="_blank">Summarize Covid API documentation</a>