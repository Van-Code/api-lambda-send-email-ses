# Create your Function

In AWS, go to the Lambda Function service
Select Create Lambda Function and select author from scratch
Create a new role for your lambda function and Create
In Function Code, double click index.js in order to edit it.
replace the contents of the file with the code from api/index.js
Click Deploy

# Add Environment Variables

Scroll down and add the below Environment Variables

2. TO_EMAIL your email
3. SUBJECT subject line for form email

# Create a Trigger

Add a Trigger to your function
Select API Gateway
Select Create an API and REST type
Select a Security Method or select Open
You can also change the API name and select a deployment stage.
Click Add.

# Create API Methods

Scroll down to your list of API Gateways to find the one you just created
Copy the API Endpoint. Update your lambda function with this endpoint. Save and Deploy.
Click on the name of your API Gateway to head to AWS API Gateway Service
In the Resources pane, select Create Method from the Actions menu
Select Post and then click the check to save

# Configure API Methods

In the POST setup, select Lambda Function
Check use lambda proxy integration
Select the region for your Lambda function
Enter the name of your function in the Lambda function field
And Save.

# Deploy API

Back in the Resources Pane, select deploy API in the Actions menu.
Select your stage and enter a description and click save

# Allow email sender

In AWS SES Identity Management, add and verify the email address where you would like to have the form's data sent.
