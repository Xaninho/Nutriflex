import mongoose, { Schema, models, model } from 'mongoose';

const ExtraPriceSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

const MenuItemSchema = new Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, required: true },
    basePrice: { type: Number, required: true },
    sizes: {type: [ExtraPriceSchema]},
    extraIngredientPrices: {type: [ExtraPriceSchema]}
});

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);