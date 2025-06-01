const Notification = require("../models/notificationModel");

// Fetch all notifications for the logged-in user
const getallnotifs = async (req, res) => {
  try {
    const userId = req.user.userId; // Ensure `userId` is properly extracted from `req.user`
    const notifs = await Notification.find({ userId }).sort({ createdAt: -1 }); // Sorted by most recent
    res.status(200).json(notifs);
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ message: "Unable to get notifications" });
  }
};

// Create a new notification
const postNotification = async (req, res) => {
  try {
    const { content, userId } = req.body;
    if (!content || !userId) {
      return res.status(400).json({ message: "Content and User ID are required" });
    }
    const newNotification = new Notification({
      userId,
      content,
    });
    const savedNotification = await newNotification.save();
    console.log(savedNotification)
    return res.status(201).json(savedNotification);
  } catch (error) {
    console.error("Error creating notification:", error.message);
    res.status(500).json({ message: "Unable to post notification" });
  }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error("Error marking notification as read:", error.message);
    res.status(500).json({ message: "Unable to mark notification as read" });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error.message);
    res.status(500).json({ message: "Unable to delete notification" });
  }
};

module.exports = {
  getallnotifs,
  postNotification,
  markAsRead,
  deleteNotification,
};
