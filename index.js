import fs from 'fs'
import Parser from 'rss-parser'
import fetch from 'node-fetch'

const DIST_FOLDER = 'dist/'
const FEEDS = [
  ['tagesschau', 'https://www.tagesschau.de/xml/rss2/'],
  ['spiegel', 'https://www.spiegel.de/schlagzeilen/index.rss'],
  ['reddit', 'https://www.reddit.com/.rss'],
  ['rnd', 'https://www.rnd.de/arc/outboundfeeds/rss/'],
  ['geo', 'https://www.geo.de/feed/rss/geo/'],
  ['ntv', 'https://www.n-tv.de/rss'],
  ['deutschlandfunk-nachrichten', 'https://www.deutschlandfunk.de/nachrichten-100.rss'],
  ['deutschlandfunk-politikportal', 'https://www.deutschlandfunk.de/politikportal-100.rss'],
  ['deutschlandfunk-wirtschaft', 'https://www.deutschlandfunk.de/wirtschaft-106.rss'],
  ['deutschlandfunk-wissen', 'https://www.deutschlandfunk.de/wissen-106.rss'],
  ['deutschlandfunk-kulturportal', 'https://www.deutschlandfunk.de/kulturportal-100.rss'],
  ['deutschlandfunk-europa', 'https://www.deutschlandfunk.de/europa-112.rss'],
  ['deutschlandfunk-gesellschaft', 'https://www.deutschlandfunk.de/gesellschaft-106.rss'],
  ['deutschlandfunk-sportportal', 'https://www.deutschlandfunk.de/sportportal-100.rss'],
]

const main = async () => {
  if (!fs.existsSync(DIST_FOLDER)) {
    fs.mkdirSync(DIST_FOLDER)
  }

  const parser = new Parser()

  const meta = {
    feeds: FEEDS,
  }

  FEEDS.forEach(([slug, url]) => (meta[url] = slug))
  FEEDS.forEach(([slug, url]) => (meta[slug] = url))

  for (const [slug, url] of FEEDS) {
    console.log('fetching feed', url)
    const res = await fetch(url)
    const xml = await res.text()

    const feed = await parser.parseString(xml)

    // TODO use url as filename, does this even work on a file based workflow?
    //const filename = DIST_FOLDER + encodeURIComponent(url)
    const filename = DIST_FOLDER + slug
    fs.writeFileSync(filename + '.json', JSON.stringify(feed))
    fs.writeFileSync(filename + '.xml', xml)
  }

  // TODO list of all feeds
  // index.html is needed in order for github pages to work
  fs.writeFileSync(DIST_FOLDER + 'index.html', 'hello world')
  fs.writeFileSync(DIST_FOLDER + 'meta.json', JSON.stringify(meta))
}

main()
