$(function () {
  let allStudios
  let versions = [1, 2, 3]
  let links = $('.menu-container a')

  $.ajax({
    url: '../studios.json',
    dataType: 'json',
    async: false
  }).done(function (data) {
    console.log('studios', data)
    allStudios = data
  }).fail(function (a, b, error) {
    console.log(error)
  })

  // Add click event to each link
  // using special jquery object $(this)
  // to reference each element that was matched

  links.on('click', function () {

    // Remove the active class from all links
    links.removeClass('active')

    // Add the active class to the link that was clicked
    // which is refererenced by $(this)
    $(this).addClass('active')
  })

  $('#featured').click(handleFeature)

  function handleFeature () {
    console.log('showing featured')

    // iterate through studios
    // only select list of studios where featured is true

    let featuredStudios = allStudios.filter(function (studio) {
      return studio.featured === true
    })

    console.log(featuredStudios)
    displayEvents(featuredStudios)
  }

  // displaying events on screen
  displayEvents(allStudios)

  let mixer = mixitup('.flex-hub-container', {
    multifilter: { enable: true }
  })

  function reset () {
    display(allStudios)
  }

  // loop through studios list and generate card for
  // each studio and display on the screen
  function displayEvents (selectedStudios) {
    let version
    let versionIndex = 0

    console.log(selectedStudios)

    // clear out events in list
    $('.flex-hub-container').html('')

    selectedStudios.forEach(function (studio) {
      if (studio.studioName !== '') {
        version = 4
      } else {
        // ensure same pattern is not selected twice in a row
        if (versionIndex >= 3) {
          // reset versionIndex to 0
          // if index is equal to or greater than 3
          versionIndex = 0
        }

        version = versions[versionIndex]
        versionIndex = versionIndex + 1
      }

      console.log('version', version)

      let cardHtml = generateCard(studio, version)

      $('.flex-hub-container').append(cardHtml)
    })
  }

  // This function is responsible for
  // generating the card html for each event
  function generateCard (event, version) {
    let name

    // if a studio name exists then use that name
    // else use the event title
    if (event.studioName !== '') {
      name = event.studioName
    } else {
      name = event.eventTitle
    }

    let typeClass = ''

    if (version === 4) {
      typeClass = 'studio'
    } else {
      typeClass = 'event'
    }

    let featuredClass = ''

    if (event.featured === true) {
      featuredClass = 'featuredEvent'
    }

    let boroughClass = event.borough

    console.log(`${name}: ${event.url}`)

    return (
      `<div class="hub-card v${version} mix ${typeClass} ${featuredClass} ${boroughClass}">

        <div class="hvr-bounce-to-bottom-${version}">
          <img src="images/pattern_${version}.png">

          <a target="_blank" href=${event.url}>

            <div class="ontop">
              <div class="day">
                <h1>${event.dayOfWeek}</h1>
              </div>

              <div class="date">
                <h3>${event.dateTime}</h3>
              </div>

              <div class="location">
                <h4>${event.city}</h4>
              </div>

              <div class="title">
                <h2>${name}</h2>
              </div>
            </div>
          </a>
        </div>
      </div>`)
  }

  $('#mobile-menu-button').click(function() {
       if ($('.nav-container').hasClass('showing')) {
           $('.nav-container').removeClass('showing').addClass('hiding')
       } else {
           $('.nav-container').removeClass('hiding').addClass('showing')
       }
   });
// Hiding the show/hide js for now
// Use jQuery to hide all of the
// filters when the application first
// loads

  // $('#cityActive').click(showHideCity)
  // $('#typeActive').click(showHideType)

  // function showHideCity () {
// print out message to ensure
// function "does something" when
// #answer1 element is clicked
  //   console.log('calling showHideCity')

// show the #answer1 element using .show()
   //  $("#answer1").show()

// slide toggle #answer1 using .slideToggle()
// this will open and close the #answer1 element
// using a slide animation
  //   $('#hideCity').slideToggle()
  // }

  // function showHideType () {
  //   $('#hideType').slideToggle()
  // }
});
