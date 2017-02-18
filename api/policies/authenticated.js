// Create a policy to limit access for authenticated users
// This will create a policy with name same as the .js file, hence this will create a policy named 'authenticated'.
// Apply policy through /config/policies.js

module.exports = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        return res.send(403, { message: 'Not Authorized' });
    }
};
