const request=require('request')
exports.crop_service=(req,res,next) => {
            console.log('dfvg')
 
      request.get("http://localhost:5000/services/crop_available",(error,response,body)=>
         {
             if(error){
                 return console.dir(error);
             }
            else{
                res.render('../views/displayamazonservice.ejs', { context: body })
                
            } 
         }
         
         )
         console.log('end')

}
// const axios = require('axios')

// exports.crop_service = async (request,response,next) => {
//     let res = await axios.get('http://localhost:5000/services/crop_available');
//     console.log(res.data)
//     //context={"context":res.data }
    
//     response.render('../views/displayamazonservice.ejs', {context:res.data})
// }