import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT;
let server;

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        server = app.listen(PORT, () => {
            console.log(`Library Management Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.error(e)
    }
}

main();