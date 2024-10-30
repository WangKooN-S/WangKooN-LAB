$(function(){	
	// 메인 슬라이더
	var koonie = {
		mySwiper : null
	}
	// 로더 관련 영역
	var mainLoader = {
		mode : "intro",		
		el : {
			loader : $("#loader"),
			intro : $("#intro")
		},
		init : function(){
			var $this = this;
			this.loader(1000);
			setTimeout(function(){
				$this.el.loader.addClass("simple");
				$this.mode = "pop";
			},3000);
			// 시작하기 버튼 이벤트
			this.el.intro.find(".btn_enter").click(function(){
                // 메인 슬라이더 생성
                mainSlider.init();
                // 서브페이지 닫기 버튼 이벤트
                makeSubPage.addEvent.btnClose();
			});
		},
		loader : function(time){			
			var $this = this;
			if ( this.mode == "intro"){
				this.resetLoader();
				setTimeout(function(){
					$this.el.loader.find(".ico_loader,.txt_loader").fadeOut(300);
					$this.el.loader.delay(300).fadeOut(1000);				
				},time);
			}else{
				$this.el.loader.find(".ico_loader,.txt_loader").fadeOut(100);
				$this.el.loader.fadeOut(300);
			}
		},
		resetLoader : function(){
			this.el.loader.find(".ico_loader,.txt_loader").fadeIn(300);
			this.el.loader.fadeIn(300);
		}
	}
	// 메인 슬라이드 메뉴 관련
	var mainSlider = {
		el : {
			main : $("#main"),
			intro : $("#intro.standard")
		},
		// 슬라이더 실행
		init : function(){
			this.addSlide();
            this.addEvent.hoverEvent();            
		},
		addEvent : { // 슬라이더 오버시 배경등장 이벤트
			hoverEvent : function(){
				$("#main .swiper-slide").each(function(){
					var bgUrl = $(this).attr("data-attr-bg");
					if ( typeof bgUrl !== typeof undefined && bgUrl !== false ){
						$(this).find(".bg_area").css({"background" : "url("+bgUrl+") no-repeat 50% 50%"});
					}
				})
			}
		},
		addSlide : function(){ // 슬라이더 생성
			var slide = "";
			slide += '<div class="swiper-container">'
			slide += '	<div class="swiper-wrapper">'
			slide += '		<div id="intro" class="swiper-slide card" data-attr-bg="images/bg_slide_main.png">'
			slide += this.el.intro.html();
			slide += '		</div>'
			$(theme).each(function(e){
				var $this = $(this)[0];
				slide += '<div id="'+$this.id+'" class="swiper-slide card sub_use" data-theme-no="'+(e+1)+'" data-attr-bg="images/'+$this.imgBg+'">';				
				slide += '	<span class="txt_card">'
				slide += '		<span class="txt_theme">KOONIE THEME'+(e+1)+'</span><br/>'
				slide += '		<span class="tit_nm">'
				slide += '			<span class="txt_nmEn" style="color:'+$this.color+';border-color:'+$this.color+'">'+$this.nmEn+'</span><span class="txt_nmKo" style="border-color:'+$this.color+'" >'+$this.nmKo+'</span>'
				slide += '		</span>'
				slide += '	</span>'
				slide += '	<span class="txt_bottom"><img src="images/txt_card_bottom.png" alt="수집덕후의 테마가 있는 수집이야기 - KOONIE COLLECTION"></span>'
				slide += '	<span class="bg_area"></span>'
				slide += '</div>'
			});
			slide += '	</div>'
			slide += '</div>'
			slide += '<div class="swiper-button-next swiper-button-black"></div>'
			slide += '<div class="swiper-button-prev swiper-button-black"></div>'
			// 기존 인트로 삭제
			this.el.intro.remove();
			// 슬라이드 Markup 추가
			this.el.main.append(slide);
			// Play Swiper Slide
			koonie.mySwiper = new Swiper('#main .swiper-container', {								
				disableOnInteraction : false,
				nextButton: '#main .swiper-button-next',
				prevButton: '#main .swiper-button-prev',
				pagination: '#wrapper > .swiper-pagination',
				paginationClickable: true,
				centeredSlides : true,
				loop: false,
				autoHeight: true,
				spaceBetween: 30
			});
			// 테두리 생성 및 버튼 변형
			this.el.main.find(".btn_enter").addClass("static");
			// this.el.main.find(".swiper-slide").css({"border-color":"rgba(211, 211, 211,.1)"});
			this.el.main.find(".swiper-slide").css({"border-color":"#161514"});
			setTimeout(function(){
				$("#main").find(".btn_enter").css("font-size","14px").html("옆으로 넘기면 테마를 선택할 수 있습니다.")
            },200);
            // 슬라이드 클릭 이벤트
            this.el.main.find(".sub_use").click(function(){            	
                var idx = $(this).attr("data-theme-no");
                if ( theme[idx-1].menu != undefined ) makeSubPage.init(idx-1);
                else alert('서브메뉴가 없습니다.');
                koonie.mySwiper.slideTo(idx);	
            })
		}
    }
    // 서브페이지 생성
    var makeSubPage = {
		el : {
			layer : $("#sub_Layer"),
			header : $("#sub_header"),
			scont : $("#sub_cont")
		},
        init : function(idx){
			// init
			this.clearLayer();						
            this.showLayer(idx);
        },
        clearLayer : function(){
        	this.el.layer.removeAttr("class");
			this.el.header.find(".txt_card").remove();
			this.el.header.find(".sub_menu").remove();
            this.el.scont.html('');
        },
        showLayer : function(idx){
            var data = theme[idx],
            slide = "";
            slide += '<span class="txt_card">'
            slide += '	<span class="txt_theme">KOONIE THEME'+(idx+1)+'</span><br/>'
            slide += '	<span class="tit_nm">'
            slide += '		<span class="txt_nmEn" style="color:'+data.color+';border-color:'+data.color+'">'+data.nmEn+'</span><span class="txt_nmKo" style="color:#fff;border-color:'+data.color+'">'+data.nmKo+'</span>'
            slide += '	</span>'
			slide += '</span>'
			slide += '<ul class="sub_menu"></ul>'
			this.el.layer.addClass("theme"+(idx+1))
			this.el.header.prepend(slide);

            $("#sub_Layer").fadeIn(300,function(){
                $("sub_cont").delay(100).fadeIn(300);
			})			
			this.makeSubMenu(idx);
			// 최초 클릭시 1번째 메뉴 자동 선택
			var hash = document.location.hash.replace("#","");			
    		if ( hash == "" ){
    			this.el.header.find(".sub_menu").find("li").eq(0).click();
    		}
		},
		makeSubMenu : function(idx){
			var $this = this; 
			var $submenu = this.el.header.find(".sub_menu");
			var data = theme[idx].menu;			
			$(data).each(function(e){
				var $data = this;
				// 카드 내 서브 메뉴 만들기
				var makeDom = '<li'
				// 소장리스트의 경우 스타일 변경
				if ( $data.type.indexOf("list") > -1 ){
					makeDom += ' class="btn_'+$data.type+'"';
				}
				makeDom += '><a href="#">'+$data.title+'</a></li>'
				$submenu.append(makeDom);
				// 카드내 서브 메뉴 클릭 이벤트
				$submenu.find("li").eq(e).click(function(){
					var $self = $(this);
					var date = new Date();
					var loc = $data.src+"?date="+date.getTime();
					mainLoader.resetLoader();
					// 텍스트 문서를 가져올때
					if ( $data.type == "html" ){
						$.ajax({
							type:"GET",
							url:loc,
							error : function(){
								$this.el.scont.html("");
								$submenu.find("li").removeAttr("style");
								alert('페이지를 불러오지 못했습니다.');
							},
							success:function(html){
								$self.css({"color":theme[idx].color,"opacity":1,"font-weight":"bold"}).siblings().removeAttr("style");;
								var list = $.parseHTML(html);
								$this.el.scont.html(list);
								$this.el.scont.delay(500).fadeIn(500);
							},
							complete : function(){
								scrResize();
								mainLoader.loader(0);							
								pageLocation.view($data.hash);
								$this.el.scont.scrollTop(0);
							}
						})
					}
					// 수집리스트를 가져올때
					else if ( $data.type.indexOf("list") > -1 ){
						$.ajax({
							type:"GET",
							url:loc,
							dataType : "JSON",
							error : function(){
								$this.el.scont.html("");
								$submenu.find("li").removeAttr("style");
								alert('데이터를 가져오지 못했습니다.');
							},
							success:function(rs){																
								// 활성화된 메뉴 초기화
								$self.css({"color":theme[idx].color,"opacity":1,"font-weight":"bold"}).siblings().removeAttr("style");
								// 리스트 테이블을 그립니다
								$this.el.scont.html( $this.mkListTable(rs) );
								// 테이블 내 비활성화 처리 + 레코드 오버, 클릭시 관련정보 연결
								var $tb = $("#sub_cont table tbody");
								if ( $tb.length ){
									var $tbRrd = $tb.find("tr");
									$tbRrd.each(function(e){
										var $hvRrd = $(this).find("td[data-field-type='v-have']"), // 보유여부
											$imgRrd = $(this).find("td[data-field-type='v-image']"), // 이미지 Front
											$imgRrdb = $(this).find("td[data-field-type='v-imageb']"), // 이미지 Back
											$urlRrd = $(this).find("td[data-field-type='v-url']"), // Colnect 도감번호
											valRrd = parseInt($hvRrd.html(),10),
											imgRrd = $.trim( $imgRrd.html() ),
											imgRrdb = $.trim( $imgRrdb.html() ),
											urlRrd = $.trim( $urlRrd.html() );
										// 미보유 레코드 비활성화
										if ( valRrd != NaN ){
											if ( !valRrd ){
												$(this).addClass("disabled");
												$hvRrd.html('미보유');
											}else{
												$hvRrd.html('보유');
											}
										}else{
											$(this).addClass("disabled");
										}
										// 외국 주화, 지폐 국기 표기를 위한 처리
										if ( $(this).hasClass("v-flag-title") ){
											if ( rs.type == "typeListForeignCoin" ) $(this).find("td[data-field-type='v-name']").attr("colspan",9).siblings().css("display","none");
											if ( rs.type == "typeListForeignBanknotes" ) $(this).find("td[data-field-type='v-name']").attr("colspan",12).siblings().css("display","none");
										}
										// 클릭시 관련정보 연결
										if ( urlRrd != '-' ) $urlRrd.html('<a href="'+rs.urlBase+urlRrd+'" onclick="event.stopPropagation();" target="_blank">view</a>');
										// 클릭시 이미지 보기
										$(this).click(function(){
											if ( imgRrd != '-' ){												
												var $preLay = $("#preview_layer"),
													$preLayIn = $preLay.find(".preview_inner");
												// 지폐타입입지, 동전인지 결정
												$preLay.removeAttr("class").addClass( $("#layerInner").attr("class") );
												// 레이어 비우기
												$preLayIn.html('');
												// 레이어 등장
												$preLay.fadeIn(100);
												$preLayIn.append('<img src="'+imgRrd+'"/>');												
												if ( imgRrdb != '-') $preLayIn.append('<img src="'+imgRrdb+'"/>');
											}
										})
									})
								}	
								// 그려진 테이블을 fadein
								$this.el.scont.delay(500).fadeIn(500);
							},
							complete : function(){
								scrResize();
								mainLoader.loader(0);
								pageLocation.view($data.hash);
								$this.el.scont.scrollTop(0);
							}
						})
					}
				})
			})
		},
		mkListTable : function(json){ // 수집품 리스트 테이블을 그립니다
			var $data = json;
			var makeDom = "";			
			makeDom +='<div id="layerInner" class="'+$data.type+'">'
			makeDom +='<div class="inner-group">'
			makeDom +='<h2>'+$data.title+'</h2>'
			makeDom +='<span class="txt-target">'+$data.txtTarget+'</span>'
			makeDom +='<div class="table-group table-align-center">'
			makeDom +='<table>'
			if ( $data.tableHeader != undefined ){
				makeDom +='<thead>'
				$($data.tableHeader.list).each(function(){
					makeDom +='<tr>'
					$(this).each(function(){
						makeDom +='<th '
						if (this.width != "auto"){ makeDom +=' width="'+this.width+'"' }
						if (this.row != 1 ){ makeDom +=' rowspan="'+this.row+'"' }
						if (this.col != 1 ){ makeDom +=' colspan="'+this.col+'"' }						
						makeDom += '>'+this.name+'</th>'
					})
					makeDom +='</tr>'
				})
				makeDom +='</thead>'
			}
			if ( $data.tableData != undefined ){
				makeDom +='<tbody>'
				$( $data.tableData ).each(function(){
					makeDom +='<tr'
					// 각 소장 리스트별 예외 
					if ( $data.type == "typeListEuro" ) makeDom +=' class="bg-eu-'+this.nmEng+'"';
					if ( $data.type == "typeListStates" ) makeDom +=' class="'+this.nmEng+'"';
					if ( $data.type == "typeListAtb" ) makeDom +=' class="'+this.nmEng+'"';
					if ( $data.type == "typeListForeignCoin" || $data.type == "typeListForeignBanknotes" ){
						if ( this.country != "-" ){
							makeDom +=' class="v-flag-title v-country-'+this.country+'"';
						}
					}
					if ( this.name == "0" )  makeDom +=' class="table-mg"';
					makeDom +='>'
					// 테이블 데이터 생성
					$.each(this, function(key,value){
						makeDom +='<td data-field-type="v-'+key+'"'
						// 등급영역의 활성화 여부					
						if ( key.indexOf('grade') > -1 ){
							if ( value > 0 ) makeDom += ' class="active"';
						}
						// 유로주화 보유 여부 활성/비활성
						if ( key.indexOf('coin') > -1 ){
							if ( !value ) makeDom += ' class="eu-disabled"';
							else makeDom += ' class="eu-active"';
						}
						makeDom +='>'+value+'</td>'
						// console.log('key:' + key + ' / ' + 'value:' + value);
					});
					makeDom +='</tr>'
				});
				makeDom +='</tbody>'
			}
			makeDom +='</table>'
			makeDom +='</div>'
			// 출처 표기
			if( $data.source != undefined ){
				makeDom +='<div class="wrap-source">'
				makeDom +='<div class="tit-source">참고자료</div>'
				$( $data.source ).each(function(){
					makeDom +='<div class="txt-source">'+this.title
					if (this.keyword != undefined) makeDom += ', "'+this.keyword+'"'
					makeDom += ', <a href="'+this.url+'" target="_blank">'+this.url+'</a>, ('+ this.date +')'
					makeDom += '</div>'
				});
			makeDom +='</div>'
			}			
			makeDom +='</div>'
			makeDom +='</div>'
			return makeDom;
		},
        addEvent : {
            btnClose : function(){
				var $this = makeSubPage;
				$this.el.header.find(".btn_close").click(function(e){
                    e.preventDefault();
                    pageLocation.view("");
                    $("#sub_Layer").delay(100).fadeOut(300);
              });
            }
        }
    }
    // 주소 관련
    var pageLocation = {
    	// 해시를 지워 주거나 추가
    	view : function(hash){
    		var host = location.host + location.pathname;
    		document.location.hash = hash;
    	},
    	// 해시 검색 후 바로 이동
    	search : function(){
    		var hash = document.location.hash.replace("#","");
    		if ( hash !=  "" ){
    			$(theme).each(function(i){
    				$(this.menu).each(function(e){
    					if ( this.hash == hash ){    						
    						// 메인 슬라이더 생성
                			mainSlider.init();
                			// 서브페이지 닫기 버튼 이벤트
                			makeSubPage.addEvent.btnClose();
                			// 카드 서브 열기
                			$("#main .sub_use").eq(i).click();
                			// 카드 서브 메뉴 열기
                			$("#sub_header").find(".sub_menu").find("li").eq(e).click();
    					}
    				})
    			})
    		}
    	}
    }
	// 스크린 크기에 따른 리사이징
	var scrResize = function(){
		var $headH = $("#sub_header").outerHeight();
		makeSubPage.el.scont.css({"top":$headH});
	}
	// 페이지 로드 된 뒤 실행
	$(window).load(function(){
		mainLoader.init();		
		// 해시 분석
		pageLocation.search();
	}).resize(scrResize);	
})