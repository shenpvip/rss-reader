const Fastify = require("fastify")
const fs = require("fs-extra")
const path = require("path")
const cors = require("@fastify/cors")
const serveStatic = require("@fastify/static")

const fastify = Fastify({
  logger: true,
})
let Parser = require("rss-parser")
let parser = new Parser()

const opt = {
  schema: {
    querystring: {
      url: { type: "string" },
      delay: { type: "number" },
    },
  },
}
fastify.register(cors, {
  // put your options here
})
fastify.register(serveStatic, {
  root: path.join(__dirname, "client/dist/build/h5"),
  prefix: "/", // optional: default '/'
})

fastify.get("/test", opt, async (request, reply) => {
  try {
    const delay = request.query.delay ? request.query.delay : 1000
    var res = await new Promise(function (resolve) {
      setTimeout(resolve, delay, { code: "1", delay })
    })
    return res
  } catch (error) {
    return { code: "0", msg: error }
  }
})

fastify.get("/getList", async (request, reply) => {
  try {
    const db = fs.readJsonSync(path.resolve(__dirname, "./db.json"))
    return { code: "1", result: db, msg: "success" }
  } catch (error) {
    return { code: "0", msg: error }
  }
})

fastify.get("/getDetail", opt, async (request, reply) => {
  try {
    let feed = await parser.parseURL(request.query.url)
    if (!feed) {
      return { code: "0", msg: "url解析错误" }
    }
    return { code: "1", result: feed, msg: "success" }
  } catch (error) {
    return { code: "0", msg: error }
  }
})

fastify.get("/add", opt, async (request, reply) => {
  try {
    let feed = await parser.parseURL(request.query.url)
    if (!feed) {
      return { code: "0", msg: "url解析错误" }
    }
    const { title, feedUrl, link, description = "" } = feed
    const newRss = {
      title,
      link,
      description,
      favicon: link + "/favicon.ico",
      rssUrl: request.query.url,
    }
    const db = fs.readJsonSync(path.resolve(__dirname, "./db.json"))
    const list = [...db.list, newRss]
    await fs.outputJson(path.join(__dirname, "/db.json"), {
      list,
    })
    return { code: "1", result: list, detail: feed, msg: "success" }
  } catch (error) {
    return { code: "0", msg: error }
  }
})

fastify.get("/del", opt, async (request, reply) => {
  try {
    const db = fs.readJsonSync(path.resolve(__dirname, "./db.json"))
    const list = db.list
    const i = list.findIndex((item) => item.rssUrl === request.query.url)
    if (i > -1) {
      list.splice(i, 1)
    }
    await fs.outputJson(path.join(__dirname, "/db.json"), {
      list,
    })
    return { code: "1", result: list, msg: "success" }
  } catch (error) {
    return { code: "0", msg: error }
  }
})

fastify.get("/edit", opt, async (request, reply) => {
  try {
    const db = fs.readJsonSync(path.resolve(__dirname, "./db.json"))
    const list = db.list
    let feed = await parser.parseURL(request.query.newUrl)
    if (!feed) {
      return { code: "0", msg: "url解析错误" }
    }
    const { title, link, description = "" } = feed
    const newRss = {
      title,
      link,
      description,
      favicon: link + "/favicon.ico",
      rssUrl: request.query.newUrl,
    }
    const i = list.findIndex((item) => item.rssUrl === request.query.url)
    if (i > -1) {
      list[i] = newRss
    }
    await fs.outputJson(path.join(__dirname, "/db.json"), {
      list,
    })
    return { code: "1", result: list, detail: feed, msg: "success" }
  } catch (error) {
    return { code: "0", msg: error }
  }
})

fastify.listen(8000, "0.0.0.0", function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
