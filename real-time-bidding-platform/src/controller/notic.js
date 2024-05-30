const { getNotificationsByUserId, createNotification, markNotificationsAsRead } = require('../models/notificationModel');

exports.getNotifications = async (req, res) => {
  const userId = req.user.id;
  try {
    const notifications = await getNotificationsByUserId(userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  const userId = req.user.id;
  try {
    await markNotificationsAsRead(userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
