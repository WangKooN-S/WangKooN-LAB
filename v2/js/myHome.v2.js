
/* WangKoon's Portfolio v2 */
/* Written by Shin, Wang Sub (Wangsub@naver.com) */
/* Date :  2013-06-30*/
/* Last Modified :  2014-11-02*/

var pageNum; // 전체 페이지 수

var prePageNum = pageNum-1;  // 전페이지 번호
var nextPageNum = 1; // 다음페이지 번호
var nowPageNum = 0; // 현재페이지 번호
var pagePos = ["-100%",0,"100%"];

var colorPicker =["#dc6957","#7c81e2","#52c2c4","#cedc57"]; // 색상코드를 넣어줍니다. 추가하면 늘어납니다.
var nowColorNum = parseInt(Math.random() * colorPicker.length); // 현재 페이지의 선택된 색상 번호

//상태 변수들
var clrStatus = false; // 색상 피커 활성화 여부
var clrDesStatus = false; // 색상 피커 설명을 들었는지 여부
var cpStatus = false; // 피커의 움직임 체크 변수

var arrStatus = false; // 페이지가 움직이는지 여부
var arrDesStatus = false; // 페이지 이동 설명을 들었는지 여부

$(document).ready(function()
{   
    
    // Page Calc
    pageNum = $("#container").find(".con").length;
    
    // Start Animation
    movingSymbol(); // 메인 비쥬얼 에니메이션
    
    // Select Basic Color
    $('.bg_attr').css("background-color",colorPicker[nowColorNum]); // 기본색 설정
    
    // 설명창 클릭시 없어짐
    $('.des_color').click(function(){
        $('.des_type, .des_arrow').animate({"width":0},500, "easeInOutCirc",function(){
            $('.des_color, .des_color p').css("display","none"); 
        });        
    }); 
    
    // Make Color Picker
    for(var i=0 ; i < colorPicker.length ; i++){
        $(".color_picker ul").append("<li style='background-color: "+colorPicker[i]+"'><a></a></li>");        
        if( i==0 ) $(".color_picker ul").css("width",(colorPicker.length)*31);
    }
    
    // Color Picker Positioning
    $(".color_picker ul").find('li').each(
        function(i){
            $(this).click(function(){
                nowColorNum = i;
                $('.bg_attr').css("background-color",colorPicker[i]);
            })
        }
    );
    
    // 컬러피커 등장 애니메이션 부 시작 
    $('#main_nick').click(function(){
        if(!clrStatus){
            if(!cpStatus){
                cpStatus=true;
                mvColorPicker(0,colorPicker.length,true);
                $('.my_symbolmask').stop().animate({'marginLeft' :'-125px'}, 200, "easeInOutCirc",function(){return false;});   
                if(!clrDesStatus){
                    $('.des_color, .des_type').css({"display":"block"});
                    $('.des_type').animate({"width":"384px"},1200, "easeInOutCirc");
                    clrDesStatus = true;
                }
            }
        }else{
            if(!cpStatus){
                cpStatus=true;
                mvColorPicker(colorPicker.length-1,colorPicker.length,false);
                movingSymbol();
            }
        }
    })
    
    function mvColorPicker(num,totNum,cS){        
        var ss = -1*(!cS*25);
        $('.color_picker ul li').eq(num).animate({"margin-top":ss+"px"}, 100, "easeInOutCirc",function(){
            if(cS){ // 피커가 열릴때 정순으로 
                num++;
                if(num < totNum){                
                    mvColorPicker(num,colorPicker.length,cS);
                }else{
                    cS ? clrStatus = true : clrStatus = false;
                    cpStatus=false;
                }    
            }else{ // 피커가 닫힐때 역순으로
                num--;
                if(num+1 != 0){                
                    mvColorPicker(num,colorPicker.length,cS);
                }else{
                    cS ? clrStatus = true : clrStatus = false;
                    cpStatus=false;
                }                  
            }       
        });
    }

    //컬러피커 영역 끝

    // 좌우 버튼 영역 이벤트    
    $("#prev_btn, #next_btn").hover(function(){ 
        var idChecker = $(this).attr("id");
        if(!arrDesStatus){ // 설명을 보지 않았다면
            $('.des_color, .des_arrow').css({"display":"block"});
            $('.des_arrow').animate({"width":"345px"},1200, "easeInOutCirc");
            arrDesStatus = true;
        }else{ // 설명을 봤다면
            if( idChecker == "prev_btn" && nowPageNum!=0 || idChecker == "next_btn" && nowPageNum != pageNum-1){
                $(this).find("img").stop().animate({"margin-left":0},300);
            }        
        }        
    },function(){
        if( $(this).attr("id") == "prev_btn"){
            $(this).find("img").stop().animate({"margin-left":"-80px"},300);    
        }else{
            $(this).find("img").stop().animate({"margin-left":"80px"},300); 
        }        
    })

    $("#prev_btn, #next_btn").click(function(){
        var idChecker = $(this).attr("id");
        var timer;
        if(!arrStatus){
            arrStatus = true;
            if(idChecker == "prev_btn"){
                if(nowPageNum != 0){ // 첫페이지 일때는 작동안함
                    timer = setTimeout(function(){ arrStatus = false;},1200);
                    alignPage(true);    
                }else{
                    arrStatus = false;
                }
            }else{                
                alignPage(false);
                timer = setTimeout(function(){ arrStatus = false;},1200);
            }
        }else{
            //console.log("페이지 이동 중");
        }
    })

    var xmlPath = ["xml/sub2_data.xml","xml/sub3_data.xml"]
    var conPath = ["con_sub2","con_sub3"]

    showSubData(xmlPath[0],conPath[0]);
    showSubData(xmlPath[1],conPath[1]);

    function showSubData(path,con){

        var xmlData = new Array(4);
        for ( var i = 0 ; i < xmlData.length ; i++){
            xmlData[i] = [];
        }

        $.ajax({
            url: path,
            dataType: 'xml',
            success: function(data){
                                       
                $("item", data).each(function(e){
                    xmlData[0].push($(this).find("title").text());
                    xmlData[1].push($(this).find("imgData").text());
                    xmlData[2].push($(this).find("link").text());
                    xmlData[3].push($(this).find("description").text());

                    $("#"+con).find("ul.preview").append('<li><img src="'+xmlData[1][e]+'" alt="" /></li>');
                    $("#"+con).find("ul.preview").find("li").eq(e).click(function(){
                        showView(e);
                    })
                });

                showView(0);
            },
            complete:function(){
                //console.log(xmlData)
            }
        });

        function showView(num){
            $("#"+con+" .pubView").find(".viewImg").attr("src",xmlData[1][num]);
            $("#"+con+" .pubView").find(".pubTitle").html(xmlData[0][num]);
            $("#"+con+" .pubView").find(".pubUrl").html('(URL : <a href="'+xmlData[2][num]+'" target="_blank">'+xmlData[2][num]+'</a>)');
            $("#"+con+" .pubView").find(".pubDes").html(xmlData[3][num]);
        }

    }

});

