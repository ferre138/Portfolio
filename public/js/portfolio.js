/*global $, jQuery, alert*/
$(document).ready(function(){

  'use strict';

  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });

      if($(this).hasClass("nav-link")){
      	if($(window).width() < 1024){
      		$(".collapse").collapse();
      	}
      }
    } // End if
  });

  // ========================================================================= //
  //  Add fade in to View Button inside .card
  // ========================================================================= //
  if($(window).width() > 576){
		$(".card").hover(
			function(){
				// $(this).find(".btn").slideDown(500);
				$(this).find(".btn").fadeIn(200, "linear");
			}, function(){
				// $(this).find(".btn").slideUp(500, "linear");
				$(this).find(".btn").fadeOut(50, "linear");
			}
		);
	};

  // ========================================================================= //
  //  Typed Js
  // ========================================================================= //
  var typed = $(".typed");
  var trail = $(".trail");

  $(function() {
    typed.typed({
      strings: ["Jay Bandeira.", "A Developer.", "A Freelancer.", "An Instructor."],
      typeSpeed: 100,
      loop: true,
    });
    trail.typed({
      strings: ["--------------------------------"],
      typeSpeed: 100,
      loop: true,
      showCursor: false,
    });
  });

});
