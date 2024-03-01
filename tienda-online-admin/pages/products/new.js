import Layout from "@/components/Layout";

export default function NewProduct() {
    return (
        <Layout>
            <h1>Nuevo Producto</h1>
            <label>Nombre</label>
            <input type="text" placeholder="Nombre del producto" />
            <label>Descripción</label>
            <textarea placeholder="Descripción de Producto"></textarea>
            <label>Precio</label>
            <input type="number" placeholder="Precio del producto" />
            <button className="btn-primary">Guardar</button>
        </Layout>
    )
}