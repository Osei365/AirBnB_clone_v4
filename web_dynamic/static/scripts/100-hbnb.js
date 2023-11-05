$(document).ready(function () {
    const amenityIds = {};
    const stateIds = {};
    const cityIds = {};
  
    $('.amenities input[type="checkbox"]').change(function() {
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
  
    $.ajax({
      type: 'Get',
      url: 'http://0.0.0.0:5001/api/v1/status/',
      success: function (data) {
        if (data.status === 'OK') {
          $('DIV#api_status').addClass('available');
        } else {
          $('DIV#api_status').removeClass('available');
        }
      }
    });
    
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        data: '{}',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                let place = data[i]
                $('places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + '</div><div class="number_rooms">' + place.number_rooms + '</div><div class="number_bathrooms">' + place.number_bathrooms + '</div></div><div class="user"><b>Owner:</b>' + place.user.first_name + place.user.last_name + '</div><div class="description">' + place.description + '</div></article>')
            }
        }
    });

    $('.filters > button').click(function () {
        $('.places > article').remove();
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            data: JSON.stringify({
                'amenities': Object.keys(amenityIds),
                'states': Object.keys(stateIds),
                'cities': Object.keys(cityIds)
            }),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    let place = data[i]
                    $('places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + '</div><div class="number_rooms">' + place.number_rooms + '</div><div class="number_bathrooms">' + place.number_bathrooms + '</div></div><div class="user"><b>Owner:</b>' + place.user.first_name + place.user.last_name + '</div><div class="description">' + place.description + '</div></article>')
                }
            }
        });
    });

    $('.statelist input[type="checkbox"]').change(function() {
        const id = $(this).data('id');
        const name = $(this).data('name');
        if ($(this).prop('checked')) {
          stateIds[id] = name;
        } else {
          delete stateIds[id];
        }
    
        if (Object.keys(stateIds).length === 0) {
          $('.loactions h4').html('&nbsp');
        } else {
          $('.locations h4').text(Object.values(stateIds).join(', '));
        }
      });

      $('.citylist input[type="checkbox"]').change(function() {
        const id = $(this).data('id');
        const name = $(this).data('name');
        if ($(this).prop('checked')) {
          cityIds[id] = name;
        } else {
          delete cityIds[id];
        }
    
        if (Object.keys(cityIds).length === 0) {
          $('.loactions h4').html('&nbsp');
        } else {
          $('.locations h4').text(Object.values(cityIds).join(', '));
        }
      });
  });
  