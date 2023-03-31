const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../util/withAuth');

router.get('/', withAuth, async (req, res) => {
    try {
        const commentsdata = await Comment.findAll({
        include: [
            {
                model: Comment,
                attributes: ['description', 'id'],
            }
        ],  
        });
    const comments = commentsdata.map((commenting) =>
    commenting.get({ plain: true })
    );
    res.render('homepage', {
        comments,
        loggedIn: req.session.loggedIn
    });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
    });

    router.get('/comment/:id', async (req, res) => {
        if (!req.session.loggedIn) {
            res.redirect('/login');
        } else {
            try {
                const commentsdata = await Comment.findByPK(req.params.id, {
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
                const comments = commentsdata.get({ plain: true });
                res.render('comments', { comments, loggedIn: req.session.loggedIn});
            } catch (err) {
                console.error(err);
                res.status(500).json(err);
            }
            }
        });


module.exports = router;
