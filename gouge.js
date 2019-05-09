$(function(){
	//先获取本地武汉的天气
	$.ajax({
		//加载天气资源接口
		url:"https://www.apiopen.top/weatherApi?city=武汉",
		success:function(res){
			//接收成功
			if(res.code==200){
				//200为状态码成功	
				//删除以前的more天气
				$(".more").remove();
				var tr=""; //定义一个空字符串用来接收后面的变量
				var shuju=res.data.forecast;  //后面多次会调用，所以拿出来减少代码量
				//学会遍历走天下~
				for(var i=0;i<shuju.length;i++){
					//遍历接口中forecast的所有内容 并进行拼接
					//console.log(shuju);  //检测一下是否能够拿到接口的数据
					//我们需要日期 天气 最高温 最低温 风向 多云
					//tr加个类名  方便后续的删除
					tr+="<tr class=\"more\">\n"+
							"<td>"+shuju[i].date+"</td>"+
							"<td>"+shuju[i].type+"</td>\n"+
							"<td>"+shuju[i].high+"</td>\n"+
							"<td>"+shuju[i].low+"</td>\n"+
							"<td>"+shuju[i].fengxiang+"</td>\n"+
						"</tr>";
					//找到tbody  将tr丢进去
				}
				$("tbody").append(tr);
				//console.log(res.data.city); //城市名
				//将城市名放到diqu段落中
				$(".diqu").text("以上为"+res.data.city+"近5日的天气");
				//温馨提示同步一下
				$(".tips").text("温馨提示您："+res.data.ganmao);
				
			}else{
				//接收失败
				alert("数据请求失败");
			}
		}
	})
	
	//用户自定义查询天气
	$("button").click(function(){
		//监听按钮点击事件
		var chaxun="https://www.apiopen.top/weatherApi?city="+$("input").val();
		$.ajax({
			url:chaxun,
			success:function(res){
				if(res.msg=="成功!"){
					//删除以前的more天气
					$(".more").remove();
					//先获取城市天气
					var tr=""; //定义一个空字符串用来接收后面的变量
					var shuju=res.data.forecast;  //后面多次会调用，所以拿出来减少代码量
					//学会遍历走天下~
					for(var i=0;i<shuju.length;i++){
						tr+="<tr class=\"more\">\n"+
								"<td>"+shuju[i].date+"</td>"+
								"<td>"+shuju[i].type+"</td>\n"+
								"<td>"+shuju[i].high+"</td>\n"+
								"<td>"+shuju[i].low+"</td>\n"+
								"<td>"+shuju[i].fengxiang+"</td>\n"+
							"</tr>";
					}
					$("tbody").append(tr);
					//更改地区以及温馨提示
					$(".diqu").text("以上为"+res.data.city+"近5日的天气");
					$(".tips").text("温馨提示您："+res.data.ganmao);
				}else{
					alert("请输入正确的城市！")
				}
			}
		});
	})
})
