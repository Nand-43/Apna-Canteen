import db from "../../config/db.js";

export async function getAdminDashboard(req,res){
    try{
  
        const totalStudents = await db.query(`
            Select count(*)
            from users
            where role='student'
            `);

       const todayOrders = await db.query(
        `Select count(*)
        from orders
        where date(created_at) = current_date
        `
       );
       
       const pendingOrders = await db.query(`
        Select count(*)
        from orders
        where status='pending'
        `);

        const preparingOrders = await db.query(`
        Select count(*)
        from orders
        where status='preparing'
        `);

        const readyOrders = await db.query(`
            select count(*)
            from orders
            where status='ready'`
        );

        const completeOrders = await db.query(`
            select count(*)
            from orders
            where status='completed'
            `);


        const todayRevenue = await db.query(`
            select coalesce(sum(total_price), 0) 
            from orders
            where date(created_at) = current_date`
        );

        
        const recentOrders = await db.query(`
            select 
            id, 
            student_id,
            dish_name,
            total_price,
             status, 
             created_at, quantity
            from orders
            order by created_at desc
            limit 5`) 

            console.log("Recent Orders:" , recentOrders.rows);

            res.json({
                totalStudents:  Number(totalStudents.rows[0].count),

                todayOrders: Number(todayOrders.rows[0].count),

                pendingOrders: Number(pendingOrders.rows[0].count),

                preparingOrders: Number(preparingOrders.rows[0].count),

                completedOrders: Number(completeOrders.rows[0].count),

                readyOrders: Number(readyOrders.rows[0].count),

                todayRevenue: Number(todayRevenue.rows[0].coalesce),

                recentOrders: recentOrders.rows
            });
    }
    catch(err){
        console.log("Admin dashboard",err);

        res.status(500).json({
            error: "failed to load dashboard data"
        })
    }
}



