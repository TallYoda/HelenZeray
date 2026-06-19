import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SLIDES_DIR = path.resolve('public/hero/slides')
const THUMBS_DIR = path.join(SLIDES_DIR, 'thumbs')
const THUMB_WIDTH = 120

async function main() {
  await fs.mkdir(THUMBS_DIR, { recursive: true })

  const entries = await fs.readdir(SLIDES_DIR)
  const images = entries.filter(
    (name) => /\.(jpe?g|png|webp)$/i.test(name) && !name.startsWith('.'),
  )

  for (const name of images) {
    const input = path.join(SLIDES_DIR, name)
    const output = path.join(THUMBS_DIR, name.replace(/\.(png|webp)$/i, '.jpg'))

    await sharp(input)
      .rotate()
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: 42, mozjpeg: true })
      .toFile(output)

    console.log(`thumb: ${name}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
