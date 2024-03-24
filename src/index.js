const app = require('./app');
const { PORT } = require('./config');
const { connectTodb } = require('./app/db');

app.listen(PORT,async ()=>{
    try{
        await connectTodb();
        console.log(`server running on http://localhost:${PORT}`);
    }catch(e){
        console.log(e.message);
        process.exit(1);
    }
});

