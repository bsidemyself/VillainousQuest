const router = require('express').Router();

// const withAuth = require('../../util/withAuth');

// const quest = require('models\Quest.js');
const { Quest } = require('../../models');
const { User } = require('../../models/');

router.get('/', async (req, res) => {
    try {
        const quest = await Quest.findAll({
        include: [
            {
                model: Quest,
                attributes: ['description', 'id', 'quest_title', 'quest_setting', 'quest_challenge'],
            },
            {
                model: User,
                attributes: ['user_id'],
            },
        ],
        });
    const quests = Quest.map((quest) =>
    quest.get({ plain: true }));
    res.render('homepage', {
        quests,
        loggedIn: req.session.loggedIn
    });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
    });

    router.get('/quest/id', async (req, res) => {
        if (!req.session.loggedIn) {
            res.redirect('/login');
        } else {
            try {
                const questdata = await Quest.findByPK(req.params.id, {
                    include: [
                        {
                            model: Quest,
                            attributes: ['description', 'id', 'quest_title', 'quest_setting', 'quest_challenge', ],
                        },
                        {
                            model: User,
                            attributes: [
                                'id',
                                'description',
                            ],
                        },
                    ],
                });
                const quests = questdata.get({ plain: true });
                res.render('quests', { quests, loggedIn: req.session.loggedIn});
            } catch (err) {
                console.error(err);
                res.status(500).json(err);
            }
            }
        });

        

module.exports = router;