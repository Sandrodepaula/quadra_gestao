const { Router } = require("express");
const router = Router();

router.get("/status", (req, res) => {
  res.json({ ok: true, message: "Auth module initialized" });
});

module.exports = router;
