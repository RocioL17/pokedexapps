import type { APIRoute } from "astro";
import { deletePokemon } from "../../../services/pokemon";

export const DELETE: APIRoute = async (context) => {
<<<<<<< HEAD
  try {
    // Obtener el ID del Pokémon que se desea eliminar
    const pokemonId = context.params.id;

    // Verificar si el ID es válido
    if (!pokemonId || isNaN(parseInt(pokemonId))) {
      throw new Error('Invalid Pokemon ID');
=======
  const id = parseInt(context.params.id ?? '0', 10)
  const pokemon = await deletePokemon(id)
  return new Response(JSON.stringify(pokemon), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
>>>>>>> b3bb7e35425b437fdcaa36dd71ce8959a01c3c99
    }

    // Llamar a la función deletePokemon para eliminar el Pokémon
    await deletePokemon(parseInt(pokemonId));

    // Enviar una respuesta exitosa
    return new Response(JSON.stringify({ message: 'Pokemon deleted successfully' }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 200
    });
  } catch (error: any) {
    // Enviar una respuesta de error
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 400
    });
  }
}
