export async function delay() {
    await new Promise(resolve => setTimeout(resolve, Math.round(Math.random() * 1600)))
}