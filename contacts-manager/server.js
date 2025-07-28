const app = require('./app');
// require('dotenv').config(); // Remove this line

const PORT = process.env.PORT || 5000; // PORT will default to 5000 now

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));