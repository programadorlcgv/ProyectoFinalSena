import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    });
  }, []);
  async function saveCategory(ev) {
    ev.preventDefault();
    await axios.post('/api/categories', {name});
    setName('');
  }
  return (
    <Layout>
      <h1>Categorias</h1>
      <label>Nueva categoria</label>
      <form onSubmit={saveCategory} className="flex gap-1">
      <input 
      className="mb-0" 
      type="text" 
      placeholder={'Nombre de categoria'} 
      onChange={ev => setName(ev.target.value)}
      value={name}/>
      <button type="submit" className="btn-primary py-1">Guardar</button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>
              Nombre de Categoria
            </td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 && categories.map(category => (
            <tr>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}