Routing - refers to how an applications endpoints (URIs) respond to client requests. 

Router parameters are named URL segments that are used to capture values specified in their position in the URL.



`Route path: /users/:userId/books/:bookId`
`Request URL: http://localhost:3000/users/34/books/8989`
`req.params: { "userId": "34", "bookId": "8989" }`


`Route path: /flights/:from-:to`
`Request URL: http://localhost:3000/flights/LAX-SFO`
`req.params: { "from": "LAX", "to": "SFO" }`


`Route path: /plantae/:genus.:species`
`Request URL: http://localhost:3000/plantae/Prunus.persica`
`req.params: { "genus": "Prunus", "species": "persica" }`


`Route path: /user/:userId(\d+)`
`Request URL: http://localhost:3000/user/42`
`req.params: {"userId": "42"}`



https://blog.logrocket.com/building-simple-login-form-node-js/
https://stackoverflow.com/questions/29879975/google-sign-in-auth2-customize-scope-without-openid

Good resource to fix issue that I had with get router not being processed because of path issues etc
https://stackoverflow.com/questions/5920136/mysql-is-not-recognised-as-an-internal-or-external-command-operable-program-or-b 

Build RESTFUL APIs
https://www.youtube.com/watch?v=eI7Buf4pk6w