/* v1.3.0 csv-to-awesome-unreal
 @2019-2026 Tom Byrer, License MIT
 used to build: https://github.com/tomByrer/awesome-cloudflare-workers
*/

import Papa from 'papaparse'
import fs from 'node:fs'
import { awesomePreamble, allPreamble, append } from './copy.js'

function getIconFormat(format){
  let ret = ''
  // order is consecutive
  if ( (/video/).test(format) ){
    ret += '⏯️'
  }
  if ( (/playlist/).test(format) ){
    ret += '⏯️📜'
  }
  if ( (/store/).test(format) ){
    ret += '🏪'
  }
  if ( (/blog/).test(format) ){
    ret += '📄'
  }
  if ( (/repo/).test(format) ){
    ret += '💽'
  }
  return ret + ' '
}
// function listTags(headerNow, topics, language){
//   let list = ` [${topics.filter(topic => topic !== headerNow)}`
//   //todo: filter out if in descriptions
//   if (language && list !== " [") {
//     list += `,`
//   }
//   // list += ((language === "ES2015") || (language === "ES2017")) ? `JS` : language
//   if (list !== ` [`) {
//     return `${list.replace(/,(?=[^\s])/g, ", ").replace(/,\s?$/, "")}]`
//   } else {
//     return ``
//   }
// }
function getHeader(header, indent=1){
  header = (header === null) ? 'styleless' : header
  const headerCapCase = header.charAt(0).toUpperCase() + header.slice(1)
  return{
    tocHeader: `\n${' '.repeat(indent*2 -1)}- [${headerCapCase}](#${header})`,
    mdHeader: `\n\n\n#${'#'.repeat(indent)} ${headerCapCase}`,
  }
}
function getBookmark(bm, isLangSorted){
  let md = '\n\n [' + getIconFormat(bm.format)
  let tags = ' ['
  md += `${bm.title} ~ ${bm.author}](${bm.url})`
  // md += listTags(bm, bm.topics, bm.lang)
  tags += bm.topics
  tags += (isLangSorted) ? '' : ','+ bm.lang
  md += (tags === ' [') ? '' : tags.replace('[,', '[') +']'
  if (bm.urlOther) {
    md += ` ([${bm.urlOtherTitle}](${bm.urlOther}))`
  }
  if (bm.notes){
    md += ` - ${bm.notes}`
  }
  return md + '.' // per awesome guidelines
}
function getFooter(count){
  return `

---
---

*updated: ${new Date().toISOString()}, bookmarks listed: ${count}*
`
}

const S2 = {
  'Stylized-Art': {
    about: '"Stylized" in games is a off-realistic, more minimal interpretation, though sometimes (eg with characters) may be exaggerated.',
    list: [
      'Ghibli',
      'anime',
      'comic',
      'cartoon',
      'pixelized',
      'Zelda',
      'Fortnite',
      'stylized'
    ]
  },
  'Other-Styles': {
    about: 'More interesting Unreal Engine links.',
    list: [
      'scifi',
      'water',
      'effect',
      'generic'
    ]
  },
  'Programming': {
    about: "Miscellaneous programming topics that don't directly apply to any art style.",
    list: [
      //TODO: sub-topic language
      'none'
    ],
    'lang': {
      about: "Focus",
      list: [  // general to specific
        "beginner",
        "analysis",
        "Ai",
        "environment",
        "asset",
        "physics",
        "shader",
        "gradient",
        "material",
        "niagara",
        'camera',
        "blueprint",
        "c++",
        "msc" // fall back
      ]
    }
  } //Programming
}

function createMarkdown(aweArr, isAwesome=false) {
  let md = ""
  let toc = `\n## Contents\n`
  let headerNow = {}
  let tempList = [] // inner loop
  let bmRow = {} // BookMark item
  let listNow = '' // smallest topic
  let itemNow = '' // bookmark item topic
  const S2keys = Object.keys(S2)
  const S2len = S2keys.length
  // duplicate checker removed for now
  // let count = 0
  // const uniqueURLs = new Set()
  // let uURLsSize = 0
  for (let h=0; h < S2len; h++) {
    headerNow = S2[ S2keys[h] ]
    const { tocHeader, mdHeader } = getHeader(S2keys[h])
    toc += tocHeader
    md += mdHeader

    tempList = (headerNow.lang) ? headerNow.lang.list : headerNow.list
  // console.log(tempList)
    const listlen = tempList.length
    for (let l=0; l < listlen; l++) {
      listNow = tempList[l]
      // console.log(l, listNow)
      const { tocHeader, mdHeader } = getHeader(listNow, 2)
      toc += tocHeader
      md += mdHeader

      // bookmark Items
      let isLangSorted = false;
      for (let i=0; i < aweArr.length; i++) {
        bmRow = aweArr[i]
        if (!isAwesome || (isAwesome && bmRow.header)){
          isLangSorted = !!headerNow.lang
          itemNow = (isLangSorted) ? bmRow.lang : bmRow.style
          if (listNow === itemNow ) {
            // uniqueURLs.add(bmRow.url)
            // // console.log(uniqueURLs.size)
            // if ( uniqueURLs.size === (uURLsSize + 1) ){
            //   uURLsSize++
              md += getBookmark(bmRow, isLangSorted)
            //   count++
            // }
            // else {
            //   console.error('duplicate:', bmRow.url)
            // }
          }
        }
      }//Items
    }
  }
// console.log(toc, md)
  console.log(
    'all length:', aweArr.length-1, //- header
    // 'count', count,
    // 'uniqueURLs', uniqueURLs.size
  )

  return toc + md// + getFooter(count)
}

// main
let csvRows = []
let res = {}
fs.readFile("./src/uebm.csv", 'utf8', (err, data) => {
  if (err) throw err;
  Papa.parse(data, {
    header: true,
    step: csvRow => {
      res = csvRow.data
      // if (res.header) { // header = include in awesome list
        res.topics = res.topics.split(",", 3)
        return csvRows.push(res)
      // } else { // noop
      //   return 
      // }
    }
  })
  csvRows.sort((a, b) => (a.updated < b.updated) ? 1 : -1)

  // all = entire csv
  let contentAll = allPreamble
  contentAll += createMarkdown(csvRows)
  contentAll += append
  fs.writeFile("./all.md", contentAll, (err) => {
    if (err) throw err;
    console.info(`csv-to-awesome: new file at "./all.md"`)
  })

  // Awesome, AKA README 'best of best'
  let contentAwesome = awesomePreamble
  contentAwesome += createMarkdown(csvRows, true)
  contentAwesome += append
  fs.writeFile("./README.md", contentAwesome, (err) => {
    if (err) throw err;
    console.info(`csv-to-awesome: new file at "./readme.md"`)
  })

})
