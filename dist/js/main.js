/*! webOS-demo - v0.0.1 - by Liu Huawei 2016-08-17 */
"use strict";$("#chrome").click(function(){$(".internet").addClass("open")Class("open")&&$(".settings").addClass("bottom")}),$("#close-internet").click(function(){$(".internet").removeClass("open"),1==$(".settings").hasClass("open")&&$(".settings").removeClass("bottom")}),$("#settings").click(function(){$(".settings").addClass("open"),1==$(".internet").hasClass("open")&&$(".internet").addClass("bottom")}),$("#close-settings").click(function(){$(".settings").removeClass("open"),1==$(".internet").hasClass("open")&&$(".internet").removeClass("bottom")}),$(".imag").click(function(){var a=$(this);$(".imag").children().removeClass("chosen"),a.children().addClass("chosen");var b="url("+a.children().attr("src")+") no-repeat center center fixed";$("body").css({background:b,"background-size":"cover"})}),$(".slider").click(function(){$(this).toggleClass("slider-active")}),$("#dock-hidden-slider").click(function(){$(".dock").toggleClass("hidden")}),$(".dock-position-slider").click(function(){var a=$(this).attr("id");$(".dock-position-slider").removeClass("slider-active"),$(this).addClass("slider-active"),1==$(".dock").hasClass("bottom")?$(".dock").removeClass("bottom"):1==$(".dock").hasClass("left")?$(".dock").removeClass("left"):1==$(".dock").hasClass("right")&&$(".dock").removeClass("right"),$(".dock").addClass(a)});,1==$(".settings").has
