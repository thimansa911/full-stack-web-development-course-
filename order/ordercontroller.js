import PackageModel from "../package/packagemodel.js";
import Order from "./ordermodel.js"


export async function createOrder(req,res) {
    try{ 
    if(req.user == null){
        return res.status(401).json({message : "Please Login to place order"});
    }
    // CBC00202 
    
    const lastOrder = await Order.find().sort({date : -1}).limit(1);

    let orderid = "CBC00202"

    if (lastOrder.length > 0){
        const lastOrderIDinString = lastOrder[0].OrderID;
        const lastOrderIDwithoutprefix = lastOrderIDinString.replace("CBC", "");
        const lastOrderIDinInteger = parseInt(lastOrderIDwithoutprefix);
        const newOrderIDinInteger = lastOrderIDinInteger + 1;
        const newOrderIdwithoutprefix = newOrderIDinInteger.toString().padStart(5, "0");
        orderid = "CBC" + newOrderIdwithoutprefix;

        const items = [];
        let totallyPrice = 0;
        if(req.body.items !== null && Array.isArray(req.body.items)){
            for (let i = 0; i < req.body.items.length; i++){

                let item = req.body.items[i];

                let pkg = await PackageModel.findOne({
                    PackageID : item.PackageID
                });

                if(pkg == null){
                    return res.status(400).json({message : `Package with ID ${item.PackageID} not found`});
                }

                items[i] = {
                packageID : pkg.PackageID,
                PackageName : pkg.PackageName,
                PackageImage : pkg.PackageImage,
                PackagePrice : pkg.PackagePrice,
                qty : item.qty
            }
                totallyPrice += pkg.PackagePrice * item.qty;

        }
            
        }else{
            return res.status(400).json({message : "Invalid items format"});
        }

        const newOrder = new Order({
            orderiD : orderid, 
            email : req.user.email,
            name : req.user.firtname + " " + req.user.lastname,
            address : req.body.address,
            phone : req.body.phone,
            items : items,
            notes : req.body.notes,
            totalPrice : totallyPrice
        });
        await newOrder.save();
        return res.status(201).json({message : "Order Placed Successfully", orderID : orderid});
     } 
    }catch(error){
        return res.status(500).json({message : "Internal Server Error"});
    }
}

export async function getOrders(req,res) {
    if (req.user.role == null){
        return res.status(401).json({message : "Please Login to view orders"});
    }

try{
    if (req.user == "admin"){
        const orders = await Order.find().sort({date : -1});
        res.json(orders)
    }else{
        const orders = await Order.find({email : req.user.email}).sort({date : -1});
        res.json=(orders);
    }
}catch (error) {
        console.error("Error fetching order info:", error.message, error.stack);
        res.status(500).json({ message: "Internal server error while getting order Info" });
    }
    
}