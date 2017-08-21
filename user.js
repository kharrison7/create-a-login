const users= [
  {username: 'landry'}
]

function getUser(username){
 return users.find(function (user){
   return user.username == username;
 });
}

module.exports = {
  find: getUser,
  all: users
}
