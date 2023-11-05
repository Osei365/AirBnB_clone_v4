$(document).ready(function () {
  const amenityIds = {};

  $('input[type="checkbox"]').change(function() {
    const id = $(this).data('id');
    const name = $(this).data('name');
    if ($(this).prop('checked')) {
      amenityIds[id] = name;
    } else {
      delete amenityIds[id];
    }

    if (Object.keys(amenityIds).length === 0) {
      $('div.amenities h4').html('&nbsp');
    } else {
      $('div.amenities h4').text(Object.values(amenityIds).join(', '));
    }
  });

  $get.('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
