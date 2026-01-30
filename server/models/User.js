import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

//HAsh password before saving in dtatabase

userSchema.pre("save", async function(){
    if (!this.isModified("password")) return  //if password is not modified, skip hashing
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        
    }catch(error){
        throw error
    }
})

//method to comapre password during login
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)

}

const User=mongoose.model("User", userSchema)
export default User
