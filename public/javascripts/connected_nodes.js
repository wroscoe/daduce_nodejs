
function get_focus_node(id) {
    $.getJSON('/node/'+id , function(data) {
    	$.each(data.node[0], function(key, value) {
    		$('.focus_node').append(
    			'<p>' + key + ':' + value +'</p>'
    			);
		});
    });
}

function get_connected_nodes(id){
	$('.connected_nodes').append("<p> connected nodes test append </p>");
    $.getJSON('/connected_nodes/'+id , function(data) {
    	$.each(data.edges, function(i, node) {
    		//TODO
    		//if doc.connection_group.id does not exist
    			// create doc.connection_group.id
			//add node to doc.connection_group.id
    		$.each(node, function(key, value) {
	    		$('.connected_nodes').append(
	    			'<div class="property">' + key + ':' + value +'</div>'
	    		);
	    	});
		});
    });
}