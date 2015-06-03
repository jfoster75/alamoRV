function getConsignmentListing() {
    var source_data = {}
    ;

    jQuery.ajax({
        url:      'data.html',
        success:  function( response ){
            source_data = JSON.parse( response );

            jQuery( source_data.listings ).each( function( index, listing ){
                jQuery('<li/>').html(listing.name).append('#arv_listings');
            });
        }
    });
}