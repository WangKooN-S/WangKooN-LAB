var theme = 
    [        
        {
            id : "theme01",
            nmEn : "Money Collection",
            nmKo : "화폐수집이란?",
            imgBg : "bg_slide_theme00.jpg",
            color : "#ffc107",
            menu : [
                {
                    hash : "tm01Begin",
                    title : "수집의 시작",
                    type : "html",
                    src : "html/tm01Begin.html"
                },{
                    hash : "tm01Grade",
                    title : "화폐/주화의 보존상태 구분",
                    type : "html",
                    src : "html/tm01Grade.html"
                },{
                    hash : "tm01Special",
                    title : "지폐의 특이번호 체계",
                    type : "html",
                    src : "html/tm01Special.html"
                },{
                    hash : "tm01Terminology",
                    title : "화폐 수집 용어",
                    type : "html",
                    src : "html/tm01Terminology.html"
                }
            ]
        },
        {
            id : "theme02",
            nmEn : "Korea Banknote",
            nmKo : "대한민국 화폐",
            imgBg : "bg_slide_theme01.jpg",
            color : "#eb1e45",
            menu : [
                {
                    hash : "tm02Starter",
                    title : "최초의 은행권",
                    type : "html",
                    src : "html/tm02Stater.html"
                },{
                    hash : "tm02Cheil",
                    title : "제일은행권",
                    type : "html",
                    src : "html/tm02Cheil.html"
                },{
                    hash : "tm02Pbok",
                    title : "구한국은행권",
                    type : "html",
                    src : "html/tm02Pbok.html"
                },{
                    hash : "tm02Chosen",
                    title : "조선은행권",
                    type : "html",
                    src : "html/tm02Chosen.html"
                },{
                    hash : "tm02Bok",
                    title : "한국은행권",
                    type : "html",
                    src : "html/tm02Bok.html"
                },{
                    hash : "myKorBanknotes",
                    title : "소장품 리스트",
                    type : "list",
                    src : "src/banknote-list-kor.js"
                }
            ]
        },
        {
            id : "theme03",
            nmEn : "Korea Coins",
            nmKo : "대한민국 주화",
            imgBg : "bg_slide_theme02a.jpg",
            color : "#8f4bff",
            menu : [
                {
                    hash : "tm03Starter",
                    title : "최초의 근대식 주화",
                    type : "html",
                    src : "html/tm03Starter.html"
                },{
                    hash : "tm03Eoc",
                    title : "조선말기/대한제국의 주화",
                    type : "html",
                    src : "html/tm03Eoc.html"
                },{
                    hash : "tm03Bok",
                    title : "한국은행 주화",
                    type : "html",
                    src : "html/tm03Bok.html"
                },{
                    hash : "myKorCoins",
                    title : "소장품 리스트",
                    type : "list",
                    src : "src/coins-list-kor.js"
                }
            ] 
        },
        {
            id : "theme04",
            nmEn : "Euro Coins",
            nmKo : "유로 주화",
            imgBg : "bg_slide_theme03.jpg",
            color : "#03a9f4",
            menu : [
                {
                    hash : "tm04Eurocoins",
                    title : "유로주화",
                    type : "html",
                    src : "html/tm04Eurocoins.html"
                },{
                    hash : "myEuroCoins",
                    title : "소장품 리스트",
                    type : "list",
                    src : "src/eurocoin-list.js"
                }
            ]   
        },
        {
            id : "theme05",
            nmEn : "U.S Quarter Collection",
            nmKo : "U.S 쿼터",
            imgBg : "bg_slide_theme04.jpg",
            color : "#00ccbb",
            menu : [
                {
                    hash : "tm05States",
                    title : "U.S 50 States",
                    type : "html",
                    src : "html/tm05States.html"
                },{
                    hash : "tm05Atb",
                    title : "America the Beautiful",
                    type : "html",
                    src : "html/tm05Atb.html"
                },{
                    hash : "myStatesCoins",
                    title : "소장리스트(States)",
                    type : "listA",
                    src : "src/coins-list-states.js"
                },{
                    hash : "myATBCoins",
                    title : "소장리스트(ATB)",
                    type : "listB",
                    src : "src/coins-list-atb.js"
                }
            ] 
        },
        {
            id : "theme06",
            nmEn : "Coin Mintage",
            nmKo : "민트세트",
            imgBg : "bg_slide_theme05.jpg",
            color : "#c8d920",
            menu : [
                {
                    hash : "tm06Mintage",
                    title : "민트세트란?",
                    type : "html",
                    src : "1.html"
                },{
                    hash : "",
                    title : "소장품 리스트",
                    type : "list",
                    src : "src/coins-list-kor.js"
                }
            ] 
        },
        {
            id : "theme07",
            nmEn : "Commemorative",
            nmKo : "기념주화/화폐",
            imgBg : "bg_slide_theme06.jpg",
            color : "#f149b4",
            menu : [
                {
                    hash : "",
                    title : "기념주화의 역사",
                    type : "html",
                    src : "1.html"
                },{
                    hash : "",
                    title : "기념은행권의 역사",
                    type : "html",
                    src : "1.html"
                },{
                    hash : "myComCoins",
                    title : "소장리스트(기념주화)",
                    type : "listA",
                    src : "src/coins-list-kor.js"
                },{
                    hash : "myComBanknotes",
                    title : "소장리스트(기념지폐)",
                    type : "listB",
                    src : "src/coins-list-kor.js"
                }
            ]   
        },
        {
            id : "theme08",
            nmEn : "Foreign Currency",
            nmKo : "외국주화/화폐",
            imgBg : "bg_slide_theme07.jpg",
            color : "#ff9800" ,
            menu : [
                {
                    hash : "",
                    title : "세계 최초의 지폐",
                    type : "html",
                    src : "1.html"
                },{
                    hash : "",
                    title : "최고액 은행권",
                    type : "html",
                    src : "1.html"
                },{
                    hash : "myForeignCoins",
                    title : "소장리스트(외국주화)",
                    type : "listA",
                    src : "src/coins-list-foreign.js"
                },{
                    hash : "myForeignBanknotes",
                    title : "소장리스트(외국지폐)",
                    type : "listA",
                    src : "src/banknote-list-foreign.js"
                }
            ]   
        },
        {
            id : "theme09",
            nmEn : "Postage Stamp",
            nmKo : "한국의 우표",
            imgBg : "bg_slide_theme09.jpg",
            color : "#8f4bff"  
        },
        {
            id : "theme10",
            nmEn : "Christmas Seal",
            nmKo : "크리스마스 씰",
            imgBg : "bg_slide_theme08.jpg",
            color : "#eb1e45"  
        }
    ]