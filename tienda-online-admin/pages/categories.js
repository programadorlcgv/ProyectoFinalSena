import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';

function Categories({swal}) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [properties,setProperties] =useState([]);
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
    const data = {
      name,
      parentCategory,
      properties:properties.map(p => ({
        name:p.name,
        values:p.values.split(','),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', data);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', data);
    }
    setName('');
    setParentCategory('');
    setProperties([]);
    fechtCategories();
  }
  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({name,values}) => ({
      name,
      values:values.join(',')
    }))
    );
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
  function addProperty() {
    setProperties(prev => {
      return [...prev, {name:'',values:''}];
    });
  }
  function handlePropertyNameChange(index, property, newName) {
    setProperties(prev =>{
      const properties = [...prev];
      properties[index].name =newName;
      return properties;
    });
  }
  function handlePropertyValuesChange(index, property, newValues) {
    setProperties(prev =>{
      const properties = [...prev];
      properties[index].values =newValues;
      return properties;
    });
  }
  function removeProperty(indexToRemove) {
    setProperties(prev => {
      return [...prev].filter((p,pIndex) => {
        return pIndex !== indexToRemove;
      });
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
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input 
          type="text" 
          placeholder={'Nombre de categoria'} 
          onChange={ev => setName(ev.target.value)}
          value={name}
          />
          <select 
            onChange={ev => setParentCategory(ev.target.value)}
            value={parentCategory}>
            <option value="">Sin categoria principal</option>
            {categories.length > 0 && categories.map(category => (
            <option value={category._id}>{category.name}</option>
          ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Propiedades</label>
          <button 
            onClick={addProperty}
            type="button" 
            className="btn-default text-sm mb-2"
          >Añadir nueva Propiedad
          </button>
          {properties.length > 0 && properties.map((property,index) => (
            <div className="flex gap-1 mb-2">
              <input type="text" 
                     value={property.name} 
                     className="mb-0"
                     onChange={ev => handlePropertyNameChange(index,property, ev.target.value)}
                     placeholder="Nombre de la propiedad (ejemplo: marca)" />
              <input type="text" 
                     className="mb-0"
                     onChange={ev => 
                        handlePropertyValuesChange(
                          index,
                          property, ev.target.value
                        )}
                     value={property.values} 
                     placeholder="valores, separados por comas (ejemplo: Asus, Gigabyte...)" />
              <button 
                type="button"
                onClick={() => removeProperty(index)}
                className="btn-default">
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button 
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName('');
                setParentCategory('');
                setProperties([]);
              }}
              className="btn-default">
              Cancelar
            </button>
          )}
          <button type="submit" className="btn-primary py-1">
            Guardar
          </button>
        </div>
      </form>
      {!editedCategory && (
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
      )}
    </Layout>
  );
}
export default  withSwal (({ swal }, ref) => (
  <Categories swal={swal}/>
));