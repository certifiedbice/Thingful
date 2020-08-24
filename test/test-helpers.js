const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

function makeUsersArray(){
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      nickname: 'TU1',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      nickname: 'TU2',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      nickname: 'TU3',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      nickname: 'TU4',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}

function makeThingsArray(users){
  return [
    {
      id: 1,
      title: 'First test thing!',
      image: 'http://placehold.it/500x500',
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      title: 'Second test thing!',
      image: 'http://placehold.it/500x500',
      user_id: users[1].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      title: 'Third test thing!',
      image: 'http://placehold.it/500x500',
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      title: 'Fourth test thing!',
      image: 'http://placehold.it/500x500',
      user_id: users[3].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}

function makeReviewsArray(users,things){
  return [
    {
      id: 1,
      rating: 2,
      text: 'First test review!',
      thing_id: things[0].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      rating: 3,
      text: 'Second test review!',
      thing_id: things[0].id,
      user_id: users[1].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      rating: 1,
      text: 'Third test review!',
      thing_id: things[0].id,
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      rating: 5,
      text: 'Fourth test review!',
      thing_id: things[0].id,
      user_id: users[3].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 5,
      rating: 1,
      text: 'Fifth test review!',
      thing_id: things[things.length - 1].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 6,
      rating: 2,
      text: 'Sixth test review!',
      thing_id: things[things.length - 1].id,
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 7,
      rating: 5,
      text: 'Seventh test review!',
      thing_id: things[3].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ];
}

function makeExpectedThing(users,thing,reviews=[]){
  const user = users
    .find(user => user.id === thing.user_id)

  const thingReviews = reviews
    .filter(review => review.thing_id === thing.id)

  const number_of_reviews = thingReviews.length
  const average_review_rating = calculateAverageReviewRating(thingReviews)

  return {
    id: thing.id,
    image: thing.image,
    title: thing.title,
    content: thing.content,
    date_created: thing.date_created,
    number_of_reviews,
    average_review_rating,
    user: {
      id: user.id,
      user_name: user.user_name,
      full_name: user.full_name,
      nickname: user.nickname,
      date_created: user.date_created,
    },
  }
}

function calculateAverageReviewRating(reviews){
  if(!reviews.length) return 0

  const sum = reviews
    .map(review => review.rating)
    .reduce((a, b) => a + b)

  return Math.round(sum / reviews.length)
}

function makeExpectedThingReviews(users,thingId,reviews){
  const expectedReviews = reviews
    .filter(review => review.thing_id === thingId)

  return expectedReviews.map(review => {
    const reviewUser = users.find(user => user.id === review.user_id)
    return {
      id: review.id,
      text: review.text,
      rating: review.rating,
      date_created: review.date_created,
      user: {
        id: reviewUser.id,
        user_name: reviewUser.user_name,
        full_name: reviewUser.full_name,
        nickname: reviewUser.nickname,
        date_created: reviewUser.date_created,
      }
    }
  })
}

function makeMaliciousThing(user){
  const maliciousThing = {
    id: 911,
    image: 'http://placehold.it/500x500',
    date_created: new Date().toISOString(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    user_id: user.id,
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  }
  const expectedThing = {
    ...makeExpectedThing([user], maliciousThing),
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousThing,
    expectedThing,
  }
}

function makeThingsFixtures(){
  const testUsers=makeUsersArray();
  const testThings=makeThingsArray(testUsers);
  const testReviews=makeReviewsArray(testUsers,testThings);
  return {testUsers,testThings,testReviews};
}

function cleanTables(db){
  return db.raw(
    `TRUNCATE
      thingful_things,
      thingful_users,
      thingful_reviews
      RESTART IDENTITY CASCADE`
  )
}

function seedUsers(db,users){
	const preppedUsers = users.map(user=>({
		...user,
		password:bcrypt.hashSync(user.password,1)
	}));
	return db.into('thingful_users').insert(preppedUsers)
	  .then(()=>
	    // update the auto sequence to stay in sync
	    db.raw(
	    	`SELECT setval('thingful_users_id_seq', ?)`,
	    	[users[users.length - 1].id],
	    )
	);
}

function seedThingsTables(db,users,things,reviews=[]){
  return db
    .into('thingful_users')
    .insert(users)
    .then(() =>
      db
        .into('thingful_things')
        .insert(things)
    )
    .then(() =>
      reviews.length && db.into('thingful_reviews').insert(reviews)
    )
}

function seedMaliciousThing(db,user,thing){
  return db
    .into('thingful_users')
    .insert([user])
    .then(() =>
      db
        .into('thingful_things')
        .insert([thing])
    )
}

function makeAuthHeader(user,secret=process.env.JWT_SECRET){
	// const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64')
	const token=jwt.sign({user_id:user.id},secret,{subject:user.user_name,algorithm:'HS256'});
	// return `Basic ${token}`
	return `Bearer ${token}`;
}

module.exports={
	makeUsersArray,
	makeThingsArray,
	makeExpectedThing,
	makeExpectedThingReviews,
	makeMaliciousThing,
	makeReviewsArray,
	makeThingsFixtures,
	cleanTables,
	seedUsers,
	seedThingsTables,
	seedMaliciousThing,
	makeAuthHeader
}
