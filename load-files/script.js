const { readDir, open, stdout } = Deno;
const directory = "./content";

( async () => {
  const files = await readDir(directory);
  
  for (let i = 0; i < files.length; i++) {
    const filename = `${directory}/${files[1].name}`;
    const file = await open(filename);
    await Deno.copy(stdout, file)
    file.close()
  }
})()
