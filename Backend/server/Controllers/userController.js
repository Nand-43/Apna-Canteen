import db from "../../config/db.js";

export async function AdminInfo(req,res){

    try{
        const result = await  db.query(
            `Select id, name, email, photo, phone, role
            from users
            where id = $1 and role='admin'
            `,
            [req.user.id]
        );

        res.json({
            message: "User Detail",
            result: result.rows[0]
        })
        
    }
    catch(err){
        res.status(500).json({
            message: "Not able to fetch the users Info"
        });
        console.log(err);
    }
}


export async function StudentInfo(req,res){
    console.log("Student info", req.body);
 
    try{
      const result = await db.query(`
        select id, student_id, name, email, phone, photo, department, year
        from users
        where id = $1 and role='student'
        `,
        [req.user.id]

    );

    if(result.rows.length === 0){
        return res.status(404).json({message: "Student not found"})
    }
    
    res.json({
        message: "Admin Detail",
        result: result.rows[0]
    })
  }

    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Issue to show the student data"
        })
    }

}
