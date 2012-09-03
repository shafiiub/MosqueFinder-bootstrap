$(document).ready(function(){
//alert('k');
	  initialize();
      $('#test').popover('hide');
      $('.nav li a').tooltip('hide');
      $(".alert").alert();
});

      function initialize() {
      
        clickIcon = new google.maps.MarkerImage('img/prayer-small-pin.png',
				new google.maps.Size(18, 23),
				new google.maps.Point(0, 0),
				new google.maps.Point(0, 23)
			  );
        myIcon = new google.maps.MarkerImage('img/geolocation_icon.png',
				new google.maps.Size(15, 25),
				new google.maps.Point(0, 0),
				new google.maps.Point(0, 25)
			  );
       var center = new google.maps.LatLng(-28.304381,134.824219);
        var map = new google.maps.Map(document.getElementById("map_canvas"), {
          zoom: 4,
          center: center,
          streetViewControl:false,
	  zoomControl: true,
	  zoomControlOptions: {
	     style: google.maps.ZoomControlStyle.SMALL
	  },
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var input = document.getElementById('txtMyAddress');
        var options = {
          componentRestrictions: {country: 'au'}
        };

        var autocomplete = new google.maps.places.Autocomplete(input,options);
        autocomplete.bindTo('bounds', map);

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
        
        var place = autocomplete.getPlace();
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(16);  // Why 17? Because it looks good.
          }
        
          var marker = new google.maps.Marker({
               'position': place.geometry.location,
	       		'map': map,
				'title': 'My Location',
                 'icon': myIcon
                });                    

                markers.push(marker);
        //alert(place.geometry.location + ' - '+place.geometry.viewport);
        //     _gaq.push(['_trackEvent', 'Location', 'Prayer-location', jQuery("#txtMyAddress").val()]);
        });


	var contentString = 'Test';
		
	var infowindow =  new google.maps.InfoWindow({
			content: ''
	});
  
	function bindInfoWindow(marker, map, infowindow, html) { 
		google.maps.event.addListener(marker, 'click', function() { 
				infowindow.setContent(html); 
				infowindow.open(map, marker); 
		}); 
          
	}
		
		
        var markers = [];
			jQuery.getJSON("app-data/wp_postmeta_extended.json",
			function(data) {
                alert(data.length);
                for (var x = 0; x < data.length; x++) {
                var latLng = new google.maps.LatLng(data[x].Latitude, data[x].Longitude);
                var marker = new google.maps.Marker({
                        'position': latLng,
						'map': map,
						'title': '' +data[x].Location,
                        'icon': clickIcon
                });                    

                markers.push(marker);
		bindInfoWindow(marker, map, infowindow, "<p><strong>" +data[x].post_title + "</strong><br/>" + data[x].Location  +"</p><p><a href='#myModal' role='button' class='btn' data-toggle='modal'>Launch demo modal</a><a href='"+ data[x].ID +"'>more info</a></p>");
                }
              var markerCluster = new MarkerClusterer(map, markers);
             
                   // our handler function will go here
                 // this part is very important!
                 // it's what happens with the JSON data
                 // after it is fetched via AJAX!
              }
  );

			
			
         /*jQuery.ajax({
          url: 'http://mosque-finder.com.au/directory/app-data/wp_postmeta_extended.json',
          data:{
               'action':'do_ajax',
               'fn':'get_latest_posts',
               'count':10
               },
          dataType: 'JSON',
          success:function(data){
                //alert(data.length);
                for (var x = 0; x < data.length; x++) {
                var latLng = new google.maps.LatLng(data[x].Latitude, data[x].Longitude);
                var marker = new google.maps.Marker({
                        'position': latLng,
			'map': map,
			'title': '' +data[x].Location,
                        'icon': clickIcon
                });                    

                markers.push(marker);
		bindInfoWindow(marker, map, infowindow, "<p><strong>" +data[x].post_title + "</strong><br/>" + data[x].Location  +"</p><p><a href='http://mosque-finder.com.au/directory/?p="+ data[x].ID +"'>more info</a></p>");
                }
              var markerCluster = new MarkerClusterer(map, markers);
             
                   // our handler function will go here
                 // this part is very important!
                 // it's what happens with the JSON data
                 // after it is fetched via AJAX!
              },
          error: function(errorThrown){
               alert('error');
               console.log(errorThrown);
          }
 
     });*/
   }      
      