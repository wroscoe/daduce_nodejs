
function get_focus_node(id) {
	alert("id:"+id)
    $.getJSON('/node/'+id , function(data) {
    	$.each(data.node[1], function(key, value) {
    		$('.focus_node').append(
    			'<p>' + key + ':' + value +'</p>'
    			);
		});
    });
}

function get_connected_nodes(id){
	alert(id);
    $.getJSON('/node/'+id , function(data) {
    	$.each(data.node, function(key, value) {
    		$('.connected_nodes').append(
    			'<p>' + key + ':' + value +'</p>'
    			);
		});
    });
}