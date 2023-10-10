// Unminified and ES6'ed: (by the community)
function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

// Minified version (by StackOverflow's community, minified by JSCompress)
  function formatBytes(a,b=2){if(!+a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return`${parseFloat((a/Math.pow(1024,d)).toFixed(c))} ${["Bytes","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"][d]}`}

// SOURCES: 
// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
// https://web.archive.org/web/20120507054320/http://codeaid.net/javascript/convert-size-in-bytes-to-human-readable-format-(javascript)
