export async function initializeControllers() {
  const start = Date.now();
  const cwd = Deno.cwd();

  async function readFolder(name: string) {
    for await (const item of Deno.readDir(name)) {
      if (item.isDirectory) {
        await readFolder(`${name}/${item.name}`);
      } else {
        if (item.name.includes(".controller.ts")) {
          await import(`${cwd}/${name}/${item.name}`);
        }
      }
    }
  }

  await readFolder("controllers");
  console.log("> Controllers initialized!", `${Date.now() - start}ms`);
}
