// JavaScript Document
$(document).ready(function()
{
	//初始化
	init();

	$(window).resize(function()
	{
	  init();
	});
    
});

//获取当前域名
var $host = window.location.host;
var $url = 'http://'+$host+'/';

/**
 * 初始化函数
 */
function init()
{
    var scale = $(window).width()/640;
	//alert(scale.toFixed(2));
	
	$("#warp").css("zoom",scale.toFixed(2));
}