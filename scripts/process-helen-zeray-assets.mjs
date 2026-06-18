import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SOURCE = "D:\\zeray's files"
const PUBLIC = path.resolve('public')
const THUMB_WIDTH = 600
const THUMB_QUALITY = 72

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG'])

const DISPLAY_ORDER = [
  'nothing but honer',
  'serenity',
  'fantasies impromptu',
  'unnamed feelings',
  'waited for no one',
  'while waithing',
  'untitled',
]

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function parseFilename(filename) {
  const base = filename.replace(/\.(jpe?g|png|webp)$/i, '').replace(/\.JPG$/i, '')
  const parts = base.split(/\s*,\s*/).map((part) => part.trim()).filter(Boolean)

  if (parts.length < 2) {
    return { title: base, dimensions: undefined, medium: undefined, year: undefined }
  }

  let title = parts[0]
  let dimensions
  let medium
  let year

  const yearMatch = parts[parts.length - 1].match(/^(\d{4})$/)
  if (yearMatch) {
    year = yearMatch[1]
    parts.pop()
  }

  const mediumPart = parts[parts.length - 1]
  if (
    /oil|acrylic|canvas|mixed media/i.test(mediumPart) &&
    !/^\d/.test(mediumPart)
  ) {
    medium = mediumPart.replace(/\s+(\d{4})$/, '').trim()
    parts.pop()
  }

  const dimParts = parts.slice(1)
  if (dimParts.length > 0) {
    const dimText = dimParts.join(' × ').replace(/\s+/g, ' ')
    const dimMatch = dimText.match(
      /(\d+\s*cm)\s*(?:×|x)?\s*(\d+\s*cm)?(?:\s*(mixed media))?/i,
    )
    if (dimMatch) {
      dimensions = dimMatch[2]
        ? `${dimMatch[1]} × ${dimMatch[2]}`
        : dimMatch[1]
      if (dimMatch[3] && !medium) {
        medium = 'mixed media'
      }
    } else {
      dimensions = dimText
    }
  }

  title = title.replace(/\s+\d+\s*cm$/i, '').trim()

  const titleDimMatch = title.match(/^(.+?)\s+(\d+\s*cm)\s*$/i)
  if (titleDimMatch && dimensions && !dimensions.includes('×')) {
    title = titleDimMatch[1].trim()
    dimensions = `${titleDimMatch[2]} × ${dimensions}`
  }

  return { title, dimensions, medium, year }
}

function sortKey(title) {
  const normalized = title.toLowerCase()
  const index = DISPLAY_ORDER.findIndex((entry) => normalized.includes(entry))
  return index >= 0 ? index : DISPLAY_ORDER.length
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function processImage(sourcePath, destDir, id) {
  const fullDir = path.join(destDir, 'full')
  const thumbDir = path.join(destDir, 'thumbs')
  await ensureDir(fullDir)
  await ensureDir(thumbDir)

  const ext = '.jpg'
  const fullPath = path.join(fullDir, `${id}${ext}`)
  const thumbPath = path.join(thumbDir, `${id}${ext}`)

  await sharp(sourcePath).rotate().jpeg({ quality: 88 }).toFile(fullPath)
  await sharp(sourcePath)
    .rotate()
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: THUMB_QUALITY })
    .toFile(thumbPath)

  return { full: fullPath, thumb: thumbPath }
}

async function main() {
  const entries = await fs.readdir(SOURCE, { withFileTypes: true })
  const images = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => {
      const ext = path.extname(name).toLowerCase()
      return IMAGE_EXT.has(ext) || IMAGE_EXT.has(path.extname(name))
    })

  const worksDir = path.join(PUBLIC, 'works', 'paintings')
  await ensureDir(worksDir)

  const parsed = images.map((filename) => {
    const meta = parseFilename(filename)
    const id = slugify(meta.title) || slugify(path.parse(filename).name)
    return { filename, id, ...meta }
  })

  parsed.sort((a, b) => {
    const order = sortKey(a.title) - sortKey(b.title)
    if (order !== 0) return order
    return a.title.localeCompare(b.title)
  })

  const artworks = []

  for (const item of parsed) {
    const sourcePath = path.join(SOURCE, item.filename)
    await processImage(sourcePath, worksDir, item.id)

    artworks.push({
      id: item.id,
      title: item.title,
      medium: item.medium ?? 'Oil and acrylic on canvas',
      dimensions: item.dimensions,
      year: item.year,
      category: 'painting',
      available: false,
      thumbnail: `/works/paintings/thumbs/${item.id}.jpg`,
      full: `/works/paintings/full/${item.id}.jpg`,
      colSpan: 1,
      rowSpan: 1,
    })
  }

  const portraitSource = parsed.find((item) =>
    item.title.toLowerCase().includes('nothing but honer'),
  )
  if (portraitSource) {
    const aboutDir = path.join(PUBLIC, 'about')
    await ensureDir(path.join(aboutDir, 'thumbs'))
    const portraitPath = path.join(SOURCE, portraitSource.filename)
    await sharp(portraitPath)
      .rotate()
      .resize({ width: 600, withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toFile(path.join(aboutDir, 'thumbs', 'portrait.jpg'))
  }

  const heroId = parsed.find((item) =>
    item.title.toLowerCase().includes('serenity'),
  )?.id

  const generated = `// Generated by scripts/process-helen-zeray-assets.mjs — do not edit by hand
import type { Artwork } from '../types/artwork'

export const artworks: Artwork[] = ${JSON.stringify(artworks, null, 2)}

export const heroPaintingId = ${JSON.stringify(heroId ?? artworks[0]?.id ?? null)}
`

  await fs.writeFile(
    path.resolve('src/data/artworks.generated.ts'),
    generated,
    'utf8',
  )

  const heroMarquee = artworks.slice(0, 5).map((artwork) => ({
    src: artwork.thumbnail,
    alt: artwork.title,
  }))

  await fs.writeFile(
    path.resolve('src/data/heroMarquee.generated.ts'),
    `// Generated by scripts/process-helen-zeray-assets.mjs
export const heroMarqueeImages = ${JSON.stringify(heroMarquee, null, 2)}
`,
    'utf8',
  )

  console.log(`Processed ${artworks.length} paintings`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
