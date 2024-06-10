const { crawlPage } = require("./crawl")

function main() {
    if (process.argv.length < 3){
        console.log("No website provided")
        process.exit
    }

    if (process.argv.length > 3){
        console.log("Too many command line args")
        process.exit
    }

    const baseUrl = process.argv[2]

    console.log(`Starting crawl of ${baseUrl}`)
    crawlPage(baseUrl)
}

main()