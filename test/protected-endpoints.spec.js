const knex=require('knex');
const app=require('../src/app');
const helpers=require('./test-helpers');

describe('Things Endpoints',function(){
	let db;
	const {testUsers,testThings}=helpers.makeThingsFixtures();

	before('make knex instance',()=>{
		db=knex({
			client:'pg',
			connection:process.env.TEST_DB_URL,
		});
		app.set('db',db);
	});

	after('disconnect from db',()=>db.destroy());

	before('cleanup',()=>helpers.cleanTables(db));

	afterEach('cleanup',()=>helpers.cleanTables(db));
	
	beforeEach(()=>helpers.seedThingsTables(db,testUsers,testThings));

	describe(`Protected endpoints`,()=>{
		const protectedEndpoints=[
			{
				name:'GET /api/things/:thing_id',
				path:'/api/things/1'
			},
			{
				name:'GET /api/things/:thing_id/reviews',
				path:'/api/things/1/reviews'
			},
		]
		protectedEndpoints.forEach(endpoint=>{
			describe(endpoint.name,()=>{
				it(`responds with 401 'Missing basic token' when no basic token`,()=>{
					return supertest(app)
					.get(endpoint.path)
					.expect(401,{error:`Missing basic token`});
				});
				it(`responds 401 'Unauthorized request' when no credentials in token`,()=>{
					const userNoCreds={user_name:'',password:''};
					return supertest(app)
						.get(endpoint.path)
						.set('Authorization',helpers.makeAuthHeader(userNoCreds))
						.expect(401,{error:`Unauthorized request`});
				});
				it(`responds 401 'Unauthorized request' when invalid user`, () => {
					const userInvalidCreds={user_name:'user-not',password:'existy'};
					return supertest(app)
						.get(endpoint.path)
						.set('Authorization',helpers.makeAuthHeader(userInvalidCreds))
						.expect(401,{error:`Unauthorized request`});
				});
				it(`responds 401 'Unauthorized request' when invalid password`, () => {
					const userInvalidPass={user_name:testUsers[0].user_name,password:'wrong'};
					return supertest(app)
						.get(endpoint.path)
						.set('Authorization',helpers.makeAuthHeader(userInvalidPass))
						.expect(401,{error:`Unauthorized request`});
				})
			});
		});
		describe('POST /api/reviews',()=>{
			it('should return 401 \'Missing basic token\' when missing basic token',()=>{
				return supertest(app)
					.post('/api/reviews')
					.expect(401,{error:'Missing basic token'});
			});
			it('should return 401 \'Unauthorized request\' when no credentials exist',()=>{
				const userNoCreds={user_name:'', password:''};
				return supertest(app)
					.post('/api/reviews')
					.set('Authorization', helpers.makeAuthHeader(userNoCreds))
					.expect(401,{error:'Unauthorized request'});
			});
			it('should return 401 \'Unauthorized request\' when invalid user',()=>{
				const invalidUser={user_name:'badUser',password:''};
				return supertest(app)
					.post('/api/reviews')
					.set('Authorization',helpers.makeAuthHeader(invalidUser))
					.expect(401,{error:'Unauthorized request'});
			});
			it('should return 401 \'Unauthorized request\' when invalid password',()=>{
				const userWithBadPassword={user_name:testUsers[0].user_name,password:'badPassword'};
				return supertest(app)
					.post('/api/reviews')
					.set('Authorization',helpers.makeAuthHeader(userWithBadPassword))
					.expect(401,{error:'Unauthorized request'});
			});
		});
	});
});
