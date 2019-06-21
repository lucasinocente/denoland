const { open, stdout } = Deno;
import { serve } from "https://deno.land/std/http/server.ts";
const s = serve("0.0.0.0:8000");
const directory = "./content";

async function main() {
  for await (const req of s) {
    const { url } = req
    const filename = `${directory}${url}.md`;
    const file = await open(filename);
    await Deno.copy(stdout, file)
    await req.respond({ body: new TextEncoder().encode(`You file: \n ${file} \n`) });
    file.close()
  }
}

main();
