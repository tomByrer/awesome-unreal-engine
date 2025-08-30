/* v1.1.0 csv-to-awesome
 @2019-2026 Tom Byrer, License MIT
 used to build: https://github.com/tomByrer/awesome-cloudflare-workers
*/

const Papa = require('papaparse')
const fs = require("fs")

function createMD(aweArr) {
  const HEADERS = [
    "course",
    "tutorial",
    "analysis",
  ]
  let md = ""
  let toc = `\n## Contents\n`
  let headerNow = ""
  let headerCapCase = ""
  let currentRow = {}

  function listTags(headerNow, topics, language){
    let list = ` [${topics.filter(topic => topic !== headerNow)}`
    //todo: filter out if in descriptions
    if (language && list !== " [") {
      list += `,`
    }
    // list += ((language === "ES2015") || (language === "ES2017")) ? `JS` : language
    if (list !== ` [`) {
      return `${list.replace(/,(?=[^\s])/g, ", ")}]`
    } else {
      return ``
    }
  }

  function selectIconFormat(format){
    let ret = ''
    if ( (/video/).test(format) ){
      ret += '⏯️'
    }
    if ( (/store/).test(format) ){
      ret += '🏪'
    }
    return ret + ' '
  }

  for (let h=0; h < HEADERS.length; h++) {
    headerNow = HEADERS[h]
    headerCapCase = headerNow.charAt(0).toUpperCase() + headerNow.slice(1)
    toc += `\n - [${headerCapCase}](#${headerNow})`
    md += `\n\n## ${headerCapCase}\n`

    for (let i=0; i < aweArr.length; i++) {
      currentRow = aweArr[i]
      if (headerNow === currentRow.header) {
        md += '\n\n [' + selectIconFormat(currentRow.format)
        md += `${currentRow.title} ~ ${currentRow.author}](${currentRow.url})`
        md += listTags(headerNow, currentRow.topics, currentRow.language)
        if (currentRow.urlOther) {
          md += ` ([${currentRow.urlOtherTitle}](${currentRow.urlOther}))`
        }
        if (currentRow.notes){
          md += ` - ${currentRow.notes}`
        }
        md += '.' // per awesome guidelines
      }
    }
  }

  return toc + md
}


let mdPreamble = `# Awesome Unreal Engine Stylized

## (UE5 tutorials & assets focus on a certain art direction)

[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

A curated list of awesome articles & resources for **[Unreal game engine](https://workers.cloudflare.com/)**, though most techniques will work with many art directions given enough tweaks.

Inspired by the [awesome](https://github.com/sindresorhus/awesome) list.  (A bit different, since the CSV bookmark dump contains *many* other links that didn't make the 'awesome' list.)

Please use the [Link Suggestion Form]() to add an URL to this list.  To fix something, suggest a new category, tag, etc, reach me on Twitter/X.

`
let mdAppend = `

## Also by Author

- [github.com/tomByrer](https://github.com/tomByrer) - many other JavaScript repos

## License

Copyright (c)2025, JS code Copyright (c)2019-2025
You may fork &/or copy to your own harddrive if you intend to make improvements to this repo.
You may NOT republish/repurpose the entire list (in readme.md, honorable-mention.md, &/or the CSV file) to any other platform.

You are free link to this repo, so please share a link in your blog, YouTube channel, Reddit, etc.
`


// main
let csvRows = []
let res = {}
fs.readFile("./src/unreal-bookmarks.csv", 'utf8', (err, data) => {
  if (err) throw err;
  Papa.parse(data, {
    header: true,
    step: csvRow => {
      res = csvRow.data
      if (res.header) { // header = include in awesome list
        res.topics = res.topics.split(",", 3)
        return csvRows.push(res)
      } else { // noop
        return 
      }
    }
  })
  csvRows.sort((a, b) => (a.updated < b.updated) ? 1 : -1)
  let content = mdPreamble
  content += createMD(csvRows)
  content += mdAppend
  // let content = `${mdPreamble} ${createMD(csvRows)} ${mdAppend}`
  console.error('//fix mdAppend')

  fs.writeFile("./README.md", content, (err) => {
    if (err) throw err;
    console.info(`csv-to-awesome: new file at "./readme.md"`)
    // console.log(content)
  })
})
