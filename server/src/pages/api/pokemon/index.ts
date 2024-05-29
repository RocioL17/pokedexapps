import type { APIRoute } from "astro";
import { addPokemon, findPokemonById, findPokemonByName } from "../../../services/pokemon";
import { invalidInput, nameTooLong, nameTooShort, pokemonAlreadyExists } from "../../../helpers/errors";

function handleError(error: string, body?: Record<string, any>) {
  const headers = new Headers()
  headers.append('Location', '/')
  headers.append('Set-Cookie', `error=${error}; SameSite=Strict; Path=/; Max-Age=1`)
  if (body) {
    headers.append('Set-Cookie', `body=${JSON.stringify(body)}; SameSite=Strict; Path=/; Max-Age=1`)
  }
  return new Response(null, {
    status: 302,
    headers: headers
  })
}

export const POST: APIRoute = async (context) => {
  const data = await context.request.formData()

  const id = parseInt(data.get('id') as string)
  const name = data.get('name') as string

  if (!id || !name) {
    return handleError(invalidInput, { id, name })
  }

  if (name.length > 30) {
    return handleError(nameTooLong, { id, name })
  }

  if (name.length < 3) {
    return handleError(nameTooShort, { id, name })
  }

  if (await findPokemonById(id) || await findPokemonByName(name)) {
    return handleError(pokemonAlreadyExists, { id, name })
  }

  const pokemon = { id, name }
  await addPokemon(pokemon)

  return context.redirect('/')
}