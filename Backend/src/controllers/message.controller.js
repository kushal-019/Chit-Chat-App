import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersSidebarController = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filterdUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json(filterdUser);
  } catch (error) {
    console.log("Error in getUsersForSidebar : ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessagesController = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;

    const myId = req.user._id;

    const chat = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: userToChatId,
        },
        {
          senderId: userToChatId,
          receiverId: myId,
        },
      ],
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log("Error in getMessagesController : ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessagesController = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadImage.secure_url;
    }
    
    const newmsg = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newmsg.save();

    // todo : realtime funtionality of chat Socket.io

    return res.status(200).json(newmsg);
  } catch (error) {
    console.log("Error in sendMessagesController : ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
