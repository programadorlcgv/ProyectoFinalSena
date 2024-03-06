import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';

function Categories({swal}) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  useEffect(() => {
   fechtCategories();
  }, []);
  function fechtCategories() {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    });
  }
  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {name,parentCategory}
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', data);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', data);
    }
    setName('');
    fechtCategories();
  }
  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }
  function deleteCategory(category) {
    swal.fire({
      title: '¿Estas seguro?',
      text: `¿Deseas eliminar ${category.name}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Eliminar la Categoria',
      confirmButtonColor: '#d55',
      reverseButtons: true,
  }).then(async result => {
    if(result.isConfirmed) {
      const {_id} = category
      await axios.delete('/api/categories?_id='+_id);
      fechtCategories();
    }    
  });
  }
  return (
    <Layout>
      <h1>Categorias</h1>
      <label>
        {editedCategory 
        ? `Editar Categoria ${editedCategory.name}`
        : 'Crear nueva categoria'}
      </label>
      <form onSubmit={saveCategory} className="flex gap-1">
      <input 
      className="mb-0" 
      type="text" 
      placeholder={'Nombre de categoria'} 
      onChange={ev => setName(ev.target.value)}
      value={name}/>
      <select className="mb-0" 
        onChange={ev => setParentCategory(ev.target.value)}
        value={parentCategory}>
        <option value="">Sin categoria principal</option>
        {categories.length > 0 && categories.map(category => (
            <option value={category._id}>{category.name}</option>
          ))}
      </select>
      <button type="submit" className="btn-primary py-1">Guardar</button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Nombre de Categoria</td>
            <td>Categoria padre</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 && categories.map(category => (
            <tr>
              <td>{category.name}</td>
              <td>{category?.parent?.name}</td>
              <td>
                <button 
                  onClick={() => editCategory(category)}
                  className="btn-primary mr-1"
                >
                  Editar
                </button>
                <button 
                  onClick={() => deleteCategory(category)}
                  className="btn-primary"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
export default  withSwal (({ swal }, ref) => (
  <Categories swal={swal}/>
));