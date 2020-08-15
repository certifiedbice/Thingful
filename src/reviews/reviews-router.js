const express=require('express');
const path=require('path');
const ReviewsService=require('./reviews-service');
const {requireAuth}=require('../middleware/basic-auth');
const reviewsRouter=express.Router();
const jsonBodyParser=express.json();

reviewsRouter
	.route('/')
	.post(requireAuth,jsonBodyParser,(req,res,next)=>{
		const {thing_id,rating,text}=req.body;
		const newReview={thing_id,rating,text};
		for(const [key,value] of Object.entries(newReview))
			if(value==null)
				return res.status(400).json({
					error:`Missing '${key}' in request body`
				});
		newReview.user_id=req.user.id;
		ReviewsService.insertReview(
			req.app.get('db'),
			newReview
		)
		.then(review=>{
			res
				.status(201)
				.location(path.posix.join(req.originalUrl,`/${review.id}`))
				.json(ReviewsService.serializeReview(review))
		})
		.catch(next);
	});

module.exports=reviewsRouter;