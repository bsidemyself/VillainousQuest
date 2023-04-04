const router = require("express").Router();

const withAuth = require("../../util/withAuth");

// const quest = require('models\Quest.js');
const { Quest } = require("../../models");
const { User } = require("../../models/");

router.get("/", async (req, res) => {
  try {
    const questdata = await Quest.findAll({
      attributes: {
        order: [
          "id",
          "quest_title",
          "quest_setting",
          "quest_challenge",
          "description",
        ],
      },
    });
    const quests = questdata.map((quest) => quest.get({ plain: true }));
    res.render("dashboard", {
      quests,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const questdata = await Quest.findByPK(req.params.id, {
        include: [
          {
            model: Quest,
            attributes: [
              "description",
              "id",
              "quest_title",
              "quest_setting",
              "quest_challenge",
            ],
            // },
            // {
            //     model: User,
            //     attributes: [
            //         'id',
            //         'description',
            //     ],
            // },
          },
        ],
      });
      const quests = questdata.get({ plain: true });
      res.render("quests", { quests, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
});

router.post("/", async (req, res) => {
  try {
    // Conflict is within 72 and 75. Console log 
    const questdata = await Quest.create({
      ...req.body,
      "user_id": req.session.user_id,
    });
    res.status(200).json(questdata);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const questdata = await Quest.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!questdata) {
      res
        .status(404)
        .json({ message: "Invalid quest ID, please try another one" });
    }
    res.status(200).json(questdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
