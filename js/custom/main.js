console.log("i'm working!");

var productIdentifier = "trcdv1";

$(document).ready(function(){
  var $els = {
 	body: $("body"),
 	sidebarActivate: $(".sidebar-activate"),
 	listItemAudio: $(".file-list__item--audio"),
 	audioHolder: $(".file-list__item__expansion"),
 	audio: $(".file-list__audio"),
 	download: $(".file-list__download")
  }

  //autorun on all pages

	// var sidebar = {

	// 	key: productIdentifier + 'SidebarOpen',

	// 	canHas: false,

	// 	toggleState: function(){
	// 		var current = localStorage[this.key];
	// 		if( current === "open"){
	// 			$els.body.addClass("-js-sidebar-closed");
	// 			localStorage[this.key] = "closed";
	// 			console.log(localStorage[this.key]);
	// 		}
	// 		else if( current === "closed"){
	// 			$els.body.removeClass("-js-sidebar-closed");
	// 			localStorage[this.key] = "open";
	// 			console.log(localStorage[this.key]);
	// 		}
	// 		else{
	// 			console.log("sidebar.setState only accepts 'open' or 'closed' as options");
	// 		}
	// 	},
	// 	setStateTrue: function(){
	// 		$els.body.removeClass("-js-sidebar-closed");
	// 		localStorage[this.key] = 'open';
	// 	},
	// 	setStateFalse: function(){
	// 		$els.body.addClass("-js-sidebar-closed");
	// 		localStorage[this.key] = 'closed';
	// 	},

	// 	getState: function(){
	// 		return localStorage[this.key];
	// 	},
	// 	init: function(){
	// 		if ($els.body.data("suppresssidebar") == true) {
	// 			this.setStateFalse();
	// 		}
	// 		if (window.localStorage) { // checks if browser support localStorage
	// 			this.canHas = true;
				
	// 			if (localStorage[this.key]) { // checks if value exists
	// 				var setAs = this.getState();
	// 				if (setAs ==='closed') {
	// 					this.setStateFalse();
	// 				}
	// 			}
	// 			else{
	// 				this.setStateTrue();
	// 			}
	// 		}
	// 		//if there is no localStorage we can't save state so may as well hide the close option
	// 		else {
	// 			$els.sidebarToggle.hide();
	// 			console.log("localStorage is not supported");
	// 		}

	// 	}
	// }

	var sidebar = {
		toggleState: function(){
			$els.body.toggleClass("-js-sidebar-closed");
		},
		init: function(){

		}
	};
	sidebar.init(); 

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
				this.playAudio();
				this.showAudioControls();
			}
		}
	};
  //interactions all pages

  $els.listItemAudio.on("click keydown", function(e){
  	if (e.type ==='click' || e.type ==='keydown' && e.which == 13) {
  		e.preventDefault();

	  	audioPlayer.initAudio( $(this) ); 

  	}
  });

  $els.audioHolder.on("click keydown", function(e){
  	if (e.type ==='click' || e.type ==='keydown' && e.which == 13) {
  		event.stopPropagation();

  	}
  });

	


  $els.sidebarActivate.on("click keydown", function(e){
  	if (e.type ==='click' || e.type ==='keydown' && e.which == 13) {
	  	sidebar.toggleState(); 
  	}
  })



});