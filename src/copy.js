// 'copy' here means "Suitable source material for journalism"

export let awesomePreamble = `# Awesome Unreal Engine
![Unreal Engine Logo](i/unreal-engine-bookmarks-awesome.avif)
## UE5 tutorials, assets, and articles

[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

A curated list of awesome articles & resources for **[Unreal game engine](https://www.unrealengine.com/)**.
Resources focused on a particular art direction are separated out.  You may find a few links [not specific to UE](#other), but are about 3d assets, game or [movie](#movie) production, etc.

Beginners should start with [Community](#community) & [beginner](#beginner).  Experts can find many more links in the [all page](https://github.com/tomByrer/awesome-unreal-engine/blob/main/all.md#unreal-engine--bookmarks).

Inspired by the [awesome](https://github.com/sindresorhus/awesome?tab=readme-ov-file#gaming) list.
`

export let allPreamble = `# More Unreal Engine Bookmarks
![Unreal Engine Logo](i/unreal-engine-bookmarks-more.avif)
## UE5 tutorials, assets, and articles

[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

A curated list of awesome articles & resources for **[Unreal game engine](https://www.unrealengine.com/)**.
Resources focused on a particular art direction are separated out.  You may find a few links [not specific to UE](#other), but are about 3d assets, game or [movie](#movie) production, etc.

Not all resources are [awesome](https://github.com/sindresorhus/awesome?tab=readme-ov-file#gaming).
But hopefully all of these will find their audience.
(This is the CSV 300+ bookmarks dump formatted in Markdown.)
`

export let append = `


## Also by Author

- [github.com/tomByrer](https://github.com/tomByrer) - many other JavaScript repos

## License

Copyright (c)2025-2026, JS code Copyright (c)2019-2026
You may fork &/or copy to your own harddrive if you intend to make improvements and send them back to this repo.
You may NOT republish/repurpose the entire list (in readme.md, all.md, &/or the CSV file) to any other platform, as is, as HTML, or any other format.

You are free link to this repo, so please share a link in your blog, YouTube channel, Reddit, etc.
`

// S2 = selected topics in sorted order
export let S2 = {
  'Stylized-Art': {
    about: '"Stylized" in games is a off-realistic, more minimal interpretation, though sometimes (eg with characters) may be exaggerated.',
    list: [
      'Ghibli',
      'Zelda',
      'Fortnite',
      'anime',
      'comic',
      'cartoon',
      'pixelized',
      'retro',
      'painted',
      'stylized',
    ]
  },

  'Other-Styles': {
    about: 'More interesting Unreal Engine links.',
    list: [
      'scifi',
      'water',
      'effect',
      'generic',
      'movie',
      'audio',
    ]
  },
  
  'General': {
    about: "Miscellaneous topics that do not directly apply to any art style.",
    list: [
      //TODO: sub-topic language
      'none'
    ],
    'lang': {
      about: "Focus",
      list: [  // general to specific
        "community",
        "beginner",
        "GenAI",
        "analysis",
        "AI-char",
        "environment",
        "MetaHuman",
        "asset",
        "physics",
        "motion",
        "shader",
        "material",
        "niagara",
        'camera',
        "blueprint",
        "c++",
        "msc-ue", // fall back UE
        "other" // outside UE
      ]
    }
  },
}
