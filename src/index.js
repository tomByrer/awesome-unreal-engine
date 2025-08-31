/* v1.1.0 csv-to-awesome
 @2019-2026 Tom Byrer, License MIT
 used to build: https://github.com/tomByrer/awesome-cloudflare-workers
*/

import Papa from 'papaparse'
import fs from 'node:fs'
import { awesomePreamble, append } from './copy.js'

function getIconFormat(format){
  let ret = ''
  // order is consecutive
  if ( (/video/).test(format) ){
    ret += '⏯️'
  }
  if ( (/store/).test(format) ){
    ret += '🏪'
  }
  return ret + ' '
}
function listTags(headerNow, topics, language){
  let list = ` [${topics.filter(topic => topic !== headerNow)}`
  //todo: filter out if in descriptions
  if (language && list !== " [") {
    list += `,`
  }
  // list += ((language === "ES2015") || (language === "ES2017")) ? `JS` : language
  if (list !== ` [`) {
    return `${list.replace(/,(?=[^\s])/g, ", ").replace(/,\s?$/, "")}]`
  } else {
    return ``
  }
}
function getHeader(header){
  const headerCapCase = header.charAt(0).toUpperCase() + header.slice(1)
  return{
    tocHeader: `\n - [${headerCapCase}](#${header})`,
    mdHeader: `\n\n\n## ${headerCapCase}`,
  }
}
function getBookmark(bm){
  let md = '\n\n [' + getIconFormat(bm.format)
  md += `${bm.title} ~ ${bm.author}](${bm.url})`
  md += listTags(bm, bm.topics, bm.language)
  if (bm.urlOther) {
    md += ` ([${bm.urlOtherTitle}](${bm.urlOther}))`
  }
  if (bm.notes){
    md += ` - ${bm.notes}`
  }
  return md + '.' // per awesome guidelines
}

function createAwesome(aweArr) {
  const HEADERS = [
    // note order
    "course",
    "tutorial",
    "analysis",
  ]
  let md = ""
  let toc = `\n## Contents\n`
  let headerNow = ""
  let currentRow = {}

  for (let h=0; h < HEADERS.length; h++) {
    headerNow = HEADERS[h]
    const { tocHeader, mdHeader } = getHeader(headerNow)
    toc += tocHeader
    md += mdHeader

    for (let i=0; i < aweArr.length; i++) {
      currentRow = aweArr[i]
      if (headerNow === currentRow.header) {
        md += getBookmark(currentRow)
      }
    }
  }

  return toc + md
}

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
  let content = awesomePreamble
  content += createAwesome(csvRows)
  content += append

  fs.writeFile("./README.md", content, (err) => {
    if (err) throw err;
    console.info(`csv-to-awesome: new file at "./readme.md"`)
    // console.log(content)
  })
})
