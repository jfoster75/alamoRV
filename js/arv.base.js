function getConsignmentListing() {
    var source_data = {}
    ;

    $.getJSON( 'arv.data.json', function( data ) {
        source_data = $.parseJSON( data );

        $.each( source_data.listings, function( listing ) {
            alert( JSON.stringify( listing.name ) );
        });
    });
}