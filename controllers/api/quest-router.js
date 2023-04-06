const router = require("express").Router();

const withAuth = require("../../util/withAuth");

// const quest = require('models\Quest.js');
const { Quest } = require("../../models");
const { User } = require("../../models/");
const { update } = require("../../models/User");

router.get("/", async (req, res) => {
  try {
    const questdata = await Quest.findAll({
      attributes: {
        order: [
          "user_id",
          "quest_title",
          "quest_setting",
          "quest_challenge",
          "quest_text",
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
              "quest_text",
              "user_id",
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

router.post("/quests", ({body}, res) => {
  res.send("dashboard", {
    Quest,
    loggedIn: req.session.loggedIn,
  });
    // Conflict is within 72 and 75. Console log 
 Quest.create(body)
 .then(dbQuest => {
  res.json(dbQuest);
 })
 .catch(err => {
  res.status(404).json(err);
 });

});

router.post("/", ({body}, res) => {
  Quest.bulkCreate(body)
  .then(dbQuest => {
    res.json(dbQuest);
  })
.catch(err => {
  res.status(404).json(err);
});
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
