const validateWebhook = (req, res, next) => {
  const { message, settings } = req.body;

  if (!message || typeof message !== "string") {
    return res
      .status(400)
      .json({ status: "error", message: "Message must be a non-empty string" });
  }

  if (!Array.isArray(settings)) {
    return res
      .status(400)
      .json({ status: "error", message: "Settings must be an array" });
  }

  next(); // Move to the next middleware/controller
};

export default validateWebhook;
