# Lifehack 2022 Backend API Docs

Run `index.js` using `pm2`

## Authentication

`POST /login `

### Request:

```json
{
    "username": "tkai",
    "password": "1234"
}
```

### Response:

```json
{
    "success": true,
    "token": "token"
}
```

`POST /register`  

Creates a new account

### Request:

```json
username  
password  
age (integer)  
location (just a simple string)  
categories (an array of areas the user wants to volunteer in)  
timings (timings available, just a simple string)  
Telegram_id
```

### Response:

```json
{
    "success": true,
    "token": "token"
}
```

**Note:** All endpoints below these are **authenticated** and require an `Authorization` header with the token.

## Home Page

`GET /display_volunteer_opportunity`

Returns the full list of volunteering opportunities  

Simple querying such as filtering by specific categories should be done on the frontend.  

Avoid doing timing filtering since the logi is quite complex. Location filtering can be done using a simple string match  

### Return Structure:

```json
{ success: true, 
opportunities: 
[ { 
organisation: '', 
category: '', 
event_name: '', 
timing: '', 
location: '', 
description: 'hello world!', 
training_program: []
} ] }
```

### `POST /search_volunteer_opportunity`

Returns a list of opportunities similiar to the one above but filtered  

### Request:

```json
  "query": "I love nature!"
```

### Return:

```json
  { success: true, 
filteredOpportunities: 
[ { 
organisation: '', 
category: '', 
event_name: '', 
timing: '', 
location: '', 
description: 'hello world!', 
training_program: []
} ] }
```

### `POST /create_volunteer_opportunity`

**Note:** If an organisation name which doesn't previously exist is used in this endpoint. A new organisation document is created

### Request:

```
organisation
event_name 
category 
description 
timing 
location 
training_program (note, request the automatic training program generation endpoint first)
```

### `POST /generate_training`

### Request:

```
description
event_name
```

### Response:

```
{
  "success": true,
  "generatedTrainings": [
    "oral skills practice",
    "conversational language training",
    "body language cues reading"
  ]
}
```

## Buddying/Users

`GET /list_users`   

Returns **array of users** each with:  

```json
{
    "username": "",
    "age": 5,
    "location": "",
    "categories": [],
    "timings": "",
    "telegram_id": ""
}
```

`POST /create_experience`  

### Request:

```json
{
    "organisation": "",
    "description": 5,
    "rating": 5
}
```

`POST /get_user`  

Returns the user info + experiences written by the user

### Request:

```json
{
    "username": ""
}
```

### Response:

```json
{
  "success": true,
  "data": {
    "username": "test",
    "age": 15,
    "location": "Bukit Panjang",
    "categories": [
      "pets",
      "elderly"
    ],
    "timings": "Every weekend",
    "telegram_id": "@tkaixiang",
    "experiences": [
      {
        "_id": "62c85943d23254ac96cc8ce2",
        "username": "test",
        "organisation": "Giving.sg",
        "description": "Giving.sg",
        "rating": 5
      },
      {
        "_id": "62c8f4ae41a9a3cfa0b520b9",
        "username": "test",
        "organisation": "food from the heart",
        "description": "Was really fun!",
        "rating": 5
      }
    ]
  }
}
```

`POST /find_buddy`

Returns a list of **recommended buddies** for the given user to find

### Request:

```json
{
    "username": ""
}
```

### Response:

```json
{
  "success": true,
  "recommendedBuddies": [
    {
      "username": "test2",
      "age": 20,
      "location": "Bukit Panjang",
      "categories": [
        "elderly",
        "environment"
      ],
      "timings": "Every weekend",
      "telegram_id": "@tkaixiang"
    }
  ]
}
```

## Organisation Page

## `GET /list_organisations`

### Response:

```json
{
  "success": true,
  "organisations": [
    {
      "_id": "62c8f3a9403a35e6606eff4b",
      "organisation": "food from the heart",
      "category": "nature",
      "description": "food from the heart is an organisation dealing with Nature"
    }
  ]
}
```

`POST /query_organisations`  
Sends back organisation info + experiences + volunteer opportunities tagged to organisation

### Request:

```json
{
  "organisation": "food from the heart"
}
```

### Response:

```json
{
  "success": true,
  "orgInfo": {
    "organisation": "food from the heart",
    "category": "nature",
    "description": "food from the heart is an organisation dealing with Nature"
  },
  "experiences": [
    {
      "_id": "62c8f4ae41a9a3cfa0b520b9",
      "username": "test",
      "organisation": "food from the heart",
      "description": "Was really fun!",
      "rating": 5
    }
  ],
  "opportunities": [
    {
      "_id": "62c8f3a9403a35e6606eff4b",
      "organisation": "food from the heart",
      "category": "nature",
      "description": "food from the heart is an organisation dealing with Nature"
    }
  ]
}
```

`POST /create_organisation`

### Request:

```json
{
    "organisation": "moshi moshi",
    "category": "Nature",
    "description": "We deal with nature"
}
```
