// This creates a list of user objects.
const users= [
  {username: 'landry', password: 'examplePW', email: 'someone@thing.com'},
  {username: 'mitch', password: 'somewords', email: 'someoneelse@thing.com'},
  {username: 'test', password: 'abc123', email: 'someoneelse@thing.com'}
]

// This gets the username
function getUser(username){
 return users.find(function (user){
   return user.username === username;
 });
}

// This exports the users array and getUser function.
module.exports = {
  find: getUser,
  all: users
}
