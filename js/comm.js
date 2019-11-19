function showimage(source)
{
	$("#ShowImage_Form").find("#img_show").html("<image src='"+source+"' class='carousel-inner img-responsive img-rounded' />");
	$("#ShowImage_Form").modal();
}

function download(url)
{
	return true;
	window.location.href = address;	
}

function addNews()
{
	$(".bread-title span.file-info").each(function(){
		console.log($(this).attr('_childUrl'));
		console.log($(this).attr('_childpath'));
	});
}

function fileselect(e)
{
	if($(e).attr('class') == 'img-polaroid select')
	{
		$(e).removeClass('select');
		$('#mark_'+$(e).attr('id')).remove();
		gMaterialnum < 0 ? gMaterialnum=0:gMaterialnum -= 1;
	}
	else
	{
		gMaterialnum += 1;
		$(e).addClass('select');
		$(".bread-title").append('<span id="mark_'+$(e).attr('id')+'" _childpath="'+$(e).attr('_childpath')+'" _childurl="'+$(e).attr('_childurl')+'" class="file-info">'+ $('#title_'+$(e).attr('id')).html() +'<span onclick="javascript:closemark(this);" class="close">&times;</span></span>');
	}
//	console.log(gMaterialnum);
	if(gMaterialnum <=0 )
	{
		$(".add-news").hide();
	}
	else
	{
		$(".add-news").show();
	}
}

function closemark(e)
{
	var id = $(e).parent('.file-info').attr('id').replace('mark_','');
	//alert(id);
	$(e).parent('.file-info').remove();
	$('#mark_'+id).remove();
	$('#'+id).removeClass('select');
	gMaterialnum -= 1;
	console.log(gMaterialnum);
	if(gMaterialnum <=0 )
	{
		$(".add-news").hide();
	}
	else
	{
		$(".add-news").show();
	}
}

function getParentPath(path)
{
	var tmp= new Array();
	tmp = path.split('/');
	var path = space = '';
	if(tmp.length-1 <= 0)
	{
		return '';
	}
	for (var i=0;i < tmp.length-1 ;i++ ) 
	{ 
		path += space + tmp[i];
		space = '/';
	}
	return path;
}