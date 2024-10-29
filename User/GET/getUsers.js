const { getAllItems } = require("../../Utility/Mongo/getAllItems")

const getUsers = async (req, res)=> {
   try { 
        const users = await getAllItems( "user", "usuarios")
        if (users && users.length > 0){
            const userInfos = users.map(user => ({
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                rol: user.rol
            }));
            res.status(200).json({message: "Usuarios encontrados", userInfos})
        }else{
            res.status(400).json({message:"Usuarios no encontrados"})
        }

    }catch(err){
        console.error("Error al obtener usuarios:", err);
        res.status(500).json({ message: "error en el servidor" });
    }
}

module.exports= {
    getUsers
}