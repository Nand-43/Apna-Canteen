import db from "../../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export async function registerStudent(req,res){
  
   console.log("Body", req.body);
    console.log("File: ", req.file);

    const {college_name, student_id, name, email, password, phone, role, department, year, staffCode} = req.body;

    const photo = req.file ? req.file.filename : null;
     
        if(!name || !email ||!password){
            return res.status(400).json({error: "Name, email and password are required"});
        }

        const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error: "Invalid email format"});
        }

        if(password.length < 6){
            return res.status(400).json({error: "Password must be at least 6 character."})
        }

        const phoneRegex = /^[0-9]{10}$/;   

        if(!phoneRegex.test(phone)){
            return res.status(400).json({error: "Invalid phone number. Must be 10 digit"});  
        }

        const existingPhone = await db.query("select * from users where phone = $1", [phone]);
        if(existingPhone.rows.length > 0){
            return res.status(400).json({error: "Phone number already registered."})
        }

        if(role !== "student" && role !== "admin"){
            return res.status(400).json({error: "Role must br student or admin"})
        }

        if(role === "admin"){
        if(staffCode !== process.env.Staff_Verification_Code){
            return res.status(403).json({
                error: "Invalid staff verification code"
            })
        } 
    }

        try{

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRegister = await db.query(`Insert into users (college_name, student_id , name, email, password, phone, photo, role, department, year, staffCode)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, $11)
         RETURNING id,college_name, student_id, name, email, phone, photo, role, department, year, staffCode`,
        [
            college_name,
            role === "student" ? student_id : null, 
            name, 
            email,
            hashedPassword,
            phone,
            photo,
            role || "student",
            role === "student" ? department : null,
            role === "student" ? year : null,
            role === "admin" ? staffCode : null
        ]

        
    );
    
    res.json({
        message: "User Register Successfully",
        student : newRegister.rows[0]
    });
}
   catch(err){
    console.log("registeration", err);
    res.status(500).json({error: "Registration Failed"});
   }
} 

export async  function loginUsers(req,res){
    
    const { email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({error: "Email and password are required"}); 
        }

          try{
       const loginUser = await db.query('Select * from users where email = $1 ', [email]);

       if(loginUser.rows.length === 0){
        return res.status(400).json({error: "User not found"})
       }
       const user = loginUser.rows[0];

       const validPassword = await bcrypt.compare(password, user.password);

       if(!validPassword){
        return res.status(400).json({error: "Invalid password"})
       }

       const accessToken = jwt.sign(
        {
            id: user.id, role: user.role
        }, 
        process.env.JWT_SECRET,
        {expiresIn: "24h"}
       ); 

       const refreshToken = jwt.sign(
        {id: user.id, role: user.role},
        process.env.JWT_Refresh_Secret,
        {expiresIn: "90d"}
       );

       res.json({
        accessToken,
        refreshToken, 
        user: {   
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            student_id: user.role === 'student' ? user.student_id : null,
        }
       })
    }
    
    catch(err){
        console.log("Login", err);
        res.status(500).json({error:" Login failed"});
    }
}


export async function refreshToken(req, res){
    const {refreshToken} = req.body;

    if(!refreshToken) return res.status(401).json({error: "No token provided"});

    try{
        const decoded = jwt.verify(refreshToken, process.env.JWT_Refresh_Secret);
        const newAccessToken = jwt.sign(
            {id: decoded.id, role: decoded.role},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        );

        res.json({accessToken: newAccessToken});

    }
    catch(err){
        res.status(403).json({error: "Invalid or expired refresh Token."});
        }
}


export async function getAllStudent(req,res){
    try{
      const result = await db.query(`
        select id, name, email, phone, student_id, department, year, photo
        from users
        where role='student'
        order by id desc
        `);

        res.status(200).json({
            students: result.rows
        });
    }
    catch(err){
        res.status(500).json({error: "Failed to fetch students"})

    }
}

export async function getAllCanteenStaff(req,res) {
    try{
        
        const result = await db.query(`
            Select id, name, email, phone, photo
            from users
            where role='admin'
            order by id desc`
        );

        res.status(200).json({
            staff: result.rows
        })
    }
    catch(err){
     res.status(500).json({
       error: "Failed to fetch the canteen staff data"
    })
     
    }
}


