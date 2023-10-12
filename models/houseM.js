import mongoose from 'mongoose';

const HouseSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
        trim: true,
    },
    price: {
        type: String,
        required: false,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    address: {
        type: String,
        required: false,
        trim: true,
    },
    country: {
        type: String,
        required: false,
        trim: true,
    },
},{timestamps:true})

export default mongoose.models.houseM || mongoose.model("houseM", HouseSchema, "house");