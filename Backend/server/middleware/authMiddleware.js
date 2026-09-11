import jwt from "jsonwebtoken"; 

export const authenticateToken = (req,res,next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){ 
        return res.status(401).json({error: "Access denied. No token provided."});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Verifying with secret",process.env.JWT_SECRET);
        next();
    }

    catch(err){
        console.log("Invalid token", err)
        return res.status(403).json({error: "Invalid or expired token"});
    }
} 

export const authorizeAdmin = (req, res, next) => {
     

    if(req.user.role !== "admin"){
         return res.Status(403).json({
        error: "Access denied. Insufficient role."
    });
}

     next();
}


