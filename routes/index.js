var express = require('express');
var router = express.Router();

var rulesExamplesMap = [
	{
		name: "Make Fewer HTTP Requests",
		examples : [
			"Without CSS Sprites",
			"With CSS Sprites",
			"Separate Scripts",
			"Combined Scripts",
			"Inline Images"
		]
	},
	{
		name: "Add an Expires Header",
		examples: [
			 "No Expires",
			 "Far Future Expires"
		]
	},
	{
		name: "Minify JavaScript and CSS",
		examples: [
			"No Minification",
			"With Minification"
		]
	},
	{
		name: "Gzip Components",
		examples: [
			"No Gzip",
			"With Gzip",
			"With Gzip, Compression, Minification and Aggregation"
		]
	},
	{
		name: "Make JavaScript and CSS External",
		examples: [
			"Inlined JS and CSS",
			"External JS and CSS"
		]
	},
	{
		name : "Put Stylesheets at the Top",
		examples: [
			"CSS at the Bottom",
			"CSS at the Top"
		]
	},
	{
		name: "Put Scripts at the Bottom",
		examples: [
			"Scripts at the Top",
			"Scripts at the Bottom",
			"Async and Deferred Scripts"
		]
	}
]

/* GET Example Page */

router.get('/:rule/:example', function(req, res, next) {
	var ruleIndex = +req.params.rule.substr(4),
	rule = rulesExamplesMap[ruleIndex - 1],
	exampleIndex = +req.params.example.substr(7);
	var fileName = req.params.rule + '/' + req.params.example;
	console.log("fileName ", fileName);
  	res.render(fileName, { ruleName: rule.name, exampleName: rule.examples[exampleIndex - 1]});
});

/* GET Rule page */

router.get('/:rule', function(req, res, next) {
	var fileName = 'rule';
	var ruleIndex = +req.params.rule.substr(4);
	var rule = rulesExamplesMap[ruleIndex - 1];
  	res.render(fileName, { rule: rule, ruleIndex: ruleIndex });
});


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Web Performance', rulesExamplesMap: rulesExamplesMap });
});



module.exports = router;
