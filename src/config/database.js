const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mean-mascotas')
                .then(db => console.log('DB is connected'))
                .catch(err => console.error(err));