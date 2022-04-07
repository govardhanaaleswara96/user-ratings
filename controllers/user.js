const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const profileModel = require("../models/profile");
const performanceModel = require("../models/performance");
/**
 * user registration
 */
const createUser = async (req, res) => {
  const userName = req.body.userName;
  const active = req.body.active;
  const type = req.body.type;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const year = req.body.year;
  const rating = req.body.rating;

 /**
   * find email id Exists or not
   */
  const findUser = await userModel.findOne({ userName: userName });
  if (findUser) {
    res.status(401).json({
      message: "User Already Exists",
    });
  } else {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = new userModel({
      userName: userName,
      password: hashPassword,
      active: active,
      type: type,
    });

    try {
      const userResult = await user.save();
      const user_id = userResult._id;
      const profile = new profileModel({
        user_id: user_id,
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
      const performance = new performanceModel({
        user_id: user_id,
        year: year,
        rating: rating,
      });
      const profileResult = await profile.save();
      const performanceResult = await performance.save();
      let result = {
        user_id:profileResult._id,
        userName:userResult.userName,
        email:profileResult.email,
        type: userResult.type,
        firstName:profileResult.firstName,
        lastName: profileResult.lastName,
        year: performanceResult.year,
        rating: performanceResult.rating,
      }
      res.status(201).json({
        message: "User Created Successfully",
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(201).json({
        message: "User Creation Failed ",
      });
    }
  }
};
// get users details
const getusers = async (req, res) => {
  try {
   const result = await performanceModel.find({}).populate('user_id','-password');
   result
    console.log(result);
    res.status(201).json({
      message: "Users Details Fetched",
      result,
    });
  } catch (error) {
    res.status(404).json({
      message: "server error",
    });
  }
}

// get users details
const getusersById = async (req, res) => {
  try {
   const user_id = req.params.id?req.params.id:null;
   const result = await performanceModel.find({user_id:user_id}).populate('user_id','-password');
   console.log(result);
   console.log(user_id);
    //console.log(result);
    res.status(201).json({
      message: "User Details Fetched",
      result,
    });
  } catch (error) {
    res.status(404).json({
      message: "server error",
    });
  }
}

/**
 * user login function
 */
const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    /**
     * find user exists or not
     */
    const user = await userModel.findOne({ userName: userName });
    if (!user) {
      res.status(404).json({
        message: "User Not Found !",
      });
    } else {
      /**
       * check password correct or not
       */
      bcrypt.compare(password, user.password, (err, data) => {
        if (data) {
          const token = jwt.sign({ user }, "h4d5fe5");
          res.status(200).json({
            message: "User Login successfully",
            accessToken: token,
          });
        } else {
          res.status(403).json({
            message: "Password Is Incorrect",
          });
        }
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "User Login Failed",
    });
  }
};
/**
 * user registration
 */
 const updateUser = async (req, res) => {
  const userName = req.body.userName;
  const active = req.body.active;
  const type = req.body.type;
  const id = req.params.id;
 /**
   * find email id Exists or not
   */
  const findUser = await userModel.findOne({ _id: id });
  if (!findUser) {
    res.status(401).json({
      message: "User Not Exists",
    });
  } else {
    const user = {
      userName: userName,
      active: active,
      type: type,
    };

    try {
      const userResult = await userModel.findOneAndUpdate(findUser.id, {
        $set: user,
      });
      res.status(201).json({
        message: "User Details Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(201).json({
        message: "User Update Failed ",
      });
    }
  }
};
/**
 * Delete users function
 */
 const deleteuser = async (req, res) => {
  try {
    const { id } = req.params.id;
    const data = await userModel.findOneAndDelete(id);
    res.status(201).json({
      message: "user removed Successfully",
    });
  } catch (error) {
    res.status(201).json({
      message: "user remove Failed",
    });
  }
};
module.exports = {
createUser,
getusers,
getusersById,
updateUser,
deleteuser,
loginUser
};
