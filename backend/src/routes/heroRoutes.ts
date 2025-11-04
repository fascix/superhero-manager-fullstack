const express = require("express");
const heroController = require("../controllers/heroController");

const router = express.Router();

router.get("/", heroController.getHeroes);
router.get("/:id", heroController.getHeroById);
router.post("/", heroController.addHero);
router.put("/:id", heroController.updateHero);
router.delete("/:id", heroController.deleteHero);

module.exports = router;
