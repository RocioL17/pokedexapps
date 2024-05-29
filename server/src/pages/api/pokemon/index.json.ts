<<<<<<< HEAD
import type { APIRoute } from "astro";
import { getPokemonList} from "../../../services/pokemon";
import { addPokemon } from "../../../services/pokemon";


export const GET: APIRoute = async (context) => {
  try {
    const listaPks = await getPokemonList();

    return new Response(JSON.stringify({ listaPks }), {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error: any) { 
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
};

export const POST: APIRoute = async (context) => {
  try {
    const pokemon = await context.request.json();
    await addPokemon(pokemon);

    return new Response(JSON.stringify({ pokemon }), {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error: any) { 
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
};
=======
import type { APIRoute } from "astro"
import { addPokemon, getPokemonList } from "../../../services/pokemon"

export const GET: APIRoute = async (context) => {
  const page = parseInt(context.url.searchParams.get('page') ?? '1', 10)

  return new Response(JSON.stringify(await getPokemonList(page)), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}

export const POST: APIRoute = async (context) => {
  const pokemon = await context.request.json()

  await addPokemon(pokemon)

  return new Response(JSON.stringify(pokemon), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}
>>>>>>> b3bb7e35425b437fdcaa36dd71ce8959a01c3c99
