var getConsignmentListing = function() {
    var source_data     = {},
        listing_html    = '',
        row_html        = '',
        row_mod         = 0
    ;

    $.ajax({
        type: 'GET',
        url: 'arv.data.json',
        dataType: 'json',
        success: function ( data ) {
            source_data = data.listings;

            $.each( source_data, function( index, listing ) {
                row_mod = index % 4;

                console.log( 'row_mod: ', row_mod );
                console.log( 'index: ', index );
                console.log( 'listing: ', JSON.stringify( listing ) );

                row_html += getListingDiv( listing );

                if ( row_mod === 3 ) {
                    console.log( 'create new row' );

                    listing_html += getRowDiv( row_html );

                    row_html = '';
                }

            } );

            //  finish out row if loop ended before row filled up
            if ( row_mod !== 3 ) {
                listing_html += getRowDiv( row_html );
            }

            $( '#arv-listings' ).append( listing_html );
        }
    });
}

var getRowDiv = function( inner_string ) {
    var return_html = String()
            + '<div class="row">'
            + inner_string
            + '</div>'
        ;

    return return_html;
}

var getListingDiv = function( listing ) {
    var return_html = String()
        + '<div class="col-sm-3">'
        + ' <div class="panel panel-default">'
        + '     <div class="panel-heading">'
        + '         <strong>' + listing.year + ' ' + listing.model + '</strong>'
        + '     </div>'
        + '     <div class="panel-body text-center">'
        + '         <img alt="' + listing.images[0].name + '" src="' + listing.images[0].src + '" class="rv-image">'
        + '         <h3 class="rv-price">' + listing.price + '</h3>'
        + '         <a role="button" href="details.html?id=' + listing.id + '" class="btn btn-block btn-primary btn-lg">View Details</a>'
        + '     </div>'
        + ' </div>'
        + '</div>'
    ;

    return return_html;
}