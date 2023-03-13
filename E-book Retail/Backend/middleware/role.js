const checkAccess = (admittedRoles) => (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    try {
      const decoded = jwt.verify(token, "dghdghdfhd")        
      const role = decoded.role;
      if (!admittedRoles.includes(role)) {
        return res.status(403).send('Forbidden');
        
      }
      next();
    }catch(error){
      console.log(error)
      return res.status(403).json({success: false, message: "Error"})

    }
  };