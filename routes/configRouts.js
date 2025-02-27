const vinylR = require ('./vinyls')
const userR = require ('./users')

const routes = (app) =>{
    
    app.use('/vinyl', vinylR);
    app.use('/user', userR);
    
}
module.exports = routes;
