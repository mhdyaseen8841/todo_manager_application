import User from "../models/userSchema.js";
import generateToken from "../utils/generateToken.js";

const addUserDetails = async (req, res) => {
  const { email } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        msg: "user already exist",
      });
    }
    const newUser = await User.create(req.body);
    return res.status(201).json({
      msg: "User added succesfully",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(400).json({
        status: "failed",
        success: false,
        message: "User not found",
      });
    }

    if (await existUser.matchPassword(password)) {
      return res.status(200).json({
        status: "success",
        success: true,
        message: "login success",
        data: {
            name:existUser.name,
            token:generateToken(existUser._id)}
      });
    } else {
        return  res.status(400).json({
        status: "failed",
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (err) {
    console.log(err);
    return  res.status(400).json({
        status: "failed",
        success: false,
        message: "Error Occured",
        data:err,
    });
  }
};

export { addUserDetails, userLogin };
