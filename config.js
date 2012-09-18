module.exports = function(){
	console.log("loaded config.js  ....")
    switch(process.env.NODE_ENV){
        case 'dev':
            return {static_path:"/root/daduce_static",
            		db_path:"mongodb://localhost/dev_db",
            		port:8080};

        case 'production':
        	console.log("Found Production")
            return {static_path:"/root/daduce_static",
            		db_path:"mongodb://localhost/prod_db",
            		port:80};
            		
        case 'wroscoe':
        	console.log("Reading wroscoe config setting")
            return {static_path:"/home/wroscoe/daduce_static",
            		db_path:"mongodb://localhost/prod_db",
            		port:8080};
        
        default:
            console.log("REached Default Config")
            return {};
    }
};