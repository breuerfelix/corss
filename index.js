import fs from 'fs'
import Parser from 'rss-parser'

const DIST_FOLDER = 'dist/'
const FEEDS = [
  'https://www.tagesschau.de/xml/rss2/',
  'https://www.spiegel.de/schlagzeilen/index.rss',
  'https://www.reddit.com/.rss',
]

const main = async () => {
  if (!fs.existsSync(DIST_FOLDER)) {
    fs.mkdirSync(DIST_FOLDER)
  }

  const parser = new Parser()

  for (const url of FEEDS) {
    console.log('fetching feed', url)

    const feed = await parser.parseURL(url)
    const filename = DIST_FOLDER + encodeURIComponent(url)
    fs.writeFileSync(filename, JSON.stringify(feed))
  }
}

main()
