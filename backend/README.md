# You-Pay API Documentation
This API uses `POST` request to communicate and HTTP [response codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) to indenticate status and errors. All responses come in standard JSON. All requests must include a `content-type` of `application/json` and the body must be valid JSON.


## Installation Guide
**Step 1**<br>
Install Dependancies using ```yarn install```.

**Step 2**<br>
Create a file names `.env` and place the follwing into it. (For Database connectivity).<br>
`CONNECTION_URL=mongodb+srv://<username>:<password></password>@cluster0-alh36.gcp.mongodb.net/youpay?retryWrites=true&w=majority`

Replace `username` and `password` with your MongoDB Atlas Credentials.


**Step 3**<br>
Start the server by `nodemon start`.

<br>

## Response Codes 
### Response Codes
```
200: Success
400: Bad request
500: Internal Server Error
```

## User Signup
**You send:**  User's data
**You get:** A sucess message with data

**Request:**
```json
POST /signup HTTP/1.1
Accept: application/json
Content-Type: application/json

{
    "firstName": "Sewvandi",
    "lastName": "Promodya",
    "phone": "0703226877"
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "Success",
    "data": {
        "_id": "5f6d63848a290216187a9739",
        "firstName": "Sewvandi",
        "lastName": "Promodya",
        "phone": "0703226877",
        "balance": 0,
        "__v": 0
    }
}
```
**Failed Response:**
```json
HTTP/1.1 404 Bad request
Content-Type: application/json

{
    "message": "The user already exists"
}
``` 

## Create Transaction
**You send:**  Transaction Data
**You get:** A sucess message with data

**Request:**
```json
POST /signup HTTP/1.1
Accept: application/json
Content-Type: application/json

{
    "fullName" : "Sewvandi Promodya",
    "date": "Thu Sep 24 2020 22:32:54 GMT+0530 (India Standard Time)",
    "from": "0703226877",
    "to": "0771655198",
    "amount": 100.00
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "Success",
    "data": {
        "_id": "5f6d64288a290216187a973b",
        "fullName": "Sewvandi Promodya",
        "date": "2020-09-24T17:02:54.000Z",
        "from": "0703226877",
        "to": "0771655198",
        "amount": {
            "$numberDecimal": "100"
        },
        "__v": 0
    }
}
```
**Failed Responses:**
```json
HTTP/1.1 404 Bad request
Content-Type: application/json

{
    "message": "Insufficient Funds"
}
``` 

```json
HTTP/1.1 404 Bad request
Content-Type: application/json

{
    "message": "Could not find sender"
}
``` 

```json
HTTP/1.1 404 Bad request
Content-Type: application/json

{
    "message": "Could not find receiver "
}
``` 

## View Transaction
**You send:**  User's phone number
**You get:** User's transaction history

**Request:**
```json
POST /signup HTTP/1.1
Accept: application/json
Content-Type: application/json

{
    "phone": "0771655198"
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "outgoingTransactions": [
        {
            "_id": "5f6cdfbac5ddf61225fc4058",
            "fullName": "Sewvandi Promodya",
            "date": "2020-09-24T17:02:54.000Z",
            "from": "0771655198",
            "to": "0740131770",
            "amount": {
                "$numberDecimal": "50"
            },
            "__v": 0
        },
        {
            "_id": "5f6d64288a290216187a973b",
            "fullName": "Sewvandi Promodya",
            "date": "2020-09-24T17:02:54.000Z",
            "from": "0771655198",
            "to": "0740131770",
            "amount": {
                "$numberDecimal": "100"
            },
            "__v": 0
        }
    ],
    "incomingTransactions": [
        {
            "_id": "5f6d5a3678f6fd1409d19dbb",
            "fullName": "Sewvandi Promodya",
            "date": "2020-09-24T17:02:54.000Z",
            "from": "0740131770",
            "to": "0771655198",
            "amount": {
                "$numberDecimal": "70"
            },
            "__v": 0
        }
    ]
}
```
**Failed Response:**
```json
HTTP/1.1 404 Bad request
Content-Type: application/json

{
    "message": "Could not find user"
}
``` 

## Postmen Documentation
You can access Postman collection <a href="https://documenter.getpostman.com/view/8515740/TVKFzwGk">here</a>.