function alignPage(arrow){
    var conPath = $("#container").find(".con");
    prePageNum = pageCalc(nowPageNum,false);
    nextPageNum = pageCalc(nowPageNum,true);
    //console.log(prePageNum, nextPageNum, nowPageNum);
    conPath.eq(prePageNum).css({"left":pagePos[0]});
    conPath.eq(nowPageNum).css({"left":pagePos[1]});
    conPath.eq(nextPageNum).css({"left":pagePos[2]});

    conPath.eq(prePageNum).animate({"left":pagePos[pageCalc(0,arrow)]},1000);
    conPath.eq(nowPageNum).animate({"left":pagePos[pageCalc(1,arrow)]},1000);
    conPath.eq(nextPageNum).animate({"left":pagePos[pageCalc(2,arrow)]},1000,function(){
        (!arrow) ? nowPageNum = pageCalc(nowPageNum,true) : nowPageNum = pageCalc(nowPageNum,false);        
    });            
}

// 방향에 따른 페이지 번호 계산
function pageCalc(num,arrow){
    if(!arrow) (num == 0) ? num = pageNum-1 : num--;
    else (num == pageNum-1) ? num = 0 : num++; 
    return num;
}
/*
function pageCalc(num,arrow){
    if(arrow == 'prev') (num == 0) ? num = pageNum-1 : num--;
    else (num == pageNum-1) ? num = 0 : num++;
    return num;
}
*/

// 메인 비쥬얼 마스크 애니메이션
function movingSymbol(){  
    mvLeft();
    function mvLeft(){
        $('.my_symbolmask').stop(true, true).animate({'marginLeft' :'-225px'}, 1200, "easeInOutCirc",function(){mvRight();});    
    }
    function mvRight(){
        $('.my_symbolmask').stop(true, true).animate({'marginLeft' :'-25px'}, 1200, "easeInOutCirc",function(){mvLeft();});    
    }
}