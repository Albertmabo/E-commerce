import app from "./app.js"

const PORT = 4000

const start = async() =>{
    try{
        app.listen(PORT, ()=>{
            console.log(`Server is running in PORT ${PORT}`);
            
        })

    }catch(error){
        console.log(error);
        

    }


}


start();