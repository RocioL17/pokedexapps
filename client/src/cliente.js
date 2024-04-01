async function obtenerListaPokemones() {
  const resp = await fetch("http://localhost:4321/api/pokemon.json");
  const data = await resp.json();
  console.log(data);
  data.listaPks.forEach((p) => {
    agregar(p);
  });
}

function agregar(pokemon) {
  const item = document.createElement("li");
  //definir las propiedades
  item.id = `li${pokemon.id}`;
  item.classList ="flex items-center justify-between border-b border-gray-300 p-2";

  const row = `<span class="text-lg text-red-600 font-bold w-1/3">${pokemon.id}</span>` 
  + `<span class="text-lg text-red-600 font-bold w-1/3 text-center">${pokemon.name}</span>` +
   `<form class="w-1/3 text-right">` + `<button type="submit" class="font-bold hover:font-extrabold" 
   id="${pokemon.id}">X</button></form>`; 
  item.innerHTML = row;
  document.getElementById('lista').appendChild(item);
}

obtenerListaPokemones(); 

//Agregar pokemones --------------------------------------------
document.addEventListener('DOMContentLoaded', () => {  
  const form = document.getElementById('form123');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = parseInt(document.querySelector('input[name="id"]').value);
    const name = document.querySelector('input[name="name"]').value;
    const newPk = { id, name };
    try { 
      const existingPk = document.getElementById(`li${id}`);
      if (existingPk) {
        window.alert('Ya existe'); 
        form.reset(); 
        return;
      }   
    try {
      const response = await fetch('http://localhost:4321/api/pokemon.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPk)
      });
      if (response.ok) {
        agregar(newPk);
        form.reset(); 
      } else {
        console.error('error', response.statusText);
      }
    } catch (error) {
      console.error('error', error);
    }
  } catch (error) {
    console.error('error', error);
  }
  });
});

//Eliminar pokemones -----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('lista');
  list.addEventListener('click', async (event) => {
    event.preventDefault();
    if (event.target.tagName === 'BUTTON') { 
      const pkId = event.target.id;
      try {
        const response = await fetch(`http://localhost:4321/api/pokemon/${pkId}.json`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const Item = document.getElementById(`li${pkId}`);
          Item.remove();
        } else {
          console.error('no se puedo eliminar:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
});



