//We need a User model (this file) so that we can save the user to the DB when they sign up and retrieve the user from the DB to validate their credentials when they log in.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Add the bcrypt library
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;  // 6 is a reasonable value

const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        // unique: true creates a unique index in the database which will trigger an error if violated.
        unique: true,
        //trim: This transform causes Mongoose to trim spaces before and after the string before saving.
        trim: true,
        //lowercase: This transform causes Mongoose to convert the string to lowercase before saving.
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: true
    }
},
    {
        timestamps: true,
        // Even though it's hashed - don't serialize the password (don't let  us see the password)
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
                return ret;
            }
        }
    });

//Let's add a Mongoose pre-save hook (Mongoose middleware) that will hash the password anytime the password has changed:
userSchema.pre('save', async function (next) {
    // 'this' is the user doc
    if (!this.isModified('password')) return next();
    // update the password with the computed hash
    //The SALT_ROUNDS variable determines how much processing time it will take to perform the hash.
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
});


module.exports = mongoose.model('User', userSchema);