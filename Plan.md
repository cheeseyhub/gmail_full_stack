# Making Gmail clone with mern

## backend
    -- Todo:
        MailRouter:
          "/":
            - There should be a route to just get all the emails of a user.

          "/send":
            - On the send route the user should be able to send the mail to another user.

                Using the current 'user id' find user with the 'other  email'.
                Then add the email to ther 'other email user' emails array.
          "/delete":
            - On the delete route the email of the current user with the specified id will be deleted.
