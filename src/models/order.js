import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User must be asscociated with a Orders"]
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: [true, "Please provide the product for the order"]
            },
            quantity: {
                type: Number,
                required: [true, "Please provide the product quantity"],
                validate: {
                    validator: function (value) {
                        return value > 0;
                    },
                    message: "Product quantity cannot be Zero or less then 0"
                }
            }
        }
    ],
    total: {
        type: Number,
        required: [true, "Total price cannot be empty"]
    },
    payment: {
        paymentType: {
            default: "COD",
            type: String,
            enum: ["COD", "MobileBanking"],
            // required: [true, "Must provide Payment type"]
        },
        prePaid: {
            type: Boolean,
            default: false,

        }
    }
})

orderSchema.pre('save', function(){
    if(this.payment.paymentType === "MobileBanking"){
        this.payment.prePaid = true;
    }
})

const Order = mongoose.model("Order", orderSchema);
export default Order;