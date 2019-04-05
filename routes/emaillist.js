const express = require( 'express' );
const Email = require( '../models/Email' );

const router = express.Router();

router.route('/form').get(function(req, res, next){
    res.render('form', null);
});

router.route('/add').post(function(req, res, next){
    Email.create( req.body );
    res.redirect('/');
});

router.route(/.*/).get(function(req, res, next){
    Email.find({

    }, [
        'firstName', 'lastName', 'email'
    ], {
        sort: {
            _id: -1
        }
    },function(err, emails){
            if(err){
                next(err);
                return;
            }
            res.render('list', {
                emails: emails
            });
    });
});


module.exports = router;