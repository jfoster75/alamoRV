function getConsignmentListing() {
    var source_data = {};

    $.getJSON( 'arv.data.json', function( data ) {
        source_data = $.parseJSON( data );

        console.log(source_data);
    });
}