import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  if (method ==="POST") {
    const {title,description,price} = req.body;
    const productDoc = await Product.create({
      title,description,price,
    })
    res.json(productDoc);
  }
}

// mongoose.connect(clientPromise.url) linea 6 mod lN 9-12 SEB AGREGO ASYN Y AWA 