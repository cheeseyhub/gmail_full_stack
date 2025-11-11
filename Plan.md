# Making Gmail clone with mern

## backend
  -Need to implement the userRouter.
    -First i need to be able to create a user.
      -Create a user model
      [
      """
      [
      "name":"string",
      "email":"string",
      "password":"encrypted using bcrypt",
      "token":"string stored locallly",
      ]
      ,
        {
          "name": "John Doe",
          "email": "john@example.com",
          "password": "password123"
        }
      """
      ]

      -Create a user controller
      -- createController
        when a new user is created, redirect to login page, so that he logins in;

      -- loginController
        Check if the  user exists.
        generateToken for 24 hours.(it makes user stay logged in).

      -Create a user router
