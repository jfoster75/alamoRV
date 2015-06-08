var getListingDetails = function(id) {
  var listing        = {};
  var listing_id     = parseInt(id);
  var return_html    = '';

  $.ajax({
    type: 'GET',
    url: 'arv.data.json',
    dataType: 'json',
    success: function(data) {

      console.log(data);
      console.log(listing_id);

      for (var i = 0; i < data.listings.length; i++) {
        if (data.listings[i].id === listing_id) {
          listing = data.listings[i];
          break;
        }
      }

      if (!listing['id']) {
        window.location.replace('http://localhost:63342/alamoRV/index.html#current-listing');
      }

      console.log(listing);

      return_html = String()
      + '<a class="btn btn-primary btn-lg arv-return-link-top" href="index.html">Return to listings >></a>'
      + '<h2 class="page-header">' + listing.year + ' ' + listing.model + '</h2>'
      + '<div class="row">'
      + ' <div class="col-sm-3">' + getLeftColumn(listing) + ' </div>'
      + ' <div class="col-sm-9">' + getRightColumn(listing) + ' </div>'
      + '</div>'
      + '<a class="btn btn-primary btn-lg arv-return-link-bottom" href="index.html">Return to listings >></a>'
      ;

      $('#arv-details').append(return_html);

      $('.rv-image').on('click', function() {
        var src = $(this).attr('src');
        $('#modal-image').attr('src', src);
        $('#image-modal').modal('show');
      });

    }
  });
};

var getLeftColumn = function(listing) {
  var return_html = String()
    + '  <div class="panel panel-default">'
    + '    <div class="panel-heading"><strong>Details</strong></div>'
    + '    <div class="panel-body">'
    + '      <p class="description">' + listing.description + '</p>'
    + '    </div>'
    + '    <table class="table data-table">'
    + '      <tr>'
    + '        <td class="key">Price:</td>'
    + '        <td class="value">' + listing.price + '</td>'
    + '      </tr>'
    + '      <tr>'
    + '        <td class="key">Year:</td>'
    + '        <td class="value">' + listing.year + '</td>'
    + '      </tr>'
    + '      <tr>'
    + '        <td class="key">Mileage:</td>'
    + '        <td class="value">' + listing.mileage + '</td>'
    + '      </tr>'
    + '      <tr>'
    + '        <td class="key">Length:</td>'
    + '        <td class="value">' + listing.length + ' ft</td>'
    + '      </tr>'
      + '      <tr>'
      + '        <td class="key">Slides:</td>'
      + '        <td class="value">' + listing.slides + '</td>'
      + '      </tr>'
    + '      <tr>'
    + '        <td class="key">Type:</td>'
    + '        <td class="value">' + listing.type + '</td>'
    + '      </tr>'
    + '    </table>'
    + '  </div>'
    + '  <div class="well sales-contact">'
    + '    <h3>Like it?</h3>'
    + '    <p>Contact ' + listing.contact.name + ' at <strong>' + listing.contact.phone + '</strong>.</p>'
    + '  </div>'
  ;

  return return_html;
};

var getRightColumn = function(listing) {
  var images = listing.images;
  var max_images = images.length;
  var max_rows = Math.ceil(max_images / 4);
  var columns = '';
  var rows = '';

  listing.images.forEach(function(image, index) {
    columns += createColumn(image.src);

    if ((index + 1) % 4 === 0 || (index + 1) === max_images) {
      rows += createRow(columns);
      columns = '';
    }
  });

  return rows;
};

var createColumn = function(image_src) {
  var column = '<div class="col-sm-3"><img class="thumbnail modal-image rv-image" src="' + image_src + '"></div>';

  return column;
}

var createRow = function(columns) {
  var row = '<div class="row image-row">' + columns + "</div>";

  return row;
}

