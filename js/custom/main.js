$(document).ready(function(){

  var $els = {
 	body: $("body"),
 	sidebarActivate: $(".sidebar-activate"),
 	listItemAudio: $(".file-list__item--audio"),
 	audioHolder: $(".file-list__item__expansion"),
 	audioLink: $(".file-list__link--audio"),
 	audio: $(".file-list__audio"),
 	download: $(".file-list__download"),
 	termsModal: $(".terms__modal"),
 	termsAccept: $(".terms__accept")
  }

	var sidebar = {
		toggleState: function(){
			$els.body.toggleClass("-js-sidebar-closed");
		},
		init: function(){

		}
	};

	var audioPlayer = {
		audio: null,
		container: null,
		openClass:"file-list__item--is-open",
		playAudio: function(){
			this.audio.play();
		},
		stopOtherAudio: function(){
			$els.audio.each(function(index){
				var eachAudio = $(this)[0];
				if ( eachAudio.duration > 0 || eachAudio.src.length > 0 ) {
					eachAudio.pause();
					eachAudio.currentTime = 0;
				}
			})
		},
		showAudioControls: function(){
			this.container.addClass(this.openClass);
		},
		hideOtherAudioControls: function(){
			$("."+this.openClass).removeClass(this.openClass);
		},
		initAudio: function(audioChoice){
			this.container = audioChoice;
			this.audio = audioChoice.find('audio')[0];
			if (audioChoice.hasClass(this.openClass)) {
				this.stopOtherAudio();
				this.hideOtherAudioControls();
			}
			else{
				this.stopOtherAudio();
				this.hideOtherAudioControls();
				this.showAudioControls();
			}
		}
	};


	var terms = {
		storageKey: "termsAccepted-eu2e-1",
		init: function(){
			if ( $.jStorage.storageAvailable() ) {
				var keySet = $.jStorage.get(this.storageKey);
				if (!keySet){
					$els.termsModal.modal('show');
				}
				else{
					// console.log("terms already accepted! To 'unaccept' run: '$.jStorage.flush()' in console ");
				}
			}
		},
		goAway: function(){
			$.jStorage.set(this.storageKey, "sure");
			$els.termsModal.modal('hide');
		}
	}

	terms.init();
	//homepage specific:

	$els.termsAccept.on("click keydown", function(e){
	  	if (e.type ==='click' || e.type ==='keydown' && e.which == 13) {
	  		terms.goAway();
	  	}
    });

  //interactions all pages

  //if clicking an audio item:
  $els.audioLink.on("click keydown", function(e){
  	if (e.type ==='click' || e.type ==='keydown' && e.which == 13) {
  		//don't follow link:
  		//instead open the dropdown (and stop any other audio):
	  	audioPlayer.initAudio( $(this).parent() ); 
  	}
  });

  //toggle the sidebar:
  $els.sidebarActivate.on("click keydown", function(e){
  	if (e.type ==='click' || e.type ==='keydown' && e.which == 13) {
	  	sidebar.toggleState();
  	}
  })


});