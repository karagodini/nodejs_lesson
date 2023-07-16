const http = require('http')
const fs = require('fs')
const path = require('path')
const { error } = require('console')
const server = http.createServer((req, res) => {
    /*if(req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
            if(err) {
                throw err
            }
            res.writeHead(200, {
                'Content-type': 'text/html'
            })
            res.end(data)
        })
    } else if(req.url === '/contact') {
        fs.readFile(path.join(__dirname, 'public', 'contact.html'), (err, data) => {
            if(err) {
                throw err
            }
            res.writeHead(200, {
                'Content-type': 'text/html'
            })
            res.end(data)
        })
    }*/

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
    const ext = path.extname(filePath)
    let contentType = 'type/html'
    switch (ext) {
        case '.css':
            contentType = 'type/css'
            break
        case '.js':
            contentType = 'type/javascript'
            break
        default:
            contentType = 'type/html'
    }
    if(!ext) {
        filePath += '.html'
    }
    fs.readFile(filePath, (err, content) => {
        if(err) {
            fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
                if(err) {
                    res.writeHead(500)
                    res.end('Error')
                } else {
                    res.writeHead(200, {
                        'Content-type': contentType
                    })
                    res.end(data)
                }
            })
        } else {
            res.end(content)
        }
    })
})

server.listen(3000, () => {
    console.log('Server started...')
})