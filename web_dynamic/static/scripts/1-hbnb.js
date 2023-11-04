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
});
