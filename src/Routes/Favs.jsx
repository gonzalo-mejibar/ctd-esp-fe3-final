import React from "react";
import Card from "../Components/Card";
import { useOdontoStates } from "../Context/Context";

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Favs = () => {

  const {state} = useOdontoStates()

  

  return (
    <>
      <h1>Dentists Favs</h1>
      <div className="card-grid">
        {state.favs.map(fav =>
        <Card odontologo={fav} key={fav.id}/>)}
      </div>
    </>
  );
};

export default Favs;
