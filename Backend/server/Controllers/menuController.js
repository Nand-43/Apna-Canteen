import db from "../../config/db.js";
import express from "express";
import { updateOrder } from "./orderController.js";

export async function createMenu(req,res){

    console.log("body", req.body);
    console.log("file:", req.file);
    console.log(Object.keys(req.body)); 
    console.log("category:", req.body.category);
    console.log("dish_name:", req.body.dish_name);
    console.log("price:", req.body.price);
    console.log("availability:", req.body.availability);
    const {category,dish_name,description,price,availability} = req.body;

    if(!category || !dish_name || !price){
        return res.status(400).json({error: "Category, dish_name and price is required "})
    }

    if(isNaN(price) || price <= 0){
        return res.status(400).json({error: "Price must be positive number"});
    }



    const image = req.file ? req.file.filename : null;
    const availabilityValue = availability === "true"; 
    try{
        if(req.user.role != "admin"){
            return res.status(403).json({error: "ONly admins can place Menu"})
        }

        const newItem = await db.query(`Insert into menu (dish_name, description, category,  price, image, availability)
            values($1,$2,$3,$4, $5, $6)
            returning *`,
        [dish_name, description, category, price, image, availabilityValue]
    );

    res.json({
        message: "Menu is Successfully Placed",
        menu: newItem.rows[0]
    })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error: "Failed to placed Menu"});
    }
}

export async function getMenu(req, res){
    try{
        if(req.user.role === "admin"){
            const menu = await db.query(`Select id, dish_name, description, category,  price, image, availability 
            from menu
            order by category asc , dish_name asc`,
           );

            res.json({
                message: "Fetched all menu successfully",
               menu : menu.rows
                 
            })
        }

        else if(req.user.role === "student"){

            const menu = await db.query(`Select id, category, dish_name, description, price, image, availability 
            from menu
            where availability = true
            order by category asc , dish_name asc`
        )
        res.json({
            message:"Fetched available menu successfully",
            menu: menu.rows
        })
        }

    }
    catch(err){
       console.log("Error fetching menu:", err);
       res.status(500).json({error: "failed to fetch menu"});
    }
}

export async function getSingleMenu(req, res){
    
    const {id} = req.params;

    try{

    const item = await db.query(
        `Select id, category, dish_name, description ,price, image,availability
        from menu where id = $1`,
        [id]
    );

    if(item.rows.length === 0){
        return res.status(404).json({error: "Menu item not found"});
    }

    res.json({
        message: "Single Menu fetched",
        item: item.rows[0]
    });
}
catch(err){
    console.log(err);
    return res.status(405).json({error: "Failed to fetch menu item"});
}
}

export async function updateMenu(req, res){
    const {id} = req.params;
    const {category, dish_name, description,price, availability} = req.body;


    const image = req.file ? req.file.filename : req.body.image;

    const availabilityValue = availability === "true" || availability === true;
    console.log("Update attempt for ID: ",id);
    console.log("Body", req.body);
    console.log("file: ", req.file);

    if(!category || !dish_name || !price){
        return res.status(401).json({error: "Category, dish_name and price is required "})
    }

    if(isNaN(price) || price <= 0){
        return res.status(402).json({error: "Price must be positive number"});
    }

    if(typeof availabilityValue !== "boolean"){
        return res.status(404).json({error: "Availability must be true or false."})
    }

    try{

      if (req.user.role !== "admin") {
         return res.status(403).json({ error: "Only admins can delete menu items" });
    }

        const update = await db.query(`Update menu set category = $1, dish_name = $2, price = $3, availability = $4 , description = $5, image=$6
            where id = $7 returning *`,
        [category, dish_name, price, availabilityValue,description, image, id]
    );


       if(update.rows.length === 0){
        return res.status(404).json({error: "Menu item not found"});
       }

        res.json({
            message: "Menu items update successfully",
            item : update.rows[0]
    })
    }

    catch(err){
        console.log(err);
        return res.status(500).json({error: "Failed to update the item in the Menu"})
    }
}


export async function deleteMenu(req,res){

    const {id} = req.params;

    if(isNaN(id)){
        return res.status(400).json({error: "Invalid menu ID"});
    }

    try{

        if(req.user.role !== 'admin'){
            return res.status(403).json({error: "Only admins can delete menu items"})
        }

      const deletemenu = await db.query(
        `Delete from menu where id = $1 returning * `,
        [id]
      );

      if(deletemenu.rows.length === 0){
          return res.status(404).json({error: "Menu items not found"});
      }

      res.json({
        message: "Menu item deleted successfully",
        menu : deletemenu.rows[0]
      })
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to delete menu item"});

    }
}

export async function toggleButton(req, res){
    console.log("body: ", req.body)
    try{
       const {id} = req.params;
       const result = await db.query(
         `Update menu set availability = NOT availability where id = $1 returning *`,
         [id]
       );

       if(result.rows.length === 0){
        return res.status(404).json({
            error:"Menu item not found"
        });
       }

       res.json({
        message: "Availability Toggled",
        item: result.rows[0]
       });

    }
    catch(err){
      console.log(err);
      return res.status(500).json({
        error: "Failed to toggle availability"
      });
    }
}