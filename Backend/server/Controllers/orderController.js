import express from "express";
import db from "../../config/db.js";

export async function getOrders(req, res){
   try{
     if(req.user.role === "admin"){
        
        const orders = await db.query(
            `Select o.id, o.dish_name, o.quantity, o.total_price, o.status, u.name as student_name, u.email
            from orders o
            Join users u on o.student_id = u.id
            `
        );
 
        return res.json({
            message: "Fetched all orders successfully",
            orders: orders.rows
        });
     }
     else if(req.user.role === "student"){

        const orders = await db.query(
            `Select o.id, o.dish_name, o.quantity , o.status 
            from orders o
            where o.student_id = $1`,
            [req.user.id]
        );
        return res.json({
            message: "Fetched your orders Successfully",
            orders: orders.rows
        }); 
     }

     else{
        return res.status(500).json({error:"Unauthorized role"})
     }
   }
   catch(err){
      res.status(500).json({error: "Failed to reach orders"});
   }
}

export async function getStudentOrders(req, res) {
  try {
    const orders = await db.query(
      `SELECT 
         id, 
         dish_name, 
         image,
         quantity, 
         total_price, 
         status, 
         created_at
       FROM orders
       WHERE student_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]   // 👈 comes from JWT payload
    );

    return res.json({
      message: "Fetched your orders successfully",
      orders: orders.rows
    });
  } catch (err) {
    console.error("Error fetching student orders:", err);
    res.status(500).json({ error: "Failed to fetch student orders" });
  }
}


export async function createOrder(req, res){
    try{

        if(req.user.role !== "student"){
            return res.status(403).json({error: "Only students can place orders"});
        }

        const {dish_name, quantity, total_Price} = req.body;

        if(!dish_name || !quantity){
            return res.status(400).json({error: " Items and quantity are required."})
        }

        const newOrder = await db.query(
            `Insert into orders (student_id, dish_name, quantity, total_price)
            values ($1, $2, $3, $4)
            returning *`,
            [req.user.id, dish_name, quantity , total_Price]
        );

        res.json({
             message: "Order placed successfully",
             order: newOrder.rows[0]
        })
    }
    catch(err){
        console.log("Error creating order:", err);
        res.status(500).json({error: "Failed to place Order"});
    }
}


export async function getSingleOrder(req,res){
    const {id} = req.params;

    try{

    if(req.user.role === "admin"){

        const order = await db.query("Select * from orders where id = $1",
            [id]
        );
        return res.json(order.rows[0]);
    }

    else{
        const order = await db.query("Select * from orders where id = $1 and student_id = $2",
            [id, req.user.id]
        );

        return res.json(order.rows[0]);
    }
  }

  catch(err){
    console.log(err)
    return res.status(500).json({error: "Failed to fetch a specific order"});
  }
}

export async function updateOrder(req,res){
 
    const {id} = req.params;
    const {quantity, status} = req.body;

    if(req.user.role === "admin" && !["pending", "preparing", "ready", "completed", "cancelled"].includes(status)){
        return res.status(400).json({error: "Invalid status value"});
    }

    try{

    if(req.user.role === "student"){

        const updated = await db.query(`Update orders set quantity = $1 where id = $2 and student_id = $3 and status = 'pending'
            returning * `,
        [quantity, id, req.user.id]
    );  
    return res.json(updated.rows[0]);
    }
    else if(req.user.role === "admin"){
        
        const updated = await db.query(
            `Update orders set status = $1 where id = $2 returning *`,
            [status, id]
        );
        return res.json(updated.rows[0]);
    }
}
  catch(err){
    console.log("update:",err);
    return res.status(404).json({error: "Update is not working"})
  }
}

export async function updateOrderStatus(req,res) {
    const {id} = req.params;
    const {status} = req.body;

    const allowedStatus = [
        "pending",
        "preparing",
        "ready",
        "completed"
    ];

    if(!allowedStatus.includes(status)){
        return res.status(400).json({
            error: "Invalid order status"
        });
    }

    try{
       const result = await db.query(
        `Update orders set status = $1 where id = $2 returning *`,
        [status,id]
       );

       if(result.rows.length === 0){
        return res.status(404).json({
            error: "Order not found"
        });
       }

       res.json({
        message: "Order status updated",
        order: result.rows[0]
       });
    }
    catch(err){
       console.log("Update order status: ", err);

       res.status(500).json({
        error: "Failed to update order status"
       });
    }
}

export async function deleteOrder(req,res){
    const {id} = req.params;

    try{

    if(req.user.role === "student"){
        const remove = await db.query(`delete from orders where id = $1 and student_id = $2 and status ='pending'
            returning *`,
            [id, req.user.id]
        );
        console.log("Delete attempt:", {id, userId: req.user.id});
        if(remove.rows.length === 0){
            return res.status(403).json({error: "You can only cancel your own pending order."})
        }

        return res.json({
            message: "Order cancelled successfully", 
            order: remove.rows[0]   
        })
    }
     else if(req.user.role === "admin"){
            const remove = await db.query(
                `Delete from orders where id = $1 returning *`,
                [id]
            );

          if(remove.rows.length === 0){
            return res.status(404).json({error: "Order not found"});
          }  

          return res.json({
            message: "Order deleted successfully",
            order: remove.rows[0]
          })
        }
    
}
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Failed to delete order"})
    }
   
}



 