
$(function() {

	$( "#search_button" ).click(function() { 
		find_node($("#search_input").val()); 
	});

});

 
function find_node(si) {
    $.getJSON('/searchNodes?keyword='+si , function(data) {
    	$.each(data.node, function(i, item) {
    		$('.graph').append(
    			'<a href="/view_connectedNodes/'+ item._id + '">'+item.label+'</a>'
    			+ item.description + '</br>'
    			);
		});
    	//$("#search_input").val("Test"); 
    });
}


