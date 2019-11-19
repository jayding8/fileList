<?php  
//取得当前文件所在目录
//'~/repheal/web/project/'
$root_dir  =  "/Users/jayding/projects/";
$root_url = 'http://localhost/';
$_REQUEST['path'] = isset($_REQUEST['path']) ? urldecode($_REQUEST['path']) : '';

if(trim($_REQUEST['path']) && trim($_REQUEST['path']) != $root_dir)
{
	$dir = $root_dir . trim($_REQUEST['path']);
}
else
{
	$dir = $root_dir;
}
if(substr($dir,-1,1) != '/')
{
	$dir .= '/';
}
//echo $dir;exit;
//判断目标目录是否是文件夹
$file_arr = array();
if(is_dir($dir)){
	//打开
	if($dh = @opendir($dir)){
	    //读取
	    while(($file = readdir($dh)) !== false){
	        if($file != '.' && $file != '..' && substr($file,0,1) != '.' && substr($file,0,1) != '~'){
	        	$path = $dir === $root_dir ? '/' : str_replace($root_dir,'',$dir);
	            $file_arr[] = array(
		            'name' 		=> $file,
		            'is_file' 	=> is_file($dir . $file) ? 1 : 0,
		            'fileKey'	=> is_file($dir . $file) ? md5($path == '/' ?  $root_dir . $file : $root_dir . $path . $file): '',
		            'path' 		=> $path,
		            'parenPath' => getParent($path),
		            'childPath' => $path == '/' ?  $file : $path . $file,
		            'childUrl'  => $path == '/' ?  $root_url . $file : $root_url . $path . $file ,
	            );
	        }
	    }
	    //关闭
	    closedir($dh);
	}
	$file_arr = array(
		'msg' => 'success',
		'error' => 0,
		'data' => $file_arr,
	
	);
}
else
{
	$file_arr = array(
		'msg' => '目录不存在',
		'error' => 1,
		'data' => array(),
	
	);
}

function getParent($path)
{
	$tmp = explode('/',trim($path,'/'));
	unset($tmp[count($tmp)-1]);
	return implode('/',$tmp) . '/';
}

echo json_encode($file_arr);
?>
