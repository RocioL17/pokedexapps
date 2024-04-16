import { createSignal, createEffect } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

interface Pokemon {
  id: number;
  name: string;
}

const BASE_URL = 'http://localhost:4321/api';

function App(): JSX.Element {
  const [list, setList] = createSignal<Pokemon[]>([]);
  const [page, setPage] = createSignal<number>(1);
  const [count, setCount] = createSignal<number>(0);
  const pageCount = Math.ceil(count() / 5);

  createEffect(() => {
    let cancelled = false;
    fetch(`${BASE_URL}/pokemon.json?page=${page()}`)
      .then((res) => res.json())
      .then((data: { list: Pokemon[]; count: number }) => {
        if (!cancelled) {
          setList(data.list);
          setCount(data.count);
        }
      });

    return () => {
      cancelled = true;
    };
  });

  async function addPokemon(event: Event) {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const pokemon: Pokemon = {
      id: parseInt(data.get('id') as string),
      name: data.get('name') as string,
    };

    await fetch(`${BASE_URL}/pokemon.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pokemon),
    });

    form.reset();
    if (page() === pageCount && list().length < 5) {
      setList((current) => [...current, pokemon]);
    }
    setCount((current) => current + 1);
  }

  async function deletePokemon(id: number) {
    await fetch(`${BASE_URL}/pokemon/${id}.json`, {
      method: 'DELETE',
    });

    setList((current) => current.filter((pokemon) => pokemon.id !== id));
    setCount((current) => current - 1);

    if (page() >= pageCount) {
      setPage(page() - 1);
    }
  }

  return (
    <main class="container mx-auto flex flex-col">
      <h1 class="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
      <form action="/api/pokemon" method="post" onSubmit={addPokemon}>
        <h2 class="text-2xl text-red-700 font-bold">Agregar nuevo pokemon</h2>
        <input type="number" name="id" placeholder="ID" class="my-1 w-full p-2 border border-gray-300 rounded-lg" />
        <input type="text" name="name" placeholder="Name" class="my-1 w-full p-2 border border-gray-300 rounded-lg" />
        <button type="submit" class="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Agregar</button>
      </form>
      <ul class="mt-4 border-4 border-red-700">
        <li class="flex items-center justify-between border-b border-gray-300 p-2 bg-red-700">
          <span class="text-lg text-white font-extrabold w-1/3">ID</span>
          <span class="text-lg text-white font-extrabold w-1/3 text-center">Name</span>
          <span class="text-lg text-white font-extrabold w-1/3 text-right">DELETE</span>
        </li>
        {list().map((pokemon) => (
          <li class="flex items-center justify-between border-b border-gray-300 p-2">
            <span class="text-lg text-red-600 font-bold w-1/3">{pokemon.id}</span>
            <span class="text-lg text-red-600 font-bold w-1/3 text-center">{pokemon.name}</span>
            <div class="w-1/3 text-right">
              <button onClick={() => deletePokemon(pokemon.id)} class="font-bold hover:font-extrabold">X</button>
            </div>
          </li>
        ))}
      </ul>
      <div class="flex justify-center gap-2">
        <button onClick={() => setPage((c) => Math.max(1, c - 1))} disabled={page() === 1} class="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
        <span class="flex items-center self-stretch">{page()}</span>
        <button onClick={() => setPage((c) => Math.min(pageCount, c + 1))} disabled={page() === pageCount} class="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
      </div>
    </main>
  );
}

export default App;
