var knex = require('knex')({

  client: 'postgresql',
  connection: {
    host: 'localhost',
    user: 'labber',
    password: 'labber',
    database: 'midterm',
    port: 5432
  }
});

module.exports = function makeSpecResourceMovers(knex) {

function loadResources() {
    return knex
    .select().from('resources')

    .then((rows) => {
      var promises = []
      rows.forEach(function(row) {
       let a = knex.select('id', 'users.username').from('users').where('id', row.user_id).then((user)=>{
         row.user = users;
        })
       promises.push(a);
       let b = knex.select('comments.content as message', 'comments.created_at').from('comments').join('users', 'comments.user_id', 'users.id').where('comments.resource_id', row.id).then((comments)=>{
          row.comments = comments;
       })
       promises.push(b);
       let c = knex.select('tags.name').from('tags').join('resource_tags', 'resource_tags.tag_id', 'tags.id').where('resource_tags.resource_id', row.id).then((tags)=>{
          row.tags = tags;
       })
       promises.push(c);
     })
     return Promise.all(promises).then(()=>{
        console.log(rows)
        return rows;
      })
    });
  }
 }
