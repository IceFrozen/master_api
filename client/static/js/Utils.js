var appid  = "wx15d4cb65b6174d3a"
var baseRedirectUri = "http://192.168.101.2:8080/"
var redirectUri = "http://192.168.101.2:8080/static/invitePlayerSuccess.html"

var  GetQueryString = function (name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

var t = GetQueryString('t')
var redirectUri = encodeURIComponent(redirectUri)
var url = [
	"https://open.weixin.qq.com/connect/oauth2/authorize?appid=",appid,
	"&redirect_uri=",redirectUri,
	"&response_type=code&scope=snsapi_userinfo",
	"&state=",t,
	"#wechat_redirect"
	];

location.href = url.join("")
