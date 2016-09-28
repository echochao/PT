	var main = document.getElementById("main");
	var stpe=document.getElementById("step");
	var btn1 = document.getElementById("btn1");
	var btn2 = document.getElementById("btn2");
	var btn3 = document.getElementById("btn3");
	var btn4 = document.getElementById("btn4");
	var img = main.getElementsByClassName("img")[0];
	var img_div = img.getElementsByTagName("div");

	function getIndex(n) {
		for(var i = 0; i < n.length; i++) {
			n[i].index = i;
		}
	}

	function getNum(n, length) {

		var nums = new Array;

		for(var i = 0; i < length; i++) {

			nums[i] = i;

		}

		var numss = new Array;

		for(var i = 0; i < n; i++) {

			var r = parseInt(Math.random() * nums.length);

			numss[i] = nums[r];

			nums.splice(r, 1);

		}

		return numss;
	}

	function changeImg() {
		var bgd = main.getElementsByTagName("img");
		getIndex(bgd);
		var n = main.getElementsByClassName("active")[0].index;
		for(var i = 0; i < bgd.length; i++) {
			bgd[i].className = "noactive";
		}
		if(n < bgd.length - 1) {
			bgd[n + 1].className = "active";
		} else {
			alert("结束")
			bgd[0].className = "active";
		}
	}

	function reSet() {
		var ran = getNum(img_div.length, img_div.length);
		img_div[ran[0]].className = "img_1";
		img_div[ran[1]].className = "img_2";
		img_div[ran[2]].className = "img_3";
		img_div[ran[3]].className = "img_4";
		img_div[ran[4]].className = "img_5";
		img_div[ran[5]].className = "img_6";
		img_div[ran[6]].className = "img_7";
		img_div[ran[7]].className = "img_8";
		img_div[ran[8]].className = "block";
	}

	function startGame() {
		var bg = document.getElementsByClassName("bg")[0];
		var bg_img = bg.getElementsByClassName("active")[0];
		bg.className = "noactive"; //隐藏bg
		var source = bg_img.getAttribute("src");
		var img_div = img.getElementsByTagName("div");
		for(var i = 0; i < img_div.length; i++) {
			img_div[i].style.backgroundImage = "url(" + source + ")";
		}
	}

	function gameEnd() {
		if(img_div[0].className == "img_1" &&
			img_div[1].className == "img_2" &&
			img_div[2].className == "img_3" &&
			img_div[3].className == "img_4" &&
			img_div[4].className == "img_5" &&
			img_div[5].className == "img_6" &&
			img_div[6].className == "img_7" &&
			img_div[7].className == "img_8" &&
			img_div[8].className == "block") {
			alert("通关！");
			var bg = document.getElementsByClassName("noactive")[0];
			bg.className = "bg"; //显示bg
			btn3.onclick = changeImg;
			btn1.disabled = "";
			document.onkeydown = null;
			document.onkeyup = null;
			document.onmousemove=null;
			for(var i = 0; i < img_div.length; i++) {
				img_div[i].onclick = null;
			}
		}
	}
	function giveUp(){
			var bg = document.getElementsByClassName("noactive")[0];
			bg.className = "bg"; //显示bg
			btn3.onclick = changeImg;
			btn1.disabled = "";
			document.onkeydown = null;
			document.onkeyup = null;
			for(var i = 0; i < img_div.length; i++) {
			img_div[i].onclick = null;
			}
	}
	function mouseChange(whichimg_div) {
		getIndex(img_div);
		function exChange(){
			var name = whichimg_div.className;
			whichimg_div.className = "block";
			img_div[n].className = name;
		}
		var m = whichimg_div.index;
		var n = img.getElementsByClassName("block")[0].index;
		if((n - m == 3) || (n - m == -3)){
			exChange();
		}
		if(m-n==1&&m!=3&&m!=6){
			exChange();
		}
		if(m-n==-1&&m!=2&&m!=5){
			exChange();
		}
	}

	function keyChange(ev) {
		var ev = ev || event;
		getIndex(img_div);
		var n = img.getElementsByClassName("block")[0].index;
		if(ev.keyCode == 38) {
			if(n < 6) {
				var name = img_div[n + 3].className;
				img_div[n + 3].className = "block";
				img_div[n].className = name;
			};
		};
		if(ev.keyCode == 40) {
			if(n > 2) {
				var name = img_div[n - 3].className;
				img_div[n - 3].className = "block";
				img_div[n].className = name;
			};
		};
		if(ev.keyCode == 37) {
			if(n != 2 && n != 5 && n != 8) {
				var name = img_div[n + 1].className;
				img_div[n + 1].className = "block";
				img_div[n].className = name;
			};
		};
		if(ev.keyCode == 39) {
			if(n != 0 && n != 3 && n != 6) {
				var name = img_div[n - 1].className;
				img_div[n - 1].className = "block";
				img_div[n].className = name;
			};
		};
	};
	btn1.onclick = function() {
		startGame();
		reSet();
		btn1.disabled = "disabled";
		btn2.onclick = function(){
		var r=confirm('确认？');
		if(r==true) reSet();
		}
		btn3.onclick = null;
		btn4.onclick = function(){
		var r=confirm('确认？');
		if(r==true) {
			giveUp();
			btn2.onclick=null;
			btn4.onclick=null;
		}	
	}
		document.onkeydown = keyChange;
		document.onkeyup = gameEnd;
		document.onmousemove=gameEnd;
		for(var i = 0; i < img_div.length; i++) {
			img_div[i].onclick = function() {
				mouseChange(this);
			}
		}
	}
	btn3.onclick = changeImg;