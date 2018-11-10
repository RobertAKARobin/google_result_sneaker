const request = require('request')
const terms = require('./terms.json')

function chainAsync(array){
	let index = 0
	next()

	function next(){
		if(array[index]){
			array[index](next)
			index += 1
		}
	}
}


const matcher = /<div class="r"><a href="(.*?)"/
chainAsync(terms.map((term, index) => {
	return function(next){
		request({
			url: `https://google.com/search?q=${term}`,
			method: 'GET',
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
			}
		}, (err, response, body)=>{
			const address = (matcher.exec(body) || [])[1]
			console.log(`${index},${address}`)
			next()
		})
	}
}))
