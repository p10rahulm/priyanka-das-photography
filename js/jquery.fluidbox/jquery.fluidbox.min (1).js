// Fluidbox
// Description: Replicating the seamless lightbox transition effect seen on Medium.com, with some improvements
// Version: 1.3.3
// Author: Terry Mun
// Author URI: http://terrymun.com

(function(e,t){var n=function(e,t,n){var r;return function(){function u(){if(!n)e.apply(s,o);r=null}var s=this,o=arguments;if(r)clearTimeout(r);else if(n)e.apply(s,o);r=setTimeout(u,t||100)}};jQuery.fn[t]=function(e){return e?this.bind("resize",n(e)):this.trigger(t)}})(jQuery,"smartresize");(function(e){e.fn.fluidbox=function(t){var n=e.extend(true,{viewportFill:.95,overlayColor:"rgba(255,255,255,.85)",debounceResize:true,stackIndex:1e3,stackIndexDelta:10,closeTrigger:[{selector:".fluidbox-overlay",event:"click"},{selector:"document",event:"keyup",keyCode:27}]},t);if(n.stackIndex<n.stackIndexDelta)n.stackIndexDelta=n.stackIndex;$fbOverlay=e("<div />",{"class":"fluidbox-overlay",css:{"background-color":n.overlayColor,"z-index":n.stackIndex}});var r=this,i=e(window),s,o=function(){e(".fluidbox-opened").trigger("click")},u=function(e){var t=e.find("img"),n=e.find(".fluidbox-ghost"),r=e.find(".fluidbox-wrap"),s=i.scrollTop()-t.offset().top+.5*t.data("imgHeight")*(t.data("imgScale")-1)+.5*(i.height()-t.data("imgHeight")*t.data("imgScale")),o=.5*t.data("imgWidth")*(t.data("imgScale")-1)+.5*(i.width()-t.data("imgWidth")*t.data("imgScale"))-t.offset().left,u=t.data("imgScale");n.css({transform:"translate("+parseInt(o*10)/10+"px,"+parseInt(s*10)/10+"px) scale("+parseInt(u*1e3)/1e3+")",top:t.offset().top-r.offset().top,left:t.offset().left-r.offset().left})},a=function(){r.each(function(){f(e(this))})},f=function(e){s=i.width()/i.height();if(e.hasClass("fluidbox")){var t=e.find("img"),r=e.find(".fluidbox-ghost"),o=e.find(".fluidbox-wrap"),u=t.data();function a(){u.imgWidth=t.width();u.imgHeight=t.height();u.imgRatio=t.width()/t.height();r.css({width:t.width(),height:t.height(),top:t.offset().top-o.offset().top+parseInt(t.css("borderTopWidth"))+parseInt(t.css("paddingTop")),left:t.offset().left-o.offset().left+parseInt(t.css("borderLeftWidth"))+parseInt(t.css("paddingLeft"))});if(s>u.imgRatio){u.imgScale=i.height()*n.viewportFill/t.height()}else{u.imgScale=i.width()*n.viewportFill/t.width()}}a();t.load(a)}},l=function(t){if(e(this).hasClass("fluidbox")){var r=e(this),i=e(this).find("img"),s=e(this).find(".fluidbox-ghost"),o=e(this).find(".fluidbox-wrap"),a={};if(e(this).data("fluidbox-state")===0||!e(this).data("fluidbox-state")){e("<img />",{src:i.attr("src")}).load(function(){r.append($fbOverlay).data("fluidbox-state",1).removeClass("fluidbox-closed").addClass("fluidbox-opened");if(a["close"])window.clearTimeout(a["close"]);a["open"]=window.setTimeout(function(){e(".fluidbox-overlay").css({opacity:1})},10);e(".fluidbox-wrap").css({zIndex:n.stackIndex-n.stackIndexDelta-1});o.css({"z-index":n.stackIndex+n.stackIndexDelta});s.css({"background-image":"url("+i.attr("src")+")",opacity:1});i.css({opacity:0});e("<img />",{src:r.attr("href")}).load(function(){s.css({"background-image":"url("+r.attr("href")+")"})});u(r)})}else{r.data("fluidbox-state",0).removeClass("fluidbox-opened").addClass("fluidbox-closed");if(a["open"])window.clearTimeout(a["open"]);a["close"]=window.setTimeout(function(){e(".fluidbox-overlay").remove();o.css({"z-index":n.stackIndex-n.stackIndexDelta})},10);e(".fluidbox-overlay").css({opacity:0});s.css({transform:"translate(0,0) scale(1)",opacity:0,top:i.offset().top-o.offset().top+parseInt(i.css("borderTopWidth"))+parseInt(i.css("paddingTop")),left:i.offset().left-o.offset().left+parseInt(i.css("borderLeftWidth"))+parseInt(i.css("paddingLeft"))});i.css({opacity:1})}t.preventDefault()}};if(n.closeTrigger){e.each(n.closeTrigger,function(t){var r=n.closeTrigger[t];if(r.selector!="window"){if(r.selector=="document"){if(r.keyCode){e(document).on(r.event,function(e){if(e.keyCode==r.keyCode)o()})}else{e(document).on(r.event,o)}}else{e(document).on(r.event,n.closeTrigger[t].selector,o)}}else{i.on(r.event,o)}})}r.each(function(t){if(e(this).is("a")&&e(this).children().length===1&&e(this).children().is("img")){var r=e("<div />",{"class":"fluidbox-wrap",css:{"z-index":n.stackIndex-n.stackIndexDelta}});var i=e(this);i.addClass("fluidbox").wrapInner(r).find("img").css({opacity:1}).after('<div class="fluidbox-ghost" />').each(function(){var t=e(this);if(t.width()>0&&t.height()>0){f(i);i.click(l)}else{t.load(function(){f(i);i.click(l)})}})}});var c=function(){a();var t=e("a.fluidbox.fluidbox-opened");if(t.length>0)u(t)};if(n.debounceResize){e(window).smartresize(c)}else{e(window).resize(c)}return r}})(jQuery)