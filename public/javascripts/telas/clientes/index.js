	    $("table").tablesorter({
		// sort on the first column and third column, order asc
		sortList: [[0,0],[0,0]],
		widgets: ['zebra'],
		headers:{ 4:{ sorter: false }}
	    });

addEvent( window, 'load', function (){
	$(document).ready(function() {
	    // call the tablesorter plugin
	    $("table").tablesorter({
		// sort on the first column and third column, order asc
		sortList: [[0,0],[0,0]],
		widgets: ['zebra'],
		headers:{ 4:{ sorter: false }}
	    });
	});
});
