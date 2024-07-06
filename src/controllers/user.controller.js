import Users from "../models/user.models.js";
import moment from "moment";

export const getUsers = async (req, res, next) => {
  try {
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    let users = await Users.find({ role: "customer" })
      .select("-password -__v")
      .populate("cart shipping")
      .sort({ [sortBy]: sortOrder });

    let response = {
      success: "true",
      statuscode: 200,
      data: users,
      message: "success",
    };
    res.json(response);
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};
export const getMe = async (req, res, next) => {
  try {
    let user = await Users.findById(req.user.id)
      .select("-password -v")
      .populate("cart shipping");
    let response = {
      success: "true",
      statuscode: 200,
      data: user,
      message: "success",
    };
    res.json(response);
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};

export const getUsersById = async (req, res, next) => {
  const id = req.params.id;
  try {
    let users = await Users.findById(id).select("email role");
    let response = {
      success: "true",
      statuscode: 200,
      data: users,
      message: "success",
    };
    res.json(response);
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};
export const UpdateUserProfileImage = async (req, res, next) => {
  const id = req.user.id;
  const { ProfileImage } = req.body;
  try {
    const user = await Users.findById(id);
    if (!user) {
      let response = {
        statuscode: 400,
        data: [],
        error: [error],
        message: "something failed",
      };
      return res.json(response);
    }

    const updatedUser = await Users.findByIdAndUpdate(
      id,
      {
        $set: {
          profile: {
            gender: user?.profile?.gender,
            dateOfBirth: user?.profile?.dateOfBirth,
            age: user?.profile?.age,
            state: user?.profile?.state,
            lag: user?.profile?.lag,
            country: user?.profile?.country,
            address: user?.profile?.address,
            city: user?.profile?.phone,
            phone: user?.profile?.phone,
            isVerified: user?.profile?.isVerified,
            instagram: user?.profile?.instagram,
            facebook: user?.profile?.facebook,
            tiwtter: user?.profile?.tiwtter,
            linkedin: user?.profile?.linkedin,
            bio: user?.profile?.bio,
            profileImage: {
              url: ProfileImage.url,
              public_id: ProfileImage.public_id,
              asset_id: ProfileImage.asset_id,
              secure_url: ProfileImage.secure_url,
              thumbnail_url: ProfileImage.thumbnail_url,
            },
          },
        },
      },
      {
        new: true,
      }
    ).select("-password -properties");
    if (updatedUser) {
      let response = {
        success: "true",
        statuscode: 200,
        data: updatedUser,
        message: "success",
      };
      res.json(response);
    }
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: "something failed" + error,
    };
    return res.json(response);
  }
};
export const UpdateUserProfile = async (req, res, next) => {
  const id = req.user.id;
  const {
    gender,
    dateOfBirth,
    state,
    lag,
    country,
    address,
    phone,
    isVerified,
    uploadCount,
    city,
    instagram,
    facebook,
    tiwtter,
    linkedin,
    bio,
    postcode,
  } = req.body.profileData;

  try {
    const user = await Users.findById(id);
    if (!user) {
      let response = {
        statuscode: 400,
        data: [],
        error: [error],
        message: "something failed",
      };
      return res.json(response);
    }

    const updatedUser = await Users.findByIdAndUpdate(
      id,
      {
        $set: {
          profile: {
            uploadCount: uploadCount,
            gender: gender,
            dateOfBirth: moment.utc(dateOfBirth).format("YYYY-MM-DD"),
            age: moment().diff(moment(dateOfBirth), "years"),
            state: state,
            lag: lag,
            country: country,
            address: address,
            phone: phone,
            city: city,
            isVerified: isVerified,
            instagram: instagram,
            facebook: facebook,
            tiwtter: tiwtter,
            linkedin: linkedin,
            bio: bio,
            postcode: postcode,
            profileImage: {
              url: user?.profile?.profileImage.url,
              public_id: user?.profile?.profileImage.public_id,
              asset_id: user?.profile?.profileImage.asset_id,
              secure_url: user?.profile?.profileImage.secure_url,
              thumbnail_url: user?.profile?.profileImage.thumbnail_url,
            },
          },
        },
      },
      {
        new: true,
      }
    ).select("-password -properties");
    if (updatedUser) {
      let response = {
        success: "true",
        statuscode: 200,
        data: updatedUser,
        message: "success",
      };
      res.json(response);
    }
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: "something failed" + error,
    };
    return res.json(response);
  }
};
export const removeOneUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    let user = await Users.findByIdAndRemove(id).select("-password");
    // await user.remove();
    let response = {
      success: "true",
      statuscode: 200,
      data: user,
      message: "success",
    };
    res.json(response);
  } catch (error) {
    let response = {
      statuscode: 400,
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};
