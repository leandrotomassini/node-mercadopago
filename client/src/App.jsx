import "./App.css";
import axios from "axios";

import productos from "../products.json";

function App() {

  const FuncionComprar = async (producto) => {
    const response = await axios.post(
      "http://localhost:4000/mercadopago",
      producto
    );

    window.location.href = response.data;
  };

  return (
    <div className="ContainerSuperior">
      {
        productos.map((e) => (
          <div className="ContainerProducto" key={e.nombre}>
            <img src={e.imagen} />
            <p>{e.nombre}</p>
            <p>{`$ ${e.precio}`}</p>

            <button onClick={() => FuncionComprar(e)}>Comprar</button>
          </div>
        ))
      }
    </div>
  );
}

export default App;