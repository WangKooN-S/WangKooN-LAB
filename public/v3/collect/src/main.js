$(function(){	
	// ���� �����̴�
	var koonie = {
		mySwiper : null
	}
	// �δ� ���� ����
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
			// �����ϱ� ��ư �̺�Ʈ
			this.el.intro.find(".btn_enter").click(function(){
                // ���� �����̴� ����
                mainSlider.init();
                // ���������� �ݱ� ��ư �̺�Ʈ
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
	// ���� �����̵� �޴� ����
	var mainSlider = {
		el : {
			main : $("#main"),
			intro : $("#intro.standard")
		},
		// �����̴� ����
		init : function(){
			this.addSlide();
            this.addEvent.hoverEvent();            
		},
		addEvent : { // �����̴� ������ ������ �̺�Ʈ
			hoverEvent : function(){
				$("#main .swiper-slide").each(function(){
					var bgUrl = $(this).attr("data-attr-bg");
					if ( typeof bgUrl !== typeof undefined && bgUrl !== false ){
						$(this).find(".bg_area").css({"background" : "url("+bgUrl+") no-repeat 50% 50%"});
					}
				})
			}
		},
		addSlide : function(){ // �����̴� ����
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
				slide += '	<span class="txt_bottom"><img src="images/txt_card_bottom.png" alt="���������� �׸��� �ִ� �����̾߱� - KOONIE COLLECTION"></span>'
				slide += '	<span class="bg_area"></span>'
				slide += '</div>'
			});
			slide += '	</div>'
			slide += '</div>'
			slide += '<div class="swiper-button-next swiper-button-black"></div>'
			slide += '<div class="swiper-button-prev swiper-button-black"></div>'
			// ���� ��Ʈ�� ����
			this.el.intro.remove();
			// �����̵� Markup �߰�
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
			// �׵θ� ���� �� ��ư ����
			this.el.main.find(".btn_enter").addClass("static");
			// this.el.main.find(".swiper-slide").css({"border-color":"rgba(211, 211, 211,.1)"});
			this.el.main.find(".swiper-slide").css({"border-color":"#161514"});
			setTimeout(function(){
				$("#main").find(".btn_enter").css("font-size","14px").html("������ �ѱ�� �׸��� ������ �� �ֽ��ϴ�.")
            },200);
            // �����̵� Ŭ�� �̺�Ʈ
            this.el.main.find(".sub_use").click(function(){            	
                var idx = $(this).attr("data-theme-no");
                if ( theme[idx-1].menu != undefined ) makeSubPage.init(idx-1);
                else alert('����޴��� �����ϴ�.');
                koonie.mySwiper.slideTo(idx);	
            })
		}
    }
    // ���������� ����
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
			// ���� Ŭ���� 1��° �޴� �ڵ� ����
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
				// ī�� �� ���� �޴� �����
				var makeDom = '<li'
				// ���帮��Ʈ�� ��� ��Ÿ�� ����
				if ( $data.type.indexOf("list") > -1 ){
					makeDom += ' class="btn_'+$data.type+'"';
				}
				makeDom += '><a href="#">'+$data.title+'</a></li>'
				$submenu.append(makeDom);
				// ī�峻 ���� �޴� Ŭ�� �̺�Ʈ
				$submenu.find("li").eq(e).click(function(){
					var $self = $(this);
					var date = new Date();
					var loc = $data.src+"?date="+date.getTime();
					mainLoader.resetLoader();
					// �ؽ�Ʈ ������ �����ö�
					if ( $data.type == "html" ){
						$.ajax({
							type:"GET",
							url:loc,
							error : function(){
								$this.el.scont.html("");
								$submenu.find("li").removeAttr("style");
								alert('�������� �ҷ����� ���߽��ϴ�.');
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
					// ��������Ʈ�� �����ö�
					else if ( $data.type.indexOf("list") > -1 ){
						$.ajax({
							type:"GET",
							url:loc,
							dataType : "JSON",
							error : function(){
								$this.el.scont.html("");
								$submenu.find("li").removeAttr("style");
								alert('�����͸� �������� ���߽��ϴ�.');
							},
							success:function(rs){																
								// Ȱ��ȭ�� �޴� �ʱ�ȭ
								$self.css({"color":theme[idx].color,"opacity":1,"font-weight":"bold"}).siblings().removeAttr("style");
								// ����Ʈ ���̺��� �׸��ϴ�
								$this.el.scont.html( $this.mkListTable(rs) );
								// ���̺� �� ��Ȱ��ȭ ó�� + ���ڵ� ����, Ŭ���� �������� ����
								var $tb = $("#sub_cont table tbody");
								if ( $tb.length ){
									var $tbRrd = $tb.find("tr");
									$tbRrd.each(function(e){
										var $hvRrd = $(this).find("td[data-field-type='v-have']"), // ��������
											$imgRrd = $(this).find("td[data-field-type='v-image']"), // �̹��� Front
											$imgRrdb = $(this).find("td[data-field-type='v-imageb']"), // �̹��� Back
											$urlRrd = $(this).find("td[data-field-type='v-url']"), // Colnect ������ȣ
											valRrd = parseInt($hvRrd.html(),10),
											imgRrd = $.trim( $imgRrd.html() ),
											imgRrdb = $.trim( $imgRrdb.html() ),
											urlRrd = $.trim( $urlRrd.html() );
										// �̺��� ���ڵ� ��Ȱ��ȭ
										if ( valRrd != NaN ){
											if ( !valRrd ){
												$(this).addClass("disabled");
												$hvRrd.html('�̺���');
											}else{
												$hvRrd.html('����');
											}
										}else{
											$(this).addClass("disabled");
										}
										// �ܱ� ��ȭ, ���� ���� ǥ�⸦ ���� ó��
										if ( $(this).hasClass("v-flag-title") ){
											if ( rs.type == "typeListForeignCoin" ) $(this).find("td[data-field-type='v-name']").attr("colspan",9).siblings().css("display","none");
											if ( rs.type == "typeListForeignBanknotes" ) $(this).find("td[data-field-type='v-name']").attr("colspan",12).siblings().css("display","none");
										}
										// Ŭ���� �������� ����
										if ( urlRrd != '-' ) $urlRrd.html('<a href="'+rs.urlBase+urlRrd+'" onclick="event.stopPropagation();" target="_blank">view</a>');
										// Ŭ���� �̹��� ����
										$(this).click(function(){
											if ( imgRrd != '-' ){												
												var $preLay = $("#preview_layer"),
													$preLayIn = $preLay.find(".preview_inner");
												// ����Ÿ������, �������� ����
												$preLay.removeAttr("class").addClass( $("#layerInner").attr("class") );
												// ���̾� ����
												$preLayIn.html('');
												// ���̾� ����
												$preLay.fadeIn(100);
												$preLayIn.append('<img src="'+imgRrd+'"/>');												
												if ( imgRrdb != '-') $preLayIn.append('<img src="'+imgRrdb+'"/>');
											}
										})
									})
								}	
								// �׷��� ���̺��� fadein
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
		mkListTable : function(json){ // ����ǰ ����Ʈ ���̺��� �׸��ϴ�
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
					// �� ���� ����Ʈ�� ���� 
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
					// ���̺� ������ ����
					$.each(this, function(key,value){
						makeDom +='<td data-field-type="v-'+key+'"'
						// ��޿����� Ȱ��ȭ ����					
						if ( key.indexOf('grade') > -1 ){
							if ( value > 0 ) makeDom += ' class="active"';
						}
						// ������ȭ ���� ���� Ȱ��/��Ȱ��
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
			// ��ó ǥ��
			if( $data.source != undefined ){
				makeDom +='<div class="wrap-source">'
				makeDom +='<div class="tit-source">�����ڷ�</div>'
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
    // �ּ� ����
    var pageLocation = {
    	// �ؽø� ���� �ְų� �߰�
    	view : function(hash){
    		var host = location.host + location.pathname;
    		document.location.hash = hash;
    	},
    	// �ؽ� �˻� �� �ٷ� �̵�
    	search : function(){
    		var hash = document.location.hash.replace("#","");
    		if ( hash !=  "" ){
    			$(theme).each(function(i){
    				$(this.menu).each(function(e){
    					if ( this.hash == hash ){    						
    						// ���� �����̴� ����
                			mainSlider.init();
                			// ���������� �ݱ� ��ư �̺�Ʈ
                			makeSubPage.addEvent.btnClose();
                			// ī�� ���� ����
                			$("#main .sub_use").eq(i).click();
                			// ī�� ���� �޴� ����
                			$("#sub_header").find(".sub_menu").find("li").eq(e).click();
    					}
    				})
    			})
    		}
    	}
    }
	// ��ũ�� ũ�⿡ ���� ������¡
	var scrResize = function(){
		var $headH = $("#sub_header").outerHeight();
		makeSubPage.el.scont.css({"top":$headH});
	}
	// ������ �ε� �� �� ����
	$(window).load(function(){
		mainLoader.init();		
		// �ؽ� �м�
		pageLocation.search();
	}).resize(scrResize);	
})