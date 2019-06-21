import { serve } from "https://deno.land/std/http/server.ts";
const s = serve("0.0.0.0:8000");

async function main() {
  for await (const req of s) {
    console.log(req.url)
    const { url } = req
    req.respond({ body: new TextEncoder().encode(`You access: ${url}\n`) });
  }
}

main();