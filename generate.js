const fs = require('fs')
const path = require('path')
const mime = require('mime')

function dirTree(filename) {
	let stats = fs.lstatSync(filename)

	let info = {
		path: filename.replace('./docs/', ''),
		name: path.basename(filename)
	}

	if (stats.isDirectory()) {
		info.type = 'folder'
		info.children = fs.readdirSync(filename).map(function (child) {
			return dirTree(filename + '/' + child)
		})
	} else {
		info.type = 'file'
		info.mime_type = mime.getType(info.name)
		info.size = stats.size
	}

	return info
}

console.log(JSON.stringify(dirTree('./docs/images/wallpapers'), null, 4))