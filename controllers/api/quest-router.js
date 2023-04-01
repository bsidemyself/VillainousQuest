const router = require('express').Router();

// const withAuth = require('../../util/withAuth');

// const quest = require('models\Quest.js');
const { Quest } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const questdata = await Quest.findAll({
        include: [
            {
                model: Comment,
                attributes: ['description', 'id'],
            }
        ],  
        });
    const quests = questdata.map((questing) =>
    questing.get({ plain: true })
    );
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
                            model: Comment,
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