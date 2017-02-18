/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');
module.exports = {

attributes: {
  name: {
         type: 'string',
         },
         email: {
             type: 'string',
             required: true,
             unique: true
         },
         password: {
            type: 'string',
            required: true
         },
         role: {
           type: 'string',
           required: true
          },
         // override default toJSON
         toJSON: function() {
             var obj = this.toObject();
             delete obj.password;
             return obj;
         }
   },
 // toJSON function deletes the password before returning a model and beforeCreate, as the name implies, encrypts the password before saving the model instead of saving it in pure text.
   beforeCreate: function(user, cb) {
       bcrypt.genSalt(10, function(err, salt) {
           bcrypt.hash(user.password, salt, function(err, hash) {
             if(err) {
                 console.log(err);
                 cb(err);
             } else {
                 user.password = hash;
                 console.log(hash);
                 cb(null, user);
             }
           });
       });
   }
};
