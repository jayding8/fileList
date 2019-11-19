$(function(){
//console.log(gApi.list);
init();

});
$(".bread-title img").click(function(){
	var path = $(this).attr("_path");
	var parentPath = getParentPath(path);
	init(parentPath);
});

function init(path='')
{
	//alert(path);
	var list = {};
	if(path)
	{
		list = {"path":path};
		$(".bread-title img").attr('_path',path);
		//alert(parentPath);
		if(path == '/')
		{
			$(".bread-title img").hide();
		}
		else
		{
			$(".bread-title img").show();			
		}
	}
	else
	{
		$(".bread-title img").attr('_path','').hide();
	}
	$.ajax({
	    //请求方式
	    type : "POST",
	    //请求的媒体类型
	  //  contentType: "application/json;charset=UTF-8",
	    url : gApi.list,
	    //数据，json字符串
	    data : list,
	    //请求成功
	    success : function(ret) {
	    var result = JSON.parse(ret);
	        var data = {};
	       if(result.error == 0)
	       {
	           var data = result.data;
	           var html = html_tr ='';
	           var curent_num = 0;
	           data.length = data.length + (10 - data.length%10);
	           
	           for(var i = 1;i<=data.length;i++)
	           {
	           	   var  imgurl = '';
	           	   var	sourceImgurl='';
	           	   var 	clickThing = '';
	           	   var 	dbclickThing = '';
	           	   var 	dirStyle = '';
	           	   if(data[i-1])
	           	   {
		               if(data[i-1].is_file ==1)
		               {
			               	var fileName = data[i-1].name.lastIndexOf(".");//取到文件名开始到最后一个点的长度
							var fileNameLength = data[i-1].name.length;//取到文件名长度
							var fileFormat = data[i-1].name.substring(fileName + 1, fileNameLength);//截
							imgurl = 'img/wodeziyuan_normal-2x.png';
							if(fileFormat == 'png' || fileFormat == 'jpg' || fileFormat == 'gif')
							{
								imgurl = data[i-1].childUrl;
								sourceImgurl = imgurl;
								dbclickThing = 'ondblclick="javascript:showimage(\''+sourceImgurl+'\');"';
							}
							else
							{
							
								dbclickThing = 'ondblclick="javascript:download(\''+data[i-1].childUrl+'\');"';
								sourceImgurl = 'img/quxiao-2x.png';
								switch(fileFormat)
								{
									case 'pdf':
										imgurl = 'img/icon_pdf-2x.png';
									break;
									case 'ppt':
										imgurl = 'img/icon_ppt-2x.png';
									break;
									case 'psd':
										imgurl = 'img/icon_psd-2x.png';
									break;
									case 'mp4':
										imgurl = 'img/icon_shipin-2x.png';
									break;
									case 'mp3':
										imgurl = 'img/icon_yinpin-2x.png';
									break;
									case 'xlsx':
										imgurl = 'img/icon_xlsx-2x.png';
									break;
									case 'zip':
										imgurl = 'img/yasuobao-2x.png';
									break;
									case 'doc':
										imgurl = 'img/icon_wengaoziyuan_shipin@2x.png';
									break;
									default:
									break;
								}
							}
							clickThing = 'onclick="javascript:fileselect(this);" _childPath="'+data[i-1].childPath+'" _childUrl="'+data[i-1].childUrl+'"';
		               }
		               else
		               {
			               imgurl 		= 'img/wenjianjia.png';
			               sourceImgurl = 'img/quxiao-2x.png';
			               dbclickThing = 'ondblclick="javascript:init(\''+data[i-1].childPath+'\');"';
			               dirStyle		= 'style="width:48px;height:36px"';
		               }
		               
		               html_tr +='<td><img '+(data[i-1].fileKey?'id="'+data[i-1].fileKey+'"' : '')+' '+dirStyle+' title="'+data[i-1].name+'" class="img-polaroid" src="'+imgurl+'" '+clickThing+' '+dbclickThing+'  /><br/><span '+(data[i-1].fileKey?'id="title_'+data[i-1].fileKey+'"' : '')+' title="'+data[i-1].name+'">'+data[i-1].name+'</span></td>';
	           	   }
	           	   else
	           	   {
	               	   html_tr +='<td><span><br/></span></td>';
	           	   }
	               
	               if(i%10 === 0 )
	               {
		               html 	+='<tr>'+html_tr+'</tr>';
		               html_tr 	= '';
	               }
	           }
	        //   console.log(data);
	           $(".table").html(html);
	           $(".bread-title span.file-info").each(function(){
					$("#"+$(this).attr('id').replace('mark_','')).addClass('select');
				});
	       }
	    },
	    //请求失败，包含具体的错误信息
	    error : function(e){
	        console.log(e.status);
	        console.log(e.responseText);
	    }
	});
}