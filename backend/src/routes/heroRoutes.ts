const heroController = require("../controllers/heroController");
const router = require("express").Router();

router.get("/", heroController.getHeroes);
router.get("/:id", heroController.getHeroById);
router.post("/", heroController.addHero);
router.put("/:id", heroController.updateHero);
router.delete("/:id", heroController.deleteHero);
router.get(
	"/test",
	(_req: any, res: { json: (arg0: { message: string }) => any }) =>
		res.json({ message: "API fonctionne !" })
);

module.exports = router;
