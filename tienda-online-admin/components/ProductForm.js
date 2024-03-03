import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";


export default function ProductForm({
  _id,
  title:existingTitle, 
  description:existingDescription, 
  price:existingPrice
  }) {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();
  console.log({_id})
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {title, description, price};
    if (_id) {
      //update 
      await axios.put('/api/products', {...data,_id});
    } else {
      // create
      await axios.post('/api/products', data);
    }  
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push('/products');
  }
  return (
    <form onSubmit={saveProduct}>
    <label>Nombre</label>
    <input 
      type="text" 
      placeholder="Nombre del producto" 
      value={title}
      onChange={ev => setTitle(ev.target.value)} />
    <label>Descripción</label>
    <textarea 
      placeholder="Descripción de Producto"
      value={description}
      onChange={ev => setDescription(ev.target.value)} />
    <label>Precio</label>
    <input 
      type="number" 
      placeholder="Precio del producto" 
      value={price}
      onChange={ev => setPrice(ev.target.value)} />
    <button
      type="submit"
      className="btn-primary">
      Guardar
    </button>
    </form>       
  );
} 
