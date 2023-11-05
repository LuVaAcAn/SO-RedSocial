const mongoose = require('mongoose');


//para local
mongoose.connect('mongodb://localhost:27017/powerpulse_sports_db')

//para contenedores
//mongoose.connect('mongodb://database/powerpulse_sports_db')
.then(db=> console.log("Conectado a MongoDB y escuchando a ", db.connection.host))
.catch((err) => console.log(err));

