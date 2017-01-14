const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get(),
ScriptManager = net.zhuoweizhang.mcpelauncher.ScriptManager,
dp = ctx.getResources().getDisplayMetrics().density,
Screen = ctx.getWindowManager().getDefaultDisplay(),
Color = android.graphics.Color,
CD = android.graphics.drawable.ColorDrawable,
Gravity = android.view.Gravity,
View = android.view.View,
ScrollView = android.widget.ScrollView,
LinearLayout = android.widget.LinearLayout,
PopupWindow = android.widget.PopupWindow,
Button = android.widget.Button,
TextView = android.widget.TextView;


const Simple = {
	Dialog : function(){
		this.window = new PopupWindow();
		this.layout = new LinearLayout(ctx);
		this.layout2 = new LinearLayout(ctx);
		this.layout3 = new LinearLayout(ctx);
		this.scroll = new ScrollView(ctx);
		this.title = new TextView(ctx);
		this.message = new TextView(ctx);
		this.button = new Button(ctx);
		this.Dbutton = new Button(ctx);
		this.title.setTextSize(30);
		this.message.setTextSize(15)
		this.title.setBackgroundDrawable(new CD(Color.WHITE));
		this.message.setBackgroundDrawable(new CD(Color.WHITE));
		this.button.setBackgroundDrawable(new CD(Color.parseColor("#f5f5f5")));
		this.Dbutton.setBackgroundDrawable(new CD(Color.parseColor("#f5f5f5")));
		this.Dbutton.setOnClickListener(new View.OnClickListener(){
			onClick(v){
				this.window.dismiss();
			}
		});
		this.window.setBackgroundDrawable(new CD(Color.parseColor("#f5f5f5")));
	}
}
Simple.Dialog.prototype = {
setTitle : function(str){
	this.title.setText(str);
},
setMessage : function(str){
	this.message.setText(str);
},
setButton : function(str,onclick){
	this.button.setText(str);
	this.button.setOnClickListener(onclick);
},
setDismissButton : function(str){
	this.Dbutton.setText(str);
},
setBackgroundDrawable : function(color){
	this.window.setBackgroundDrawable(color);
	this.button.setBackgroundDrawable(color);
	this.Dbutton.setBackgroundDrawable(color);
},//오류나면 지우거나 알려주세요, 오류를 확인을 안했어요.
animation : {
	Type : {
		START : "start",
		STOP : "stop",
		SCALE : "scale",
		TRANSLATE : "translate",
		ROTATE : "rotate"
	}
},
setAnimation : function(type, args){
//args = Object
	ctx.runOnUiThread(new java.lang.Runnable(){
		run: function() {
			try {
				if(type=="start"){
					var Animation = new android.view.animation.AlphaAnimation(0, 1); 
					Animation.setInterpolator(new android.view.animation.DecelerateInterpolator());
					Animation.setDuration(arg.duration);
					Animation.setStartOffset(args.startDuration);
					args.view.setAnimation(Animation); 
				}else if(type=="stop"){
					var Animation = new android.view.animation.AlphaAnimation(1, 0); 
					Animation.setInterpolator(new android.view.animation.DecelerateInterpolator());
					Animation.setDuration(arg.duration);
					Animation.setStartOffset(args.startDuration);
				}else if(type=="scale"){
					var anim = new android.view.animation.ScaleAnimation(args.fromX, args.toX, args.fromY, args.toY);
					anim.setDuration(args.duration);
					args.view..setAnimation(anim);
				}else if(type=="translate"){
					var anim = new android.view.animation.TranslateAnimation(args.fromX, args.toX, args.fromY, args.toY);
					anim.setDuration(args.duration);
					args.view.setAnimation(anim);
				}else if(type=="rotate"){
					var anim = new android.view.animation.RotateAnimation(args.fromD, args.toD);
					anim.setDuration(args.duration);
					args.view.setAnimation(anim);
				}else{
					android.widget.Toast.makeText(ctx, "Adding to later", android.widget.Toast.LENGTH_LONG);
				}
			} catch(err) {
				err = "Error: "+err+"\Line: "+err.lineNumber;
				clientMessage(err);
				print(err);
			}
		}
	});
},
show : function(){
	var data = this;
	ctx.runOnUiThread(new java.lang.Runnable({
		run(){
			try{
	data.layout.setOrientation(1);
	data.layout2.setOrientation(1);
	data.button.setWidth(80 * dp);
	data.Dbutton.setWidth(80 * dp);
	data.layout.setGravity(Gravity.RIGHT);
	data.layout.addView(data.title);
	data.layout2.addView(data.message);
	data.scroll.addView(data.layout2);
	data.layout.addView(data.scroll);
	data.layout3.addView(data.button);
	data.layout3.addView(data.Dbutton);
	data.layout.addView(data.layout3);
	data.layout.setPadding(dp * 5,dp * 5,dp * 5,dp * 5);
	data.window.setContentView(data.layout);
	data.window.setWidth(-2);
	data.window.setHeight(-2);
	data.window.showAtLocation(ctx.getWindow().getDecorView(),Gravity.CENTER,0,0);
			}catch(e){print(e);}
		}
	}));
}
}
//Original Source from Dev null
function exportLibrary() {
    var script = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
    var so = org.mozilla.javascript.ScriptableObject;
    for(var n = 0; n < script.size(); n++) {
        var scope = script.get(n).scope;
        if(!so.hasProperty(scope, "Simple")) so.putProperty(scope, "Simple", Simple);
    }
}

function exportMethod(){
	var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
 
	for (var i = 0; i < scripts.size(); i ++) {
		var script = scripts.get(i);
		var scope = script.scope;
		org.mozilla.javascript.ScriptableObject.putProperty(scope, "Simple", Simple);
	}
}

function selectLevelHook(){
exportLibrary();
}
