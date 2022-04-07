1. run  [ npm install --save ]
2. run [ npm run nodemondev ]
3. import postman collection (C:\Users\Yugandar Aaleswara\Downloads\e-commerce\users.postman_collection.json) 

user-rating api end points

// 1.api for create user

method : post
url : http://localhost:2000/user
body : { "userName": "Govardhan", "password": "123", "active": 0, "type": 1, "firstName": "goa", "lastName": "ab", "email": "goa@gmail.com", "year": "2021", "rating": "4.5" }

// 2.api for user login 

method : post
url : http://localhost:2000/user
body : { "userName": "sivakumar", "password": "123" }

// 3.update user

method : put
url : http://localhost:2000/user/:id
body : { "userName": "Govardhan Aaleswara", "active": false, "type": true }

//4.get users

method : get
url : http://localhost:2000/user/

//5.get users by id

method : get
url : http://localhost:2000/user/:id

//6.remove users by id

method : delete
url : http://localhost:2000/user/:id

