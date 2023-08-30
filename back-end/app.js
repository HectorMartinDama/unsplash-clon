const express= require('express');  
const cors= require('cors');
const http= require('http');
const mongoose= require('mongoose');    
const fileUpload= require('express-fileupload');
require('dotenv').config()


// routers
const postRouter= require('./routers/postRouter.js');   
const userRouter= require('./routers/userRouter.js');
const categoryRouter= require('./routers/categoryRouter.js');

const PORT= process.env.PORT || 5000;
const MONGO_URI= process.env.MONGO_URI;
const app= express();

app.use(cors());
// TODO: Pongo de limite 50mb porque envio las imagenes de los posts en base64
app.use(express.json({ limit: '50mb' }));
app.use(fileUpload());  
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
const server= http.createServer(app);


app.get('/health', (req, res) =>{
    res.json({"status": "ok"})
});

app.use((req, res) =>{
    res.status(404).send("Endpoint not found");
});

server.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});

mongoose.connect(MONGO_URI).then(() =>{
    console.log("Connected to MongoDB");
}).catch((err) =>{
    console.log(`Error connecting to MongoDB: ${err}`);
});