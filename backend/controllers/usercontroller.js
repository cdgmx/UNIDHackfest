
//future purposes, not being used

var client = "users"
var client_id = "qwerqwe"
// var qrkey = "135"
var QRCode = require('qrcode');

router //for gettin and updating
    .route('/qr')
    .get(async (req,res) =>{
        try{
            //needed client_id
            let client_id = req.body.client_id
            let data = await dboperations.getClientInfo("users",'client_id',client_id)
            if(data){
                console.log("data sent")
                // let qr = await QRCode.toString(`${data.qrkey}`,{type:'svg'})
                res.send(data.qr)
            }
            else{
                throw "error in getClientInfo"
            }
        }
        catch(error) {
            console.log(error)
            res.status(401).send({message:error});
        }
    })
        .put((req,res) =>{
            try{
                //needed qrkey
                let qrkey = req.body.qrkey
                dboperations.putClientInfo('users','qrkey',qrkey, 'client_id',client_id)
                res.send("success") //change later
            }
            catch(error) {
                console.log(error)
                res.status(401).send({message:error});
            }
        })
router
    .route('/info')
    .get(async (req,res) =>{
        try{
            //needed qrkey 
            let qrkey = req.body.qrkey
            let data = await dboperations.getClientInfo("users",'qrkey',qrkey,'client_id','admins')
            if(data){
                data.qr = await QRCode.toString(`${qrkey}`,{type:'svg'})
                res.send(data)
            }
            else{
                console.log("info sent")
                throw "error in getClientInfo"
            }
        }
        catch(error) {
            console.log(error)
            res.status(401).send({message:error});
        }
    })
router
    .route('/history')
    .get(async (req,res) =>{
        try{
             //needed client_id of user
            let client_id = req.body.client_id
            let data = await dboperations.getScanned(client_id,'user_id','admin_id','admins')
            if(data){
                console.log("history sent")
                res.send(data)
            }
            else{
                throw "error in getClientInfo"
            }
        }
        catch(error) {
            console.log(error)
            res.status(401).send({message:error});
        }
    })
module.exports = router
=======
  .route("/qr")
  .get(async (req, res) => {
    try {
      let data = await dboperations.getClientInfo(
        client,
        "qrkey",
        qrkey,
        "client_id",
        client_id
      );
      if (data) {
        let qr = await QRCode.toString(`${qrkey}`, { type: "svg" });
        res.send({ qr: qr });
      } else {
        throw "error in getClientInfo";
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({ message: error });
    }
  })
  .put((req, res) => {
    try {
      dboperations.putClientInfo(
        "users",
        "qrkey",
        qrkey,
        "client_id",
        client_id
      );
    } catch (error) {
      console.log(error);
      res.status(401).send({ message: error });
    }
  });
router.route("/info").get(async (req, res) => {
  try {
    let data = await dboperations.getClientInfo(
      client,
      "qrkey",
      qrkey,
      "client_id",
      "admins"
    );
    if (data) {
      data.qr = await QRCode.toString(`${qrkey}`, { type: "svg" });
      res.send(data);
    } else {
      throw "error in getClientInfo";
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: error });
  }
});
router.route("/history").get(async (req, res) => {
  try {
    let data = await dboperations.getScanned(
      client_id,
      "user_id",
      "admin_id",
      "admins"
    );
    if (data) {
      res.send(data);
    } else {
      throw "error in getClientInfo";
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: error });
  }
});

module.exports = router;

