import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";


export default function ProductForm({
  _id,
  title:existingTitle, 
  description:existingDescription, 
  price:existingPrice,
  images:existingImages,
  category:assignedCategory,
  properties:assignedPorperties,
  }) {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [category, setCategory] = useState(assignedCategory || '');
  const [productProperties, setProductProperties] = useState(assignedPorperties || {});
  const [price, setPrice] = useState(existingPrice || '');
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories,setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setCategoriesLoading(true);
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
      setCategoriesLoading(false);
    })
  }, [])
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title, description, price, images, category,
      properties:productProperties,
    };
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
  async function uploadImages(ev) {
   const files = ev.target?.files;
   if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      setImages(oldImages => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
   }
  }
  function uploadImagesOrder(images) {
    setImages(images);
  }
  function setProductProp(propName,value) {
    setProductProperties(prev => {
      const newProductPops = {...prev};
      newProductPops[propName] = value;
      return newProductPops;
    });
  }
  const propertiesToFill = [];
  if(categories.length > 0 && category){
   let catInfo = categories.find(({_id}) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while(catInfo?.parent?._id) {
      const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
    <form onSubmit={saveProduct}>
    <label>Nombre</label>
    <input 
      type="text" 
      placeholder="Nombre del producto" 
      value={title}
      onChange={ev => setTitle(ev.target.value)} />
    <label>Categoria</label>
    <select 
      value={category}
      onChange={ev => setCategory(ev.target.value)}>
      <option value="">Sin Categoria</option>
      {categories.length > 0 && categories.map(c => (
        <option value={c._id}>{c.name}</option>
      ))}
    </select>
    {categoriesLoading && (
          <Spinner />
        )}
    {propertiesToFill.length > 0  && propertiesToFill.map(p => (
      <div className="">
        <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
        <div>
          <select value={productProperties[p.name]}
                  onChange={(ev) => 
                    setProductProp(p.name,ev.target.value)
                  }
          >
          {p.values.map(v => (
            <option value={v}>{v}</option>
          ))}
          </select>
        </div>
        </div>
    ))}
    <label>
      Fotos
    </label>
    <div className="mb-2 flex flex-wrap gap-1">
      <ReactSortable 
      list={images} 
      className="flex flex-wrap gap-1"
      setList={uploadImagesOrder}>
      {!!images?.length && images.map(link =>(
        <div key={link} className="h-24 bg-white p-2 shadow-md rounded-md border border-gray-200">
          <img src={link} alt="" className="rounded-lg"/>
        </div>
      ))}
      </ReactSortable>
      {isUploading && (
        <div className="h-28 flex items-center">
          <Spinner />
        </div>
      )}
      <label className="cursor-pointer w-24 h-24 text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-md bg-white shadow-md border border-primary" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
        </svg>
        <div>
          Subir imagen
        </div>
        <input type="file" onChange={uploadImages} className="hidden"/>
      </label>
    </div>
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
