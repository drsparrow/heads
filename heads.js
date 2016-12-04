$(function(){
  var $content = $('#js-content')

  var getRandomDir = function () {
    var rand = Math.random() + 1
    var parity = (Math.random() < .5) ? 1 : -1
    return rand * parity
  }

  var getRandomPos = function (dimension) {
    return Math.random() * $content[dimension]()
  }

  var moveHeads = function() {
    var height = $content.height()
    var width = $content.width()

    $('.js-floating-head').each(function(){
      var $head = $(this)
      var top = $head.position().top + $head.data('top')

      if((top+$head.height()) < 0) {
        top = height
      } else if (top-$head.height() > height) {
        top = -$head.height()
      }
      $head.css('top', top)


      var left = ($head.position().left + $head.data('left'))
      if((left+$head.width()) < 0) {
        left = width
      } else if (left-$head.width() > width) {
        left = -$head.width()
      }
      $head.css('left', left)

    })
  }

  var addHead = function (left, top) {
    var size = 60 * (Math.random() + 2)
    var $head = $('<img>')
    left = (left ? left - size/2 : getRandomPos('width'))
    top = (top ? top - size/2 : getRandomPos('height'))
    $head.attr('src', 'j.png')
    $head.data('left', getRandomDir())
    $head.data('top', getRandomDir())

    $head.css({left: left, top: top, width: size})
    $head.css('z-index', 1000 - Math.round(size))
    $head.addClass('js-floating-head floating-head')
    $content.append($head)
  }

  for(var i=0; i < 5; i++) {
    addHead()
  }

  $('#js-content:not(.js-floating-head)').click(function(e) {
    if(e.target == this) {
      addHead(e.clientX, e.clientY)
    } else if($(e.target).is('.js-floating-head')) {
      $(e.target).remove()
    }
  })


  window.setInterval(moveHeads, 10)
})
