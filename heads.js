$(function(){
  var $content = $('#js-content')
  var speedMult = 1
  var sizeMult = 1
  var flopped = false
  var paused = false

  var getRandomDir = function () {
    var rand = Math.random() + 1
    var parity = (Math.random() < .5) ? 1 : -1
    return rand * parity
  }

  var getRandomPos = function (dimension) {
    return Math.random() * $content[dimension]()
  }

  var moveHeads = function() {
    if(paused) { return }
    var height = $content.height()
    var width = $content.width()

    $('.js-floating-head').each(function(){
      var $head = $(this)
      var top = $head.position().top + speedMult * $head.data('top')
      if((top+$head.height()) < 0) {
        top = height
      } else if (top > height) {
        top = -$head.height()
      }
      $head.css('top', top)


      var left = ($head.position().left + speedMult * $head.data('left'))
      if((left+$head.width()) < 0) {
        left = width
      } else if (left > width) {
        left = -$head.width()
      }
      $head.css('left', left)

    })
  }

  var addHead = function (left, top) {
    var size = 60 * (Math.random() + 2)
    var realSize = size * sizeMult
    var $head = $('<img>')
    left = (left ? left - realSize/2 : getRandomPos('width'))
    top = (top ? top - realSize/2 : getRandomPos('height'))
    $head.attr('src', 'j.png')
    $head.data('left', getRandomDir())
    $head.data('top', getRandomDir())
    $head.data('size', size)

    $head.css({left: left, top: top, width: realSize})
    $head.css('z-index', 1000 - Math.round(size))
    $head.addClass('js-floating-head floating-head')
    if(flopped) { $head.addClass('flopped') }
    $content.append($head)
  }

  for(var i=0; i < 5; i++) { addHead() }

  $('#js-content').click(function(e) {
    if(e.target == this) {
      addHead(e.clientX, e.clientY)
    } else if($(e.target).is('.js-floating-head')) {
      $(e.target).remove()
    }
  })

  $('body').on('keypress', function(e){
    var keyCode = e.which
    console.log(keyCode)
    if(keyCode == 32) { // space bar
      $('.js-floating-head').each(function(){
        var $this = $(this)
        $this.data('top', -$this.data('top'))
        $this.data('left', -$this.data('left'))
      })
    } else if (keyCode == 48) {
      paused = !paused
    } else if (keyCode > 48 && keyCode <= 57){ // 0 to 9
      var num = keyCode - 48
      speedMult = Math.pow(num, 2)/10
    } else if (keyCode == 61 || keyCode == 45) { // +-
      var diff = sizeMult / 10
      sizeMult += (keyCode == 61 ? diff : -diff)
      if (sizeMult > 2) {
        sizeMult = 2
      } else if (sizeMult < .25) {
        sizeMult = .25
      } else {
        $('.js-floating-head').each(function(){
          var $this = $(this)
          $this.width(sizeMult * $this.data('size'))
        })
      }
    } else if (keyCode == 47 || keyCode == 63) { // ?/
      flopped = !flopped
      var func = flopped ? 'addClass' : 'removeClass'
      $('.js-floating-head')[func]('flopped')
    } else {
      return
    }

    e.preventDefault()
  })


  window.setInterval(moveHeads, 20)
})
