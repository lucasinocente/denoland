const { open, stdout } = Deno;
import { serve, ServerRequest } from "https://deno.land/std@v0.9.0/http/server.ts";
import { readFileStrSync, existsSync } from 'https://deno.land/std@v0.9.0/fs/mod.ts';

const server = serve("0.0.0.0:8000");
const directory = "./content";

async function main() {
  for await (const req of server) {
    const { url } = req;
    const filename = `${directory}${url}.md`;
    if (existsSync(filename)) {
      const file = readFileStrSync(filename);
      const body = new TextEncoder().encode(file);
      let headers = new Headers();
      headers.set("Content-Type", "text/plain; charset=utf-8");
      req.respond({ body, headers });
    } else {
      req.respond({ body: new TextEncoder().encode(`#404`) });
    }
  }
}

console.log('Running: http://localhost:8000');

main();
