
const imageController = require("../app/http/controller/image/image.controller");


exports.routesConfig = function(app){
    
    // get all the images later implement pagination
    app.get("/", [imageController.getImages]);

    // get data of image with :id
    app.get("/show/:id", [imageController.getImage]);

    // upload a new image
    app.post("/", [imageController.uploadImage]);
    
    // update an old image
    app.put("/:id/edit", (req, res)=>{

    });

    // delete the image
    app.delete("/delete/:id", [imageController.deleteImage]);

}