const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const ProfileSchema = new mongoose.Schema({
    set: { type: Boolean, default: false},
    location: { type: String },
    roastColorPreference: { type: Number },
    roastOriginPreferences: [{ type: String}]
})
const UserSchema = new mongoose.Schema({
    username: {type: String,
                index: {
                    unique: true,
                    //neat trick preventing duplicate key error with null username
                    partialFilterExpression: {username: {$type: 'string'}}
                },
                minlength: 1 },
    password: { type: String, select: false },
    email: { type: String, required: true, unique: true},
    displayName: { type: String, trim: true },
    googleProvider: {
        type: {
            id: String,
            accessToken: String,
            refreshToken: String
        },
        select: false
    },
    profile: { type: ProfileSchema, default: () => ({}) },
    roasterAuthorizations: [{type: Schema.Types.ObjectId, ref: "Roaster"}],
    friends: [{type: Schema.Types.ObjectId, ref: "User"}],
    roastReviews: [{type: Schema.Types.ObjectId, ref: "RoastReview"}],
    roasterReviews: [{type: Schema.Types.ObjectId, ref: 'RoasterReview'}]
}, {
    timestamps: true
})
// hash the password if its a local user
UserSchema.pre('save', async function(next){
    if(this.password && this.isNew){
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        catch (err) {
            next(err);
        }
    }
    next()
})
// standarize the usernames
UserSchema.pre('save', function(next){
    if(this.username){ // OAUTH users don't have usernames, skip them
        this.username = this.username.toLowerCase().replace(/\s/g, ''); //lowercase and eliminate whitespace
        if(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(this.username)){
            next({"message": "No special characters allowed"})
        }
    }
    next()
})
UserSchema.methods.validPassword = function(testPass){
    return bcrypt.compareSync(testPass, this.password)
}
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema)