const {JSDOM} = require("jsdom")

async function crawlPage(currentURL){
    console.log(`Active crawling ${currentURL}`)

    try {
        const resp = await fetch(currentURL)

        if (resp.status > 399){
            console.log(`Error in fetch API with status code ${resp.status} on page ${currentURL}`)
            return
        }

        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")){
            console.log(`Non HTML response, content-type is ${contentType} on page ${currentURL}`)
            return
        }
        console.log(await resp.text())

    } catch(err){
        console.log(`Error in fetch: ${err.message} on page ${currentURL}`)
    } 
}
function getUrlFromHTML(baseUrl, htmlBody){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window._document.querySelectorAll('a')
    for (const linkElement of linkElements){
        if (linkElement.href.slice(0,1) === '/'){
            try {
                const urlObj = new URL(`${baseUrl}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            try {
                const urlObj = new URL(`${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`)
            }
        }
    }
    return urls
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1).toLowerCase()
    }
    return hostPath.toLowerCase()
}

module.exports = {
    crawlPage,
    normalizeURL,
    getUrlFromHTML
